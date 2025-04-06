import { DIDResolutionOptions, DIDResolutionResult, DIDResolver, ParsedDID, Resolvable } from 'did-resolver';
import { kinds } from 'nostr-tools';
import { SimplePool } from 'nostr-tools/pool';
import { base58btc } from 'multiformats/bases/base58';

export function getResolver(relays?: string[]): Record<string, DIDResolver> {
  return new BlockcoreDidResolver(relays).build();
}

export class BlockcoreDidResolver {
  #relays = ['wss://relay.damus.io', 'wss://relay.primal.net', 'wss://nos.lol'];

  constructor(relays?: string[]) {
    if (relays) {
      this.#relays = relays;
    }
  }

  async resolve(_did: string, parsed: ParsedDID, _resolver: Resolvable, _options: DIDResolutionOptions): Promise<DIDResolutionResult> {
    if (parsed.method !== 'nostr') {
      return {
        didDocument: null,
        didResolutionMetadata: {
          error: 'methodNotSupported',
        },
        didDocumentMetadata: {},
      };
    }

    const pool = new SimplePool();
    const services = [] as any[];
    let profile = null;

    const metadata = await pool.get(this.#relays, {
      kinds: [kinds.Metadata],
      authors: [parsed.id],
    });

    const relays = await pool.get(this.#relays, {
      kinds: [kinds.RelayList],
      authors: [parsed.id],
    });

    pool.close(this.#relays);

    if (metadata?.content) {
      profile = JSON.parse(metadata.content);
      const website = profile.website;

      if (website) {
        services.push({
          id: `${parsed.did}#linked-domain`,
          type: 'LinkedDomains',
          serviceEndpoint: website,
        });
      }

      // TODO: Is there any use putting NIP05 in DID Document?
      // const nip05 = profile.nip05;
      // if (nip05) {
      // 	services.push({
      // 		id: `${parsed.did}#nip05`,
      // 		type: 'Nip05',
      // 		serviceEndpoint: nip05,
      // 	});
      // }
    }

    if (relays) {
      const relayUrls = relays.tags.filter(tag => tag.length >= 2 && tag[0] === 'r').map(tag => tag[1]);

      for (let i = 0; i < relayUrls.length; i++) {
        services.push({
          id: `${parsed.did}#${i + 1}`,
          type: 'Relay',
          serviceEndpoint: relayUrls[i],
        });
      }
    }

    const didDocument = this.getDocument(parsed.did, services);

    const resolution: DIDResolutionResult = {
      didDocument: didDocument,
      didResolutionMetadata: {
        contentType: 'application/did+ld+json',
        retrieved: new Date().toISOString(),
      },
      didDocumentMetadata: {
        created: profile?.created_at,
        updated: profile?.created_at,
        deactivated: false, // TODO: Check if the key is deactivated.
        profile
      },
    };

    return resolution;
  }

  build(): Record<string, DIDResolver> {
    return { nostr: this.resolve.bind(this) };
  }

  publicKeyToMultibase(publicKeyHex: string) {
    // Convert hex string to Uint8Array if it's not already
    let publicKeyBytes: Uint8Array;
    if (typeof publicKeyHex === 'string') {
      // Remove '0x' prefix if present
      const hex = publicKeyHex.startsWith('0x') ? publicKeyHex.slice(2) : publicKeyHex;
      publicKeyBytes = new Uint8Array(hex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []);
    } else {
      publicKeyBytes = publicKeyHex;
    }

    // Prefix with 0x01 to indicate secp256k1 public key
    // (using the multicodec prefix for secp256k1-pub: 0xe7, 0x01)
    const prefixedKey = new Uint8Array([0xe7, 0x01, ...publicKeyBytes]);

    // Encode using base58btc from multiformats
    return base58btc.encode(prefixedKey);
  }

  getDocument(did: string, services: any[]): any {
    const keyUri = `${did}#0`;
    const publicKeyHex = did.split(':')[2];
    const multibaseKey = this.publicKeyToMultibase(publicKeyHex);

    let document = `{
            "@context": [
              "https://www.w3.org/ns/did/v1"
            ],
            "id": "${did}",
            "verificationMethod": [
              {
				        "@context": "https://www.w3.org/ns/cid/v1",
                "id": "${keyUri}",
                "type": "Multikey",
                "controller": "${did}",
                "publicKeyMultibase": "${multibaseKey}"
              }
            ],  
            "authentication": [
              "${keyUri}"
            ],
            "assertionMethod": [
              "${keyUri}"
            ],
            "capabilityDelegation": [
              "${keyUri}"
            ],
            "capabilityInvocation": [
              "${keyUri}"
            ],
			      "service": ${services.length > 0 ? JSON.stringify(services, null, 2) : '[]'}
          }`;

    return JSON.parse(document);
  }
}
