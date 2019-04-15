const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function createModules(devMode) {
    let ruleJsx = {
        test: /.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-object-rest-spread']
            },
        }
    };
    let ruleCSS = {test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: '../',
                hmr: devMode,
                reloadAll: true
            },
          },
          'css-loader',
    ]};
    let ruleImage = {test: /\.(png|svg|jpg|gif)$/,
        use: [{loader: 'file-loader', 
        options: { name: '[name].[ext]', outputPath: 'images/' }}]};
    let ruleFonts = {test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, 
        use: [{loader: 'file-loader', 
        options: { name: '[name].[ext]', outputPath: 'fonts/' }}]};
    
    return {rules: [
        ruleCSS,
        ruleJsx,
        ruleImage, 
        ruleFonts]};
}

function createPlugins(devMode) {
    let cleanWebpackPlugin = new CleanWebpackPlugin();
    let miniCssExtractPlugin = new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: devMode ? '[id].bundle.css' : '[id].[contenthash].bundle.css',
    });
    let webpackEnvironmentPlugin = new webpack.EnvironmentPlugin({
        NODE_ENV: 'development', 
        DEBUG: false});
    let webpackDefinePlugin = new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.DEBUG': JSON.stringify(process.env.DEBUG)
    });
    let htmlWebpackPlugin = new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/public/index.html'),
        minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          }
    });
    let hashedModuleIdsPlugin = new webpack.HashedModuleIdsPlugin();
    let bundleAnalyzerPlugin = new BundleAnalyzerPlugin();
    let progressPlugin = new webpack.ProgressPlugin((percentage, message) => {
        console.log(`${(percentage * 100).toFixed()}% ${message}`);
    });
    let providePlugin = new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'});
    let copyWebpackPlugin = new CopyWebpackPlugin([
        {from: path.join(__dirname, 'src/public/images'),to: path.join(__dirname, 'public/images')},
        {from: path.join(__dirname, 'src/public/images/favicon'),to: path.join(__dirname, 'public/images/favicon')}
    ]);
    return [
        providePlugin,
        hashedModuleIdsPlugin,
        cleanWebpackPlugin,
        miniCssExtractPlugin, 
        webpackEnvironmentPlugin, 
        webpackDefinePlugin,
        copyWebpackPlugin,
        htmlWebpackPlugin];
}

function createServer() {
    return {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        open: false,
        watchContentBase: true,
        clientLogLevel: 'info',
        port: 8080,
        after: function(app, server) {
        },
        before: function(app, server) {
        }
    }
}

function createOptimization(devMode) {
    return {
        minimizer: [
            new TerserJSPlugin({extractComments: true}), 
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                }
            })],
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 8,    
            maxInitialRequests: 8,
            automaticNameDelimiter: '.',
            name: false,
            cacheGroups: {
                node_vendor: {
                    name: 'node_vendor',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true
                },
                commons: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|react-redux|react-redux-toastr|redux|redux-form|redux-multi|redux-promise|redux-thunk)[\\/]/,
                    name: 'commons',
                    priority: 1,
                    reuseExistingChunk: true
                },
                styles: {
                    name: 'styles',
                    test: /[\\/]node_modules[\\/](\.css$)/,
                    chunks: 'all',
                    enforce: true,
                }
            }
        }
    };
}

function createResolve(devMode) {
    return {
        extensions: ['.js', '.jsx'],
        alias: {
            modules: path.resolve(__dirname, 'node_modules'),
            jquery: path.resolve(__dirname, 'node_modules/admin-lte/bower_components/jquery/dist/jquery.min.js'),
            bootstrap: path.resolve(__dirname, 'node_modules/admin-lte/bower_components/bootstrap/dist/js/bootstrap.min.js')
        }
    };
}

function createWebpackConfig(devMode) {
    let webpackConfig = {};

    webpackConfig.entry = {
        app: './src/index.jsx'
    };
    webpackConfig.output = {
        filename: devMode ? '[name].bundle.js' : '[name].[contenthash].bundle.js',
        chunkFilename: devMode ? '[id].bundle.js' : '[id].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'public')
    };

    webpackConfig.optimization = createOptimization(devMode);

    if (devMode) {
        console.log('Usando: source-map');
        webpackConfig.devtool = 'source-map';
    }

    webpackConfig.module = createModules(devMode);
    webpackConfig.plugins = createPlugins(devMode); 
    
    webpackConfig.devServer = createServer();

    webpackConfig.resolve = createResolve(devMode);

    return webpackConfig;
}

module.exports = (env, argv) => {
    let mode = argv.production ? 'production' : 'development';

    if (mode === 'production' || argv.production) {
        console.log('Executando build para produção.');
    } else {
        console.log('Executando build para desenvolvimento.');
    }

    let config = createWebpackConfig(mode === 'development');
    config.mode = mode;

    return config;
};