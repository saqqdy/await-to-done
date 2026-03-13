<div style="text-align: center;" align="center">

# await-to-done

**优雅的 async/await 错误处理封装器**

零依赖 • 兼容 ES5 • TypeScript 原生支持

[![npm version][npm-image]][npm-url]
[![npm downloads][download-image]][download-url]
[![gzip][gzip-image]][gzip-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

## 为什么选择？

告别到处写 try-catch。`await-to-done` 将 Promise 封装为 `[error, data]` 元组，让错误处理更优雅。

```ts
// 之前 😫
try {
  const data = await fetchData()
  // 处理数据
} catch (error) {
  // 处理错误
}

// 之后 😍
import to from 'await-to-done'

const [error, data] = await to(fetchData())
if (error) {
  // 处理错误
}
// 处理数据
```

## 安装

```bash
pnpm add await-to-done
# 或
npm install await-to-done
# 或
yarn add await-to-done
```

## 使用

### 单个 Promise

```ts
import to from 'await-to-done'

const [error, user] = await to(fetchUser(id))

if (error) {
  console.error('获取用户失败:', error)
  return
}

console.log('用户:', user)
```

### 多个 Promise

```ts
import to from 'await-to-done'

// 传入多个 Promise 作为参数
const [error, [user, posts]] = await to(fetchUser(id), fetchPosts(id))

// 或传入数组
const [error, results] = await to([fetchUser(id), fetchPosts(id)])
```

### 自定义错误类型

```ts
import to from 'await-to-done'

interface ApiError {
  code: number
  message: string
}

const [error, data] = await to<string, ApiError>(fetchData())
if (error) {
  console.log(error.code, error.message)
}
```

### 浏览器 / CDN

```html
<script src="https://unpkg.com/await-to-done/dist/index.umd.js"></script>
<script>
  const [error, data] = await awaitToDone(fetch('/api/data'))
</script>
```

## API

### `to<T, E>(promise)`

| 参数       | 类型                                   | 说明             |
| ---------- | -------------------------------------- | ---------------- |
| `promise`  | `Promise<T>`                           | 要封装的 Promise |
| **返回值** | `Promise<[E, undefined] \| [null, T]>` | 错误和数据的元组 |

### `to<P>(promises)`

| 参数       | 类型                                       | 说明               |
| ---------- | ------------------------------------------ | ------------------ |
| `promises` | `Promise[]`                                | Promise 数组       |
| **返回值** | `Promise<[Error, undefined] \| [null, P]>` | 包含结果数组的元组 |

## 类型定义

```ts
// 结果元组类型
type Result<T, E = Error> = [E, undefined] | [null, T]

// 异步结果类型
type AsyncResult<T, E = Error> = Promise<Result<T, E>>
```

## 体积

| 文件            | 大小 (min + gzip) |
| --------------- | ----------------- |
| `index.min.mjs` | ~300 B            |
| `index.umd.js`  | ~400 B            |

## 对比

| 特性            | await-to-done | await-to-js   |
| --------------- | ------------- | ------------- |
| 依赖            | 0             | 0             |
| TypeScript 类型 | ✅ 内置       | ❌ 需单独安装 |
| 多个 Promise    | ✅            | ❌            |
| 数组支持        | ✅            | ❌            |
| 兼容 ES5        | ✅            | ✅            |
| 体积            | ~300 B        | ~200 B        |

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/await-to-done.svg
[npm-url]: https://npmjs.org/package/await-to-done
[download-image]: https://img.shields.io/npm/dm/await-to-done.svg
[download-url]: https://npmjs.org/package/await-to-done
[gzip-image]: http://img.badgesize.io/https://unpkg.com/await-to-done/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[gzip-url]: http://img.badgesize.io/https://unpkg.com/await-to-done/dist/index.global.prod.js?compression=gzip&label=gzip%20size:%20JS
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[sonar-image]: https://sonarcloud.io/api/project_badges/quality_gate?project=saqqdy_await-to-done
[sonar-url]: https://sonarcloud.io/dashboard?id=saqqdy_await-to-done
