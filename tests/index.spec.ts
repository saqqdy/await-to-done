import { describe, expect, it } from 'vitest'
import awaitToDone from '../src/index'

describe('awaitToDone', () => {
	describe('single promise', () => {
		it('should return [null, data] on success', async () => {
			const [err, data] = await awaitToDone(Promise.resolve('success'))
			expect(err).toBeNull()
			expect(data).toBe('success')
		})

		it('should return [null, undefined] for void promise', async () => {
			const [err, data] = await awaitToDone(Promise.resolve())
			expect(err).toBeNull()
			expect(data).toBeUndefined()
		})

		it('should return [error, undefined] on failure', async () => {
			const [err, data] = await awaitToDone(Promise.reject(new Error('fail')))
			expect(err).toBeInstanceOf(Error)
			expect(err?.message).toBe('fail')
			expect(data).toBeUndefined()
		})

		it('should return custom error type', async () => {
			class CustomError extends Error {
				code = 'CUSTOM_ERROR'
			}
			const customError = new CustomError('custom fail')
			const [err, data] = await awaitToDone<string, CustomError>(Promise.reject(customError))
			expect(err).toBeInstanceOf(CustomError)
			expect(err?.code).toBe('CUSTOM_ERROR')
			expect(data).toBeUndefined()
		})

		it('should work with number values', async () => {
			const [err, data] = await awaitToDone(Promise.resolve(42))
			expect(err).toBeNull()
			expect(data).toBe(42)
		})

		it('should work with object values', async () => {
			const obj = { name: 'test', value: 123 }
			const [err, data] = await awaitToDone(Promise.resolve(obj))
			expect(err).toBeNull()
			expect(data).toEqual(obj)
		})

		it('should work with boolean values', async () => {
			const [err, data] = await awaitToDone(Promise.resolve(true))
			expect(err).toBeNull()
			expect(data).toBe(true)
		})

		it('should work with null values', async () => {
			const [err, data] = await awaitToDone(Promise.resolve(null))
			expect(err).toBeNull()
			expect(data).toBeNull()
		})
	})

	describe('multiple promises', () => {
		it('should handle multiple promises with rest parameters', async () => {
			const [err, data] = await awaitToDone(
				Promise.resolve(1),
				Promise.resolve('2'),
				Promise.resolve(true)
			)
			expect(err).toBeNull()
			expect(data).toEqual([1, '2', true])
		})

		it('should handle multiple promises with one failure', async () => {
			const [err, data] = await awaitToDone(
				Promise.resolve(1),
				Promise.reject(new Error('fail')),
				Promise.resolve(3)
			)
			expect(err).toBeInstanceOf(Error)
			expect(err?.message).toBe('fail')
			expect(data).toBeUndefined()
		})

		it('should return correct types for multiple promises', async () => {
			const [err, data] = await awaitToDone(
				Promise.resolve<number>(1),
				Promise.resolve<string>('test')
			)
			expect(err).toBeNull()
			expect(data).toEqual([1, 'test'])
		})
	})

	describe('array of promises', () => {
		it('should handle array of promises', async () => {
			const [err, data] = await awaitToDone([
				Promise.resolve(1),
				Promise.resolve(2),
				Promise.resolve(3)
			])
			expect(err).toBeNull()
			expect(data).toEqual([1, 2, 3])
		})

		it('should handle empty array', async () => {
			const [err, data] = await awaitToDone([])
			expect(err).toBeNull()
			expect(data).toEqual([])
		})

		it('should handle array with one failure', async () => {
			const [err, data] = await awaitToDone([
				Promise.resolve(1),
				Promise.reject(new Error('fail')),
				Promise.resolve(3)
			])
			expect(err).toBeInstanceOf(Error)
			expect(err?.message).toBe('fail')
			expect(data).toBeUndefined()
		})

		it('should return correct types for array of promises', async () => {
			const [err, data] = await awaitToDone<[number, string, boolean]>([
				Promise.resolve(1),
				Promise.resolve('test'),
				Promise.resolve(true)
			])
			expect(err).toBeNull()
			expect(data).toEqual([1, 'test', true])
		})
	})

	describe('edge cases', () => {
		it('should handle rejected promise with non-Error value', async () => {
			// eslint-disable-next-line prefer-promise-reject-errors
			const [err, data] = await awaitToDone(Promise.reject('string error'))
			expect(err).toBe('string error')
			expect(data).toBeUndefined()
		})

		it('should handle rejected promise with number value', async () => {
			const [err, data] = await awaitToDone(Promise.reject(new Error('404')))
			expect(err).toBeInstanceOf(Error)
			expect(err?.message).toBe('404')
			expect(data).toBeUndefined()
		})

		it('should handle rejected promise with null', async () => {
			// eslint-disable-next-line prefer-promise-reject-errors
			const [err, data] = await awaitToDone(Promise.reject(null))
			expect(err).toBeNull()
			expect(data).toBeUndefined()
		})

		it('should maintain type inference for custom error type', async () => {
			interface ApiError {
				code: number
				message: string
			}
			const apiError: ApiError = { code: 500, message: 'Internal Server Error' }
			const [err, data] = await awaitToDone<string, ApiError>(Promise.reject(apiError))
			expect(err?.code).toBe(500)
			expect(err?.message).toBe('Internal Server Error')
			expect(data).toBeUndefined()
		})
	})
})
