const webpack = require('webpack');
var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/public',
        filename: './app.js'
    },
    devServer : {
        clientLogLevel: 'error',
        compress: true,
        port: 8080,
        contentBase: './public'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            modules: path.resolve(__dirname, 'node_modules'),
            jquery: path.resolve(__dirname, 'node_modules/admin-lte/bower_components/jquery/dist/jquery.min.js'),
            bootstrap: path.resolve(__dirname, 'node_modules/admin-lte/bower_components/bootstrap/dist/js/bootstrap.min.js')
        }
    },
    plugins: [
        //new webpack.ProgressPlugin((percentage, message) => {
        //    console.log(`${(percentage * 100).toFixed()}% ${message}`);
        //}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    module: {
        rules: [{
            test: /.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread']
                },
            }
        }, {
            test: /\.css$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: './'
                    }
                },
                "css-loader"
            ]
        }, {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
        }]
    }
};