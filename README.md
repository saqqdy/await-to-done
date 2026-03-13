<div style="text-align: center;" align="center">

# await-to-done

**Async await wrapper for easy error handling**

Zero dependencies • ES5 compatible • TypeScript ready

[![npm version][npm-image]][npm-url]
[![npm downloads][download-image]][download-url]
[![gzip][gzip-image]][gzip-url]
[![License][license-image]][license-url]

[![Sonar][sonar-image]][sonar-url]

</div>

## Why?

Stop writing try-catch blocks everywhere. `await-to-done` wraps your promises and returns a tuple `[error, data]` for elegant error handling.

```ts
// Before 😫
try {
  const data = await fetchData()
  // handle data
} catch (error) {
  // handle error
}

// After 😍
import to from 'await-to-done'

const [error, data] = await to(fetchData())
if (error) {
  // handle error
}
// handle data
```

## Install

```bash
pnpm add await-to-done
# or
npm install await-to-done
```

## Usage

### Single Promise

```ts
import to from 'await-to-done'

const [error, user] = await to(fetchUser(id))

if (error) {
  console.error('Failed to fetch user:', error)
  return
}

console.log('User:', user)
```

### Multiple Promises

```ts
import to from 'await-to-done'

// Pass multiple promises as arguments
const [error, [user, posts]] = await to(fetchUser(id), fetchPosts(id))

// Or pass an array
const [error, results] = await to([fetchUser(id), fetchPosts(id)])
```

### Custom Error Type

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

### Browser / CDN

```html
<script src="https://unpkg.com/await-to-done/dist/index.umd.js"></script>
<script>
  const [error, data] = await awaitToDone(fetch('/api/data'))
</script>
```

## API

### `to<T, E>(promise)`

| Parameter   | Type                                   | Description             |
| ----------- | -------------------------------------- | ----------------------- |
| `promise`   | `Promise<T>`                           | A promise to wrap       |
| **Returns** | `Promise<[E, undefined] \| [null, T]>` | Tuple of error and data |

### `to<P>(promises)`

| Parameter   | Type                                       | Description                 |
| ----------- | ------------------------------------------ | --------------------------- |
| `promises`  | `Promise[]`                                | Array of promises           |
| **Returns** | `Promise<[Error, undefined] \| [null, P]>` | Tuple with array of results |

## Types

```ts
// Result tuple type
type Result<T, E = Error> = [E, undefined] | [null, T]

// Async result type
type AsyncResult<T, E = Error> = Promise<Result<T, E>>
```

## Bundle Size

| File            | Size (min + gzip) |
| --------------- | ----------------- |
| `index.min.mjs` | ~300 B            |
| `index.umd.js`  | ~400 B            |

## Comparison

| Feature           | await-to-done | await-to-js |
| ----------------- | ------------- | ----------- |
| Dependencies      | 0             | 0           |
| TypeScript types  | ✅ Built-in   | ❌ Separate |
| Multiple promises | ✅            | ❌          |
| Array support     | ✅            | ❌          |
| ES5 compatible    | ✅            | ✅          |
| Size              | ~300 B        | ~200 B      |

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
