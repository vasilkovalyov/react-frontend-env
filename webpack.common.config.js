const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressPlugin = require('progress-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

const publicHtmlIndex = 'index.html'
const entryFileName = 'index.tsx'
const BuildFolder = 'build'

module.exports = {
    entry: path.resolve(__dirname, `./src/${entryFileName}`),
    output: {
        path: path.resolve(__dirname, `${BuildFolder}`),
        filename: "./js/[name].[contenthash:8].js",
        publicPath: '/',
        clean: true
        
    },
    resolve: {
        extensions: ['.tsx','.ts', 'jsx', '.js']
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, `${BuildFolder}`),
            publicPath: `/`,
        },
        host: 'localhost',
        port: 9090,
        hot: true,
        open: true,
        historyApiFallback: true,
        client: {
            progress: true,
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'source-map-loader',
                    },
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: `/${BuildFolder}/`,
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset',
                generator: {
                    filename: '../images/[name][ext][query]',
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset',
                generator: {
                    filename: '../fonts/[name][ext][query]',
                }
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `./public/${publicHtmlIndex}`),
            filename: publicHtmlIndex
        }),
        new ProgressPlugin(true),
        new CleanWebpackPlugin(),
        new ErrorOverlayPlugin(),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
    ],
    optimization: {
        runtimeChunk: {
            name: "runtime",
        },
        splitChunks: {
            cacheGroups: {
                common: {
                    name: "main",
                    test: /\.(ts|js)x?$/,
                },
                vendor: {
                    name: "vendors",
                    test: /node_modules/,
                    chunks: "all",
                    enforce: false
                },
            },
        },
    },
    devtool: 'inline-source-map',
}