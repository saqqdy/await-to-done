<div style="text-align: center;" align="center">

# await-to-done

一个扩展 axios 按顺序返回的工具，当向同一个接口短时间内发起多次请求时，如果需要确保先执行的请求先返回结果，await-to-done 会很有用

[![NPM version][npm-image]][npm-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![tree shaking][tree-shaking-image]][tree-shaking-url]
![typescript][typescript-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]
[![gzip][gzip-image]][gzip-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

<div style="text-align: center; margin-bottom: 20px;" align="center">

### **[API 文档](https://www.saqqdy.com/await-to-done)** • **[更新日志](./CHANGELOG.md)**

**使用其他语言阅读：[English](./README.md) | 简体中文**

</div>

## 安装

```bash
# 使用pnpm
$ pnpm install await-to-done

# 使用npm
$ npm install await-to-done --save
```

## 使用

### 为 axios 赋上 serializer 功能

```js
import axios from 'axios'
import wrapper from 'await-to-done'

const awaitToDone = wrapper(axios, {
  // unique: false,
  // orderly: true
})

export default awaitToDone
```

### 或者把 serializer 功能赋在 axios 实例上

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

### 使用 unpkg CDN

```html
<script src="https://unpkg.com/browse/axios@1.4.0/dist/axios.min.js"></script>
<script src="https://unpkg.com/await-to-done@1.0.0/dist/index.global.prod.js"></script>
<script>
  const http = awaitToDone(axios)
</script>
```

## 问题和支持

Please open an issue [here](https://github.com/saqqdy/await-to-done/issues).

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/await-to-done.svg?style=flat-square
[npm-url]: https://npmjs.org/package/await-to-done
[codacy-image]: https://app.codacy.com/project/badge/Grade/f70d4880e4ad4f40aa970eb9ee9d0696
[codacy-url]: https://www.codacy.com/gh/saqqdy/await-to-done/dashboard?utm_source=github.com&utm_medium=referral&utm_content=saqqdy/await-to-done&utm_campaign=Badge_Grade
[tree-shaking-image]: https://badgen.net/bundlephobia/tree-shaking/await-to-done
[tree-shaking-url]: https://bundlephobia.com/package/await-to-done
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
