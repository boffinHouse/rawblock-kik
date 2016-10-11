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

    const sassGlob = require('gulp-sass-glob');
    const autoprefixer = require('autoprefixer');
    const postcssImport = require('postcss-import');
    //const eyeglass = require('eyeglass').decorate;
    //const cleanCSS = require('gulp-clean-css');
    //const rename = require('gulp-rename');

    const config = {
        files: {
            main: plugins.path.join(paths.assets.css, 'styles.scss')
        },
        autoprefixer: {
            browsers: ['last 2 version', 'ie >= 10', 'Android >= 4.3', 'Firefox ESR'],
            cascade: false,
            map: true,
            remove: true,
        },
        sass: {
            errLogToConsole: true,
            //eyeglass: {
            //    enableImportOnce: true
            //},
            style: 'compressed',
        },
        csswring: {
            removeAllComments: true
        },
        dest: {
            main: 'assets/css',
            demo: 'preview/assets/css'
        },
        cleanCSS: {
            keepSpecialComments: false,
        },
    };

    return () => {

        gulp.src(config.files.main)

            //Process Sass
            .pipe(sassGlob())
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass(config.sass).on('error', plugins.sass.logError))

            //Process PostCSS
            .pipe(plugins.postcss([
                autoprefixer(config.autoprefixer),
                postcssImport(),
                //csswring(options.csswring),
            ]))
            .pipe(gulp.dest(plugins.path.join(paths.dev, 'css')))
    }

    return gulp;


    //function createCSS(globFiles, dest) {
    //
    //    return gulp.src(globFiles)
    //
    //        //Process Sass
    //        .pipe(sassGlob())
    //        .pipe(plugins.sourcemaps.init())
    //        .pipe(plugins.sass(config.sass).on('error', plugins.sass.logError))
    //
    //        //Process PostCSS
    //        .pipe(plugins.postcss([
    //            autoprefixer(config.autoprefixer),
    //            postcssImport(),
    //            //csswring(options.csswring),
    //        ]))
    //
    //        //Write files
    //        .pipe(plugins.sourcemaps.write('.'))
    //        .pipe(gulp.dest(plugins.path.join(paths.dev, dest)))
    //
    //        //Reload in Browser
    //        //.pipe(plugins.filter('**/*.css'))
    //        //.pipe(plugins.browserSync.reload({ stream: true }))
    //     ;
    //};
    //
    //return function() {
    //    return plugins.eventStream.merge(
    //            createCSS(config.files.main, config.dest.main),
    //            createCSS(config.files.demo, config.dest.demo)
    //    );
    //};


};
