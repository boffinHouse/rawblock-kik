module.exports = function(grunt){
    const isProduction = grunt.config.get('env') == 'production';
    const webpack = require('webpack');

    const plugins = [
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
                'NODE_ENV': JSON.stringify(grunt.config.get('env')),
            },
        }),
    ];

    return {
        options: {
            cache: true,
            entry: {
                '_main-behavior': './<%= paths.src %>/js/_main-behavior.js',
                '_crucial-behavior': './<%= paths.src %>/js/_crucial-behavior.js',
                '_polyfills': './<%= paths.src %>/js/_polyfills.js',
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
                alias: {

                }
            },
        },
        dev: {
            devtool: isProduction ? '' : 'sourcemap',
            watch: !isProduction,
            debug: !isProduction,
            output: {
                path: '<%= paths.dev %>/js/',
            },
            plugins: plugins,
        },
    };
};
