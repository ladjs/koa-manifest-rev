
# koa-manifest-rev

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads]][npm-url]
[![MIT License][license-image]][license-url]

> Dynamically load assets into your views from your `rev-manifest.json` manifest revision file (e.g. `<script src="{{ manifest('foo.js'); }}"></script>` returns `<script src="/foo-0775041dd4.js"></script>` when rendered).
>
> **Works with any templating engine**, such as [jade][jade], [ejs][ejs], or my favorite right now, [nunjucks][nunjucks].  Inspired by [express-rev][express-rev] and built for [koa@next][koa-next].


## Install


```bash
npm install --save koa-manifest-rev koa@next
```


## Usage

1. Import (or require) the package, and then include the middleware.

```js
import Koa from 'koa';
import koaManifestRev from 'koa-manifest-rev';
import path from 'path';

const app = new Koa();

// ...

// koa-manifest-rev
app.use(koaManifestRev({
  manifest: path.join(__dirname, 'build', 'rev-manifest.json'),
  prepend: '/'
}));

// ...
```

2. Call the `manifest(str)` helper function in your views when you need to include assets (requires a templating engine).

> [nunjucks][nunjucks] (via [koa-nunjucks-promises][koa-nunjucks-promise]):

```html
<html>
  <head>
    <title>Foo</title>
  </head>
  <body>
    <h1>Foo</h1>
    <script src="{{ manifest('foo.js'); }}"></script>
  </body>
</html>
```

> [jade][jade]:

```jade
html
  head
    title Foo
  body
    h1 Foo
    script(src=manifest('foo.js'))
```

> [ejs][ejs]

```ejs
<html>
  <head>
    <title>Foo</title>
  </head>
  <body>
    <h1>Foo</h1>
    <script src="<%= manifest('foo.js'); %>"></script>
  </body>
</html>
```


## API

```js
import koaManifestRev from 'koa-manifest-rev';
```

* `koaManifestRev(options)` - accepts a required `options` argument for setup.  Returns middleware for use in `app.use` statement (which in turn binds to `ctx.state` a helper function called `manifest`).  Here are the properties accepts in the `options` argument.

	* `manifest` (**required**) - path to a valid `rev-manifest.json` file (e.g. as built by [gulp-rev][gulp-rev] or [gulp-rev-all][gulp-rev-all])
	* `prepend` (optional) - string to prepend before file paths rendered after lookup (e.g. if you type `{{ manifest('foo.js'); }}` in your view, and you have passed `prepend: '/dist/'` in your setup, then your tag would render as `<script src="/dist/foo-0775041dd4.js"></script>` (defaults to `/`)

* `manifest(str)` - the helper function bound to `ctx.state` when `koaManifestRev` middleware is included in your app.  Returns the string found from a lookup in your `rev-manifest.json` file for the `str` argument passed (e.g. if you type `{{ manifest('foo.js'); }}` in your view, then it returns for the value of the `foo.js` property as defined in your `manifest` file, such as `foo-0775041dd4.js`).  If the found is not found, then the input `str` argument is returned.


## Contributors

* Nick Baugh <niftylettuce@gmail.com>


## License

[MIT][license-url]


[koa-nunjucks-promise]: https://github.com/hanai/koa-nunjucks-promise
[koa-next]: https://github.com/koajs/koa/tree/v2.x
[gulp-rev-all]: https://github.com/smysnk/gulp-rev-all
[gulp-rev]: https://github.com/sindresorhus/gulp-rev
[nunjucks]: https://mozilla.github.io/nunjucks/
[jade]: http://jade-lang.com/
[ejs]: http://ejs.co/
[express-rev]: https://github.com/xpepermint/express-rev
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
[npm-image]: http://img.shields.io/npm/v/koa-manifest-rev.svg?style=flat
[npm-url]: https://npmjs.org/package/koa-manifest-rev
[npm-downloads]: http://img.shields.io/npm/dm/koa-manifest-rev.svg?style=flat
