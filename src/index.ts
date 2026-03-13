export type PromiseAll<P extends readonly unknown[] | []> = {
	-readonly [K in keyof P]: Promise<P[K]>
}

/**
 * Result type for async operations
 */
export type Result<T, E = Error> = [E, undefined] | [null, T]

/**
 * Async result type for async operations
 */
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>

/**
 * Async await wrapper for easy error handling
 *
 * @example
 * ```ts
 * const bar = () => new Promise<boolean>((resolve, reject) => {})
 * const foo = () => new Promise<string>((resolve, reject) => {})
 * ;(async () => {
 * 	  const [err, data] = await awaitToDone(bar())
 * 	  const [err1, data1] = await awaitToDone(bar(), foo())
 * 	  const [err2, data2] = await awaitToDone([bar(), foo()])
 * })()
 * ```
 * @since 1.0.0
 * @author saqqdy
 * @param promise - Promise
 * @param promises - Promise rest params
 * @return - result
 */
function awaitToDone<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>>
function awaitToDone<P extends readonly unknown[] | [], E = Error>(
	promise: PromiseAll<P>
): Promise<Result<P, E>>
function awaitToDone<T, P extends readonly unknown[] | [], E = Error>(
	promise: Promise<T>,
	...promises: PromiseAll<P>
): Promise<Result<[T, ...P], E>>
function awaitToDone<T, P extends readonly unknown[] | [], E = Error>(
	promise: Promise<T> | PromiseAll<P>,
	...promises: PromiseAll<P>
): Promise<Result<T | P | [T, ...P], E>> {
	if (Array.isArray(promise)) {
		return Promise.all(promise as PromiseAll<P>)
			.then<[null, P]>((data: P) => [null, data])
			.catch<[E, undefined]>((err: E) => [err, undefined])
	} else if (promises.length === 0) {
		return (promise as Promise<T>)
			.then<[null, T]>((data: T) => [null, data])
			.catch<[E, undefined]>((err: E) => [err, undefined])
	}
	// Use Array.prototype.concat instead of spread to avoid TypeScript helpers
	const allPromises = ([promise as Promise<T>] as Promise<unknown>[]).concat(
		promises as Promise<unknown>[]
	)
	return Promise.all(allPromises)
		.then<[null, [T, ...P]]>(data => [null, data as [T, ...P]])
		.catch<[E, undefined]>((err: E) => [err, undefined])
}

export default awaitToDone
