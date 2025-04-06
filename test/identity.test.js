import test from 'ava';
import nostr from '../lib/index.js';
import { Resolver } from 'did-resolver';

test('Create the resolver', async t => {
  const relays = ['wss://relay.damus.io', 'wss://relay.primal.net', 'wss://nos.lol'];
  const nostrResolver = nostr.getResolver(relays);
  // const nostrResolver = nostrResolver.getResolver();
  t.assert(nostrResolver != null);

  const resolver = new Resolver(nostrResolver);
  t.assert(resolver != null);
  let didResolution = await resolver.resolve('did:is:0f254e55a2633d468e92aa7dd5a76c0c9101fab8e282c8c20b3fefde0d68f218');
  t.assert(didResolution.didResolutionMetadata.error == 'unsupportedDidMethod');

  // DID specification example
  didResolution = await resolver.resolve('did:nostr:124c0fa99407182ece5a24fad9b7f6674902fc422843d3128d38a0afbee0fdd2');
  t.assert(didResolution.didDocument?.id == 'did:nostr:124c0fa99407182ece5a24fad9b7f6674902fc422843d3128d38a0afbee0fdd2');
  t.assert(didResolution.didDocument.verificationMethod[0].publicKeyMultibase == 'z6DtP2BNR6B9pPj9XyyoPPz41CTUgG7xJrMbqBJSPqiUEB5j');

  // SondreB pubkey
  didResolution = await resolver.resolve('did:nostr:17e2889fba01021d048a13fd0ba108ad31c38326295460c21e69c43fa8fbe515');
  t.assert(didResolution.didDocument?.id == 'did:nostr:17e2889fba01021d048a13fd0ba108ad31c38326295460c21e69c43fa8fbe515');
  t.assert(didResolution.didDocumentMetadata.deactivated == false);
  t.assert(didResolution.didResolutionMetadata.contentType == 'application/did+ld+json');

  t.assert(didResolution.didDocument.verificationMethod[0].publicKeyMultibase == 'z6DtPPzVD8nXDKTHG3x8cx8UpoVP6VSBsXaDhSWcoysUnkEY');
  t.assert(didResolution.didDocument.service[0].serviceEndpoint == 'https://sondreb.com');
  t.assert(didResolution.didDocumentMetadata.profile !== null);
  t.assert(didResolution.didDocumentMetadata.profile.name == 'sondreb');

  // Used to generate README example:
  // console.log(JSON.stringify(didResolution, null, 2));

  didResolution = await resolver.resolve('null');
  t.assert(didResolution.didResolutionMetadata.error == 'invalidDid');

  didResolution = await resolver.resolve('');
  t.assert(didResolution.didResolutionMetadata.error == 'invalidDid');

  didResolution = await resolver.resolve('PHRcZvY4z86XxXey1VykYosy3BecdTDnUi');
  t.assert(didResolution.didResolutionMetadata.error == 'invalidDid');
});

test('Verify relay without profile or relay list', async t => {
  const relays = ['wot.nostr.sats4.life'];
  const nostrResolver = nostr.getResolver(relays);
  t.assert(nostrResolver != null);

  const resolver = new Resolver(nostrResolver);
  t.assert(resolver != null);

  // SondreB pubkey
  let didResolution = await resolver.resolve('did:nostr:17e2889fba01021d048a13fd0ba108ad31c38326295460c21e69c43fa8fbe515');
  t.assert(didResolution.didDocument?.id == 'did:nostr:17e2889fba01021d048a13fd0ba108ad31c38326295460c21e69c43fa8fbe515');
  t.assert(didResolution.didDocumentMetadata.deactivated == false);
  t.assert(didResolution.didResolutionMetadata.contentType == 'application/did+ld+json');

  t.assert(didResolution.didDocument.verificationMethod[0].publicKeyMultibase == 'z6DtPPzVD8nXDKTHG3x8cx8UpoVP6VSBsXaDhSWcoysUnkEY');
  t.assert(didResolution.didDocument.service.length == 0);

  t.assert(didResolution.didDocumentMetadata.profile == null);
});
