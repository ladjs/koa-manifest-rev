const path = require('path');
const test = require('ava');

const koaManifestRev = require('../');

const manifest = path.join(__dirname, 'fixtures', 'rev-manifest.json');

test('throws error without opts object', t => {
  const error = t.throws(koaManifestRev);
  t.is(error.message, '`options` argument required');
});

test('throws error without opts.manifest string', t => {
  const error = t.throws(() => koaManifestRev({}));
  t.is(error.message, '`manifest` property is required');
});

test('throws error with opts.prepend non-string', t => {
  const error = t.throws(() =>
    koaManifestRev({
      manifest,
      prepend: true
    })
  );
  t.is(error.message, '`prepend` property defined, but it was not a string');
});

test('binds manifest function to ctx.state', t => {
  const ctx = { state: {} };
  koaManifestRev({ manifest })(ctx, () => {});
  t.true(typeof ctx.state.manifest === 'function');
});

test('returns output when manifest invoked', t => {
  const ctx = { state: {} };
  koaManifestRev({ manifest })(ctx, () => {});
  t.is(ctx.state.manifest('foo.js'), '/foo.js');
});
