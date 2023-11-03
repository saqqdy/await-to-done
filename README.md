<div style="text-align: center;" align="center">

# await-to-done

Async await wrapper for easy error handling

When multiple requests are made to the same interface in a short period of time, await-to-done can be useful if you need to ensure that the request executed first returns the results first

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
![typescript][typescript-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]
[![gzip][gzip-image]][gzip-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

<div style="text-align: center; margin-bottom: 20px;" align="center">

### **[Documentation](https://www.saqqdy.com/await-to-done)** • **[Change Log](./CHANGELOG.md)**

**Read this in other languages: English | [简体中文](./README-zh_CN.md)**

</div>

- [Installation](#installation)
- [Usage](#usage)
  - [Add serializer feature to axios](#add-serializer-feature-to-axios)
  - [or axios instance](#or-axios-instance)
- [API Reference](#api-reference)
  - [awaitToDone](#awaittodone)
  - [awaitToDone.clear](#awaittodoneclear)
  - [awaitToDone.series](#awaittodoneseries)
- [Using unpkg CDN](#using-unpkg-cdn)
- [Support & Issues](#support--issues)
- [License](#license)

## Installing

```bash
# use pnpm
$ pnpm install await-to-done

# use npm
$ npm install await-to-done --save
```

## Usage

### Add serializer feature to axios

```js
import axios from 'axios'
import wrapper from 'await-to-done'

const awaitToDone = wrapper(axios, {
  // unique: false,
  // orderly: true
})

export default awaitToDone
```

### or axios instance

```js
import axios from 'axios'
import wrapper from 'await-to-done'

const instance = axios.create({
  withCredentials: true
})
const awaitToDone = wrapper(instance, {
  // unique: false,
  // orderly: true
})

export default awaitToDone
```

### Using unpkg CDN

```html
<script src="https://unpkg.com/browse/axios@1.4.0/dist/axios.min.js"></script>
<script src="https://unpkg.com/await-to-done@1.0.0/dist/index.global.prod.js"></script>
<script>
  const http = awaitToDone(axios)
</script>
```

## Support & Issues

Please open an issue [here](https://github.com/saqqdy/await-to-done/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/await-to-done.svg?style=flat-square
[npm-url]: https://npmjs.org/package/await-to-done
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/await-to-done/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/await-to-done&utm_campaign=Badge_Grade
[typescript-url]: https://badgen.net/badge/icon/typescript?icon=typescript&label
[codecov-image]: https://img.shields.io/codecov/c/github/saqqdy/await-to-done.svg?style=flat-square
[codecov-url]: https://codecov.io/github/saqqdy/await-to-done?branch=master
[download-image]: https://img.shields.io/npm/dm/await-to-done.svg?style=flat-square
[download-url]: https://npmjs.org/package/await-to-done
[gzip-image]: http://img.badgesize.io/https://unpkg.com/await-to-done/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[gzip-url]: http://img.badgesize.io/https://unpkg.com/await-to-done/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_await-to-done
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_await-to-done
