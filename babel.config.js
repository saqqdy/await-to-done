module.exports = {
	presets: [
		[
			'@babel/env',
			{
				targets: {
					browsers: ['> 0.5%', 'last 2 versions', 'not dead']
				},
				// Ensure ES5 output
				forceAllTransforms: true,
				exclude: ['transform-regenerator']
			}
		],
		'@babel/typescript'
	]
}
