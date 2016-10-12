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

    return function() {

        //Watch for css changes
        plugins.watch([
            plugins.path.join(paths.assets.css, '{,**/}*.scss'),
            plugins.path.join(paths.components, '/**/*.scss'),
        ], function() {
            gulp.start('css');
        });

        //Watch for html/hbs changes
        plugins.watch([
            plugins.path.join(paths.html, '/**/*.{hbs,md,json}'),
            plugins.path.join(paths.components, '/**/*.{hbs,md,json}'),
            plugins.path.join(paths.components, '/**/*.data.js'),
        ], function() {
            gulp.start('html');
        });

        //plugins.watch([
        //    plugins.path.join(paths.assets.fonts, '/**/*.{ttf,woff}'),
        //    plugins.path.join(paths.assets.media, '/**/*'),
        //    plugins.path.join(paths.components, '/**/*'),
        //], function() {
        //    gulp.start('media:copy');
        //});
    };
};
