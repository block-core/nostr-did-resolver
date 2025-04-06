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
