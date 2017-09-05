# koa-manifest-rev

[![build status](https://semaphoreci.com/api/v1/niftylettuce/koa-manifest-rev/branches/master/shields_badge.svg)](https://semaphoreci.com/niftylettuce/koa-manifest-rev)
[![code coverage](https://img.shields.io/codecov/c/github/niftylettuce/koa-manifest-rev.svg)](https://codecov.io/gh/niftylettuce/koa-manifest-rev)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://github.com/lassjs/lass)
[![license](https://img.shields.io/github/license/niftylettuce/koa-manifest-rev.svg)](<>)

> Dynamically load assets into your views from your `rev-manifest.json` manifest
> revision file (e.g. `<script src="{{ manifest('foo.js'); }}"></script>`
> returns `<script src="/foo-0775041dd4.js"></script>` when rendered).
>
> **Works with any templating engine**, such as [pug][], [ejs][], or
> [nunjucks][]. Inspired by [express-rev][] and built for [koa][].


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [API](#api)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install koa-manifest-rev
```

[yarn][]:

```sh
yarn add koa-manifest-rev
```


## Usage

1. Require the package and include the middleware

   ```js
   import Koa from 'koa';
   import koaManifestRev from 'koa-manifest-rev';
   import path from 'path';

   const app = new Koa();

   app.use(koaManifestRev({
     manifest: path.join(__dirname, 'build', 'rev-manifest.json'),
     prepend: '/'
   }));
   ```

2. Call the `manifest(str)` helper function in your views when you need to include assets (requires a templating engine).

   > [pug][]:

   ```pug
   html
     head
       title Foo
     body
       h1 Foo
       script(src=manifest('foo.js'))
   ```

   > [ejs][]

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

   > [nunjucks][] (via [koa-nunjucks-promise][]):

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


## API

* `koaManifestRev(options)` - accepts a required `options` argument for setup. Returns middleware for use in `app.use` statement (which in turn binds to `ctx.state` a helper function called `manifest`). Here are the properties accepts in the `options` argument.

  * `manifest` (**required**) - path to a valid `rev-manifest.json` file (e.g. as built by [gulp-rev][] or [gulp-rev-all][])
  * `prepend` (optional) - string to prepend before file paths rendered after lookup (e.g. if you type `{{ manifest('foo.js'); }}` in your view, and you have passed `prepend: '/dist/'` in your setup, then your tag would render as `<script src="/dist/foo-0775041dd4.js"></script>` (defaults to `/`)

* `manifest(str)` - the helper function bound to `ctx.state` when `koaManifestRev` middleware is included in your app. Returns the string found from a lookup in your `rev-manifest.json` file for the `str` argument passed (e.g. if you type `{{ manifest('foo.js'); }}` in your view, then it returns for the value of the `foo.js` property as defined in your `manifest` file, such as `foo-0775041dd4.js`). If the found is not found, then the input `str` argument is returned.


## Contributors

| Name           | Website                    |
| -------------- | -------------------------- |
| **Nick Baugh** | <http://niftylettuce.com/> |


## License

[MIT](LICENSE) © [Nick Baugh](http://niftylettuce.com/)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/

[koa-nunjucks-promise]: https://github.com/hanai/koa-nunjucks-promise

[koa]: https://github.com/koajs/koa

[gulp-rev-all]: https://github.com/smysnk/gulp-rev-all

[gulp-rev]: https://github.com/sindresorhus/gulp-rev

[nunjucks]: https://mozilla.github.io/nunjucks/

[pug]: https://github.com/pugjs/pug

[ejs]: http://ejs.co/

[express-rev]: https://github.com/xpepermint/express-rev
