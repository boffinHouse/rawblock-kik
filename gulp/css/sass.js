/**
 * CSS tasks to create css files from sass
 *
 * @param paths {object} Shared paths from gulpfile
 * @param gulp {object} Gulp object
 * @param plugins {object} Shared tasks (uses gulp-load-plugins to get tasks from package.json)
 * @returns {Function} Return Module
 */
module.exports = function(paths, gulp, plugins) {
    'use strict';

    const autoprefixer = require('autoprefixer');
    const postcssImport = require('postcss-import');
    const postcssAssets = require('postcss-assets');
    const postcssInlineSVG = require('postcss-inline-svg');
    const postcssSVGO = require('postcss-svgo');
    
    function createCSS(files, dest) {
        const isProduction = plugins.util.env.type == 'production';
        
        return gulp.src(files)
    
                   //Process Sass
                   .pipe(plugins.sassGlob())
                   .pipe(isProduction ? plugins.util.noop() : plugins.sourcemaps.init())
                   .pipe(plugins.sass({
                       errLogToConsole: true,
                       style: 'compressed',
                   }))
                   .on('error', plugins.sass.logError)
    
                   //Process PostCSS
                   .pipe(plugins.postcss([
                       autoprefixer({
                           browsers: ['last 2 version', 'ie >= 10', 'Android >= 4.3', 'Firefox ESR'],
                           cascade: false,
                           map: true,
                           remove: true,
                       }),
                       postcssImport(),
                      
                       postcssInlineSVG(
                           {
                               path: plugins.path.join(paths.assets.media, 'svg-sprite'),
                           }
                       ),
                       postcssSVGO({
                           plugins: require('./svgmin-config'),
                       }),
                       // postcssAssets({
                       //     //loadPaths: [plugins.path.join(paths.assets.media, 'svg-sprite')],
                       // }),
                   ]))
                   .pipe(plugins.sourcemaps.write('.'))
                   .pipe(gulp.dest(dest))
            ;
    }

    return () => {
        return plugins.eventStream.merge([
            createCSS(
                [plugins.path.join(paths.assets.css, 'styles.scss')],
                plugins.path.join(paths.devAssets, 'css')
            ),
            createCSS(
                [plugins.path.join(paths.helpers, 'styleguide/sass/styleguide.scss')],
                plugins.path.join(paths.doc, 'css')
            )
        ])
    };
    
};
