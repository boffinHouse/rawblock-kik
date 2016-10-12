/**
 * Watch tasks observes file changes and handles on it
 *
 * @param paths {object} Shared paths from gulpfile
 * @param gulp {object} Gulp object
 * @param plugins {object} Shared tasks (uses gulp-load-plugins to get tasks from package.json)
 * @returns {Function} Return Module
 */
module.exports = function(paths, gulp, plugins) {
    'use strict';

    const watch = require('gulp-watch');

    const config = {
        css: [
            plugins.path.join(paths.assets.css, '{,**/}*.scss'),
            plugins.path.join(paths.modules, '/**/*.scss'),
        ],
        js: [
            plugins.path.join(paths.assets.js, '/**/*.js'),
            plugins.path.join(paths.modules, '/**/*.js'),
        ],
        html: [
            plugins.path.join(paths.html, '/**/*.{hbs,md,json}'),
            plugins.path.join(paths.modules, '/**/*.{hbs,md,json}'),
            plugins.path.join(paths.modules, '/**/*.data.js'),
        ],
        copy: [
            plugins.path.join(paths.assets.fonts, '/**/*.{ttf,woff}'),
            plugins.path.join(paths.assets.media, '/**/*'),
            plugins.path.join(paths.modules, '/**/*'),
        ]
    };

    return function() {

        //Watch for css changes
        plugins.watch(config.css, function() {
            gulp.start('css');
        });

        ////Watch for js changes
        //plugins.watch(config.js, function() {
        //    gulp.start('js');
        //});

        //Watch for html/hbs changes
        plugins.watch(config.html, function() {
            gulp.start('html');
        });

        ////Watch for html/hbs changes
        //plugins.watch(config.copy, function() {
        //    gulp.start('media:copy');
        //});
    };
};
