const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack')

const isDevelopment = process.env.MODE === 'development';
console.log(`${isDevelopment ? 'development' : 'production'}`);
const dotenvFilename = isDevelopment ? '.env.development' : '.env.production';

const optimize = () => {
    const config = {
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            }
        }        
    }
    if (!isDevelopment) {
        config.minimize = true,
        config.minimizer = [new TerserWebpackPlugin(), new CssMinimizerPlugin()]
    } 
    return config;
}

const filename = ext => isDevelopment ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index.tsx',
    },
    output: {
        publicPath: '/',
        filename: filename('js'),
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
            "@": path.resolve(__dirname, 'src'),
            "@components": path.resolve(__dirname, 'src/components'),
            "@pages": path.resolve(__dirname, 'src/pages')
        }
    },
    optimization: optimize(),
    devServer: {
        port: process.env.PORT,
        hot: isDevelopment,
        historyApiFallback: true,
    },
    devtool: "inline-source-map",
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: !isDevelopment
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [                
                {
                    from: path.resolve(__dirname, 'src/assets/favicon.ico'),
                    to: path.resolve(__dirname, 'build')
                },
                {
                    from: path.resolve(__dirname, 'src/data/data.json'),
                    to: path.resolve(__dirname, 'build')
                }
            ]
        }),
        new MiniCSSExtractPlugin({
            filename: filename('css')
        }),
        new ESLintPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.DefinePlugin({
            'process.env.REACT_APP_MODE': JSON.stringify(process.env.MODE),
            'process.env.REACT_APP_BASE_URL': JSON.stringify(process.env.BASE_URL)
        }),
        new Dotenv({
            path: dotenvFilename,
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCSSExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCSSExtractPlugin.loader, 
                    { loader: "css-modules-typescript-loader"},
                    { loader: "css-loader", options: { modules: true } }, 
                    'sass-loader']
            },
            {
                test: /\.(m?[jt]s)|([jt]sx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', 
                                    '@babel/preset-typescript',
                                    '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    }    
}
