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
    const gulpWebpack = require('gulp-webpack');

    function createJS(entry, dest) {
        const isProduction = plugins.util.env.type == 'production';

        let webpackPlugins = [
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
        ];

        if(isProduction){
            webpackPlugins = [
                new webpack.DefinePlugin({
                    'process.env': {
                        'NODE_ENV': '"production"',
                    },
                }),
                new webpack.optimize.UglifyJsPlugin(),
            ].concat(webpackPlugins);
        }

        const config = {
            cache: true,
            entry: entry,
            output: {
                filename: '[name].js',
                chunkFilename: '[chunkhash].js',
            },
            module: {
                rules: [
                    {
                        test: /\.jsx?$|\.es6$|\.es2015/,
                        exclude: /node_modules\/(?!(rawblock)\/).*/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                compact: true,
                                plugins: [
                                    ['transform-runtime', {
                                        polyfill: false,
                                    }],
                                ],
                                presets: [['es2015', { loose: true, modules: false }], 'es2016', 'es2017'],
                            },
                        },
                    },
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader'],
                    },
                    {
                        test: /\.ejs/,
                        use: 'rb_template-loader',
                    },
                ],
            },
            // resolve: {
            //     alias: {},
            // },
            devtool: isProduction ? '' : 'source-map',
            watch: !isProduction,
            // debug: !isProduction,
            plugins: webpackPlugins,
        };

        return gulp.src([plugins.path.join(paths.assets.js, '_*.js')])
            .pipe(
                gulpWebpack(config, webpack)
                    .on('error', function swallowError (error) {
                        /* eslint-disable */
                        console.log(error.toString());
                        this.emit('end');
                    }
                )
            )
            // .pipe(isProduction ? plugins.rename({suffix: '.min'}) : plugins.util.noop())
            .pipe(gulp.dest(dest))
        ;
    }

    return () => {
        plugins.eventStream.merge([
           createJS(
               {
                   '_inlinehead-behavior': plugins.path.join(paths.assets.js, '_inlinehead-behavior.js'),
                   '_crucial-behavior': plugins.path.join(paths.assets.js, '_crucial-behavior.js'),
                   '_main-behavior': plugins.path.join(paths.assets.js, '_main-behavior.js'),
                   '_polyfills': plugins.path.join(paths.assets.js, '_polyfills.js'),
               },
               plugins.path.join(paths.devAssets, 'js')
           ),
           createJS(
               {
                   '_styleguide': plugins.path.join(paths.helpers, 'styleguide/js/_styleguide.js'),
               },
               plugins.path.join(paths.doc, 'js')
           )
       ]);
    };
};
