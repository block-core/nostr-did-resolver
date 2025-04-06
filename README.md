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
    "retrieved": "2025-04-06T00:43:38.633Z"
  },
  "didDocumentMetadata": {
    "deactivated": false
  }
}
```