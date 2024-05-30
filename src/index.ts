export type PromiseAll<P extends readonly unknown[] | []> = {
	-readonly [K in keyof P]: Promise<P[K]>
}

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
function awaitToDone<T, E = Error>(promise: Promise<T>): Promise<[E, undefined] | [null, T]>
function awaitToDone<P extends readonly unknown[] | [], E = Error>(
	promise: PromiseAll<P>
): Promise<[E, undefined] | [null, P]>
function awaitToDone<T, P extends readonly unknown[] | [], E = Error>(
	promise: Promise<T>,
	...promises: PromiseAll<P>
): Promise<[E, undefined] | [null, [T, ...P]]>
function awaitToDone<T, P extends readonly unknown[] | [], E = Error>(
	promise: Promise<T> | PromiseAll<P>,
	...promises: PromiseAll<P>
): Promise<[E, undefined] | [null, T | P | [T, ...P]]> {
	if (Array.isArray(promise)) {
		return Promise.all(promise as PromiseAll<P>)
			.then<[null, P]>((data: P) => [null, data])
			.catch<[E, undefined]>((err: E) => [err, undefined])
	} else if (promises.length === 0) {
		return (promise as Promise<T>)
			.then<[null, T]>((data: T) => [null, data])
			.catch<[E, undefined]>((err: E) => [err, undefined])
	}
	return Promise.all([promise as Promise<T>, ...promises])
		.then<[null, [T, ...P]]>((data: [T, ...P]) => [null, data])
		.catch<[E, undefined]>((err: E) => [err, undefined])
}

export default awaitToDone
