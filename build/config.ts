import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'))

export const banner =
	'/*!\n' +
	' * ' +
	pkg.name +
	' v' +
	pkg.version +
	'\n' +
	' * ' +
	pkg.description +
	'\n' +
	' * (c) 2021-' +
	new Date().getFullYear() +
	' saqqdy \n' +
	' * Released under the MIT License.\n' +
	' */'

export const extensions = ['.js', '.mjs', '.cjs', '.ts', '.tsx', '.json']

export const alias = {
	'@': resolve(__dirname, '..', 'src'),
	'await-to-done': resolve(__dirname, '..')
}
