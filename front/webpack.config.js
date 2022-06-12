const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPreconnectPlugin = require('html-webpack-preconnect-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const common = {
	entry: {
		index: './src/index.jsx'
	},
	output: {
		filename: 'js/[name].[contenthash].js',
		path: path.join(__dirname, '/build'),
		publicPath: '/',
	},
	module: {
		rules: [
            {
                test: /\.css$/i,
                use: [
                    'style-loader', 
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                        }
                    }
                ]
            },
            {
                test: /\.jsx$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ]
                        }
                    }
                ]
            }
		]
	},
	devServer: {
		static: {
          directory: path.join(__dirname, 'build'),
        },
		compress: true,
		port: 5500,
		historyApiFallback: true
	},
	plugins: [
		new CleanWebpackPlugin()
	]
};

const devMod = {
	devtool: 'inline-source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '/src/index.html'),
		}),
		new webpack.DefinePlugin({
			BACKEND_HOST: JSON.stringify('http://localhost:8000')
		}),
		new BundleAnalyzerPlugin()
	],
}

const prodMod = {
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '/src/index.html'),
			preconnect: [
				'http://neiron.solutions',
			]
		}),
		new HtmlWebpackPreconnectPlugin(),
		new webpack.DefinePlugin({
			BACKEND_HOST: JSON.stringify('http://api.music.neiron.solutions')
		})
	],
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/
				}
			}
		}
	},
}

module.exports = (env, argv) => {
	if (argv.mode === 'development') {
		return merge([
			common,
			devMod
		])
	} else if (argv.mode === 'production') {
		return merge([
			common,
			prodMod
		])
	}
}
