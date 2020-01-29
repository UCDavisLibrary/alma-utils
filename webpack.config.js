const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'almaUtils',
    libraryTarget: 'umd'
  },
  module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components|\.spec.js$)/,
				loader: 'babel-loader'
			}
		]
	}
};
