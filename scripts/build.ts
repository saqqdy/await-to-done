import { spawn } from 'child_process'

async function run() {
	await build()
}

async function build() {
	await new Promise<void>((resolve, reject) => {
		const child = spawn(
			'rollup',
			['-c', 'build/rollup.config.ts', '--configPlugin', '@rollup/plugin-typescript'],
			{ stdio: 'inherit' }
		)
		child.on('close', code => {
			if (code === 0) resolve()
			else reject(new Error(`Rollup exited with code ${code}`))
		})
	})
}

run()
