import nodeResolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { banner, extensions } from './config'

/** @typedef {import('rollup').RollupOptions} RollupOptions */

/**
 * @typedef {Object} BuildConfig
 * @property {string} input
 * @property {string} file
 * @property {'es' | 'cjs' | 'iife'} format
 * @property {boolean} [minify]
 * @property {string} [globalName]
 */

/** @type {BuildConfig[]} */
const configs = [
	// ESM (primary)
	{
		input: 'src/index.ts',
		file: 'dist/index.mjs',
		format: 'es'
	},
	// ESM minified for browsers
	{
		input: 'src/index.ts',
		file: 'dist/index.min.mjs',
		format: 'es',
		minify: true
	},
	// CommonJS
	{
		input: 'src/index.ts',
		file: 'dist/index.cjs',
		format: 'cjs'
	},
	// IIFE for CDN
	{
		input: 'src/index.ts',
		file: 'dist/index.umd.js',
		format: 'iife',
		globalName: 'awaitToDone',
		minify: true
	}
]

/** @param {BuildConfig} config */
/** @returns {RollupOptions} */
function createEntry(config) {
	return {
		input: config.input,
		output: {
			file: config.file,
			format: config.format,
			exports: 'auto',
			extend: true,
			banner,
			name: config.globalName
		},
		plugins: [
			nodeResolve(),
			commonjs(),
			typescript({
				compilerOptions: {
					declaration: false,
					target: 'ES5',
					importHelpers: false,
					noEmitHelpers: false
				}
			}),
			babel({
				babelHelpers: 'bundled',
				extensions,
				exclude: /node_modules/
			}),
			config.minify ? terser({ module: config.format === 'es' }) : null
		].filter(Boolean),
		onwarn(msg, warn) {
			if (!/Circular/.test(msg.toString())) {
				warn(msg)
			}
		}
	}
}

export default configs.map(createEntry)
