
//     koa-manifest-rev
//     Copyright (c) 2016- Nick Baugh <niftylettuce@gmail.com>
//     MIT Licensed

// * Author: [@niftylettuce](https://twitter.com/#!/niftylettuce)
// * Source: <https://github.com/niftylettuce/koa-manifest-rev>

// # koa-manifest-rev

export default function (opts) {

  if (typeof opts !== 'object')
    throw new Error('`options` argument required');

  if (typeof opts.manifest !== 'string')
    throw new Error('`manifest` property is required');

  if (typeof opts.prepend !== 'undefined' && typeof opts.prepend !== 'string')
    throw new Error('`prepend` property defined, but it was not a string');

  opts.prepend = opts.prepend || '/';

  return function koaManifestRev(ctx, next) {
    ctx.state.manifest = str => {
      let output = opts.prepend + str;
      try {
        output = opts.prepend + (require(opts.manifest)[str] || str);
      } catch (err ) {}
      return output;
    }
    return next();
  }

}
