/**
 * Webpack bundles (js) modules. It takes modules with dependencies and generates static assets representing those modules.
 *
 * @param paths {object} Shared paths from gulpfile
 * @param gulp {object} Gulp object
 * @param plugins {object} Shared tasks (uses gulp-load-plugins to get tasks from package.json)
 * @returns {Function} Return Module
 */

module.exports = function(paths, gulp, plugins) {
    'use strict';

    const webpack = require('webpack');
    const gulpWebpack = require('webpack-stream');

    return function() {
        const isProduction = plugins.util.env.type == 'production';

        gulp.src([plugins.path.join(paths.assets.js, '_*.js')])
            .pipe(gulpWebpack(
                {
                    cache: true,
                    entry: {
                        '_main-behavior': plugins.path.join(paths.assets.js, '_main-behavior.js'),
                        '_crucial-behavior': plugins.path.join(paths.assets.js, '_crucial-behavior.js'),
                        '_polyfills': plugins.path.join(paths.assets.js, '_polyfills.js'),
                    },
                    output: {
                        filename: '[name].js',
                        chunkFilename: '[chunkhash].js',
                    },
                    module: {
                        loaders: [
                            {
                                test: /\.jsx?$|\.es6$|\.es2015/,
                                exclude: /node_modules/,
                                loader: 'babel-loader',
                                query: {
                                    plugins: [],
                                    presets: ['es2015-loose', 'es2016', 'es2017'],
                                },
                            },
                            {
                                test: /\.css$/,
                                loader: 'style-loader!css-loader',
                            },
                            {
                                test: /\.scss$/,
                                loaders: ['style', 'css', 'sass'],
                            },
                            {
                                test: /\.ejs/,
                                loader: 'rb_template-loader',
                            }
                        ]
                    },
                    resolve: {
                        alias: {},
                    },
                    devtool: isProduction ? '' : 'source-map',
                    watch: !isProduction,
                    debug: !isProduction,
                    plugins: [
                        new webpack.optimize.DedupePlugin(),
                        new webpack.optimize.CommonsChunkPlugin({
                            children: true,
                            async: true,
                            minSize: 10000,
                        }),
                        new webpack.optimize.CommonsChunkPlugin({
                            children: true,
                            async: true,
                            minSize: 3000,
                            minChunks: 3,
                        }),
                        new webpack.optimize.CommonsChunkPlugin({
                            children: true,
                            async: true,
                            minSize: 500,
                            minChunks: 6,
                        }),
                        new webpack.optimize.AggressiveMergingPlugin({
                            minSizeReduce: 3,
                            moveToParents: true,
                            entryChunkMultiplicator: 5,
                        }),
                        new webpack.optimize.AggressiveMergingPlugin({
                            minSizeReduce: 1.5,
                        }),
                        new webpack.DefinePlugin({
                            'process.env': {
                                'NODE_ENV': JSON.stringify(plugins.util.env.type),
                            },
                        }),
                    ],
                }
            ))
            .pipe(isProduction ? plugins.uglify() : plugins.util.noop())
            .pipe(isProduction ? plugins.rename({suffix: '.min'}) : plugins.util.noop())
            .on('error', function swallowError (error) {
                /* eslint-disable */
                console.log(error.toString());
                this.emit('end');
            })
            .pipe(gulp.dest(plugins.path.join(paths.dev, 'js')))
        ;
    };
};
