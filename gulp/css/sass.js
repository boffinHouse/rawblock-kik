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

    return function() {
        const isProduction = plugins.util.env.type == 'production';

        gulp.src([plugins.path.join(paths.assets.css, 'styles.scss')])

            //Process Sass
            .pipe(plugins.sassGlob())
            .pipe(isProduction ?  plugins.util.noop() : plugins.sourcemaps.init())
            .pipe(plugins.sass({
                errLogToConsole: true,
                style: 'compressed',
            })).on('error', plugins.sass.logError)

            //Process PostCSS
            .pipe(plugins.postcss([
                autoprefixer({
                    browsers: ['last 2 version', 'ie >= 10', 'Android >= 4.3', 'Firefox ESR'],
                    cascade: false,
                    map: true,
                    remove: true,
                }),
                postcssImport(),
            ]))
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest(plugins.path.join(paths.dev, 'css')))
        ;
    };
    
};
