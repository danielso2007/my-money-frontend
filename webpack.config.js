const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");





module.exports = () => {
    if (process.env.NODE_ENV === 'production') {
        console.log('Welcome to production');
        process.env.URL_BACKEND = 'https://estudo-my-money-app-backend.herokuapp.com';
    }
    if (process.env.URL_BACKEND) {
        console.log('Usando URL backend: ', process.env.URL_BACKEND);
    }
    if (process.env.DEBUG) {
        console.log('Debugging output');
    }

    const useDefaultConfig = {};

    useDefaultConfig.entry = './src/index.jsx';
    useDefaultConfig.output = {
        path: __dirname + '/public',
        filename: './app.js'
    };
    useDefaultConfig.devServer = {
        clientLogLevel: 'error',
        compress: true,
        port: 8080,
        contentBase: './public'
    };
    useDefaultConfig.resolve = {
        extensions: ['.js', '.jsx'],
        alias: {
            modules: path.resolve(__dirname, 'node_modules'),
            jquery: path.resolve(__dirname, 'node_modules/admin-lte/bower_components/jquery/dist/jquery.min.js'),
            bootstrap: path.resolve(__dirname, 'node_modules/admin-lte/bower_components/bootstrap/dist/js/bootstrap.min.js')
        }
    };
    useDefaultConfig.plugins = [
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
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined,
            DEBUG: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
            'process.env.URL_BACKEND': JSON.stringify(process.env.URL_BACKEND)
        })
    ];

    useDefaultConfig.module = {
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
    };

  return useDefaultConfig;
};