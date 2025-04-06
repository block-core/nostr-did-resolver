# Nostr DID Resolver (JS)

Library that helps resolve DID Documents (decentralized identities) from the "did:nostr" DID Method.

Specification: https://nostrcg.github.io/did-nostr/

## Usage

```sh
npm install did-resolver @blockcore/nostr-did-resolver
```

```ts
import is from '@blockcore/nostr-did-resolver';
import { Resolver } from 'did-resolver';

// These are the default relays if none is provided.
const relays = ['wss://relay.damus.io', 'wss://relay.primal.net', 'wss://nos.lol'];

const resolver = new Resolver(is.getResolver(relays));
const didResolution = await resolver.resolve('did:nostr:124c0fa99407182ece5a24fad9b7f6674902fc422843d3128d38a0afbee0fdd2');
```

## Example

Here is example of the output from the resolve function:

```json
{
{
  "didDocument": {
    "@context": [
      "https://www.w3.org/ns/did/v1"
    ],
    "id": "did:nostr:17e2889fba01021d048a13fd0ba108ad31c38326295460c21e69c43fa8fbe515",
    "verificationMethod": [
      {
        "@context": "https://www.w3.org/ns/cid/v1",
        "id": "did:nostr:17e2889fba01021d048a13fd0ba108ad31c38326295460c21e69c43fa8fbe515#0",
        "type": "Multikey",
        "controller": "did:nostr:17e2889fba01021d048a13fd0ba108ad31c38326295460c21e69c43fa8fbe515",
        "publicKeyMultibase": "z6DtPPzVD8nXDKTHG3x8cx8UpoVP6VSBsXaDhSWcoysUnkEY"
      }
    ],
    "authentication": [
      "did:nostr:17e2889fba01021d048a13fd0ba108ad31c38326295460c21e69c43fa8fbe515#0"
    ],
    "assertionMethod": [
      "did:nostr:17e2889fba01021d048a13fd0ba108ad31c38326295460c21e69c43fa8fbe515#0"
    ],
    "capabilityDelegation": [
      "did:nostr:17e2889fba01021d048a13fd0ba108ad31c38326295460c21e69c43fa8fbe515#0"
    ],
    "capabilityInvocation": [
      "did:nostr:17e2889fba01021d048a13fd0ba108ad31c38326295460c21e69c43fa8fbe515#0"
    ],
    "service": [
      {
        "id": "did:nostr:17e2889fba01021d048a13fd0ba108ad31c38326295460c21e69c43fa8fbe515#linked-domain",
        "type": "LinkedDomains",
        "serviceEndpoint": "https://sondreb.com"
      },
      {
        "id": "did:nostr:17e2889fba01021d048a13fd0ba108ad31c38326295460c21e69c43fa8fbe515#1",
        "type": "Relay",
        "serviceEndpoint": "wss://relay.damus.io"
      },
      {
        "id": "did:nostr:17e2889fba01021d048a13fd0ba108ad31c38326295460c21e69c43fa8fbe515#2",
        "type": "Relay",
        "serviceEndpoint": "wss://relay.primal.net"
      },
      {
        "id": "did:nostr:17e2889fba01021d048a13fd0ba108ad31c38326295460c21e69c43fa8fbe515#3",
        "type": "Relay",
        "serviceEndpoint": "wss://purplepag.es"
      },
      {
        "id": "did:nostr:17e2889fba01021d048a13fd0ba108ad31c38326295460c21e69c43fa8fbe515#4",
        "type": "Relay",
        "serviceEndpoint": "wss://nos.lol"
      }
    ]
  },
  "didResolutionMetadata": {
    "contentType": "application/did+ld+json",
    "retrieved": "2025-04-06T12:14:21.770Z"
  },
  "didDocumentMetadata": {
    "created": 1732224363,
    "updated": 1732224363,
    "deactivated": false,
    "profile": {
      "about": "Developer of Blockcore Notes and Blockcore Wallet (Nostr browser extension).\nVoluntaryism. Decentralize everything.",
      "banner": "https://nostr.build/i/nostr.build_74ee63e85287e5b3351d757724e57d53d17b9f029bfad7d77dcb913b325727bb.png",
      "display_name": "SondreB",
      "lud16": "sondreb@npub.cash",
      "name": "sondreb",
      "nip05": "_@sondreb.com",
      "picture": "https://m.primal.net/OJWl.jpg",
      "website": "https://sondreb.com",
      "displayName": "SondreB",
      "pubkey": "17e2889fba01021d048a13fd0ba108ad31c38326295460c21e69c43fa8fbe515",
      "npub": "npub1zl3g38a6qypp6py2z07shggg45cu8qex992xpss7d8zrl28mu52s4cjajh",
      "created_at": 1732224363
    }
  }
}
```