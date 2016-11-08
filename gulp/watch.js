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
            plugins.path.join(paths.assets.css, '**/*.scss'),
            plugins.path.join(paths.components, '**/*.scss'),
           plugins.path.join(paths.helpers, 'styleguide/sass/*.scss'),
        ], function() {
            gulp.start('css');
        });

        //Watch for html/hbs changes
        plugins.watch([
            plugins.path.join(paths.html, '**/*.{hbs,md,json}'),
            plugins.path.join(paths.components, '**/*.{hbs,md,json}'),
            plugins.path.join(paths.helpers, 'styleguide/**/*.{hbs,md,json}'),
        ], function() {
            gulp.start('html');
        });
    
        //Watch for inline JS changes
        plugins.watch([
            plugins.path.join(paths.assets.js, '_inlinehead-behavior.js'),
        ], function() {
            gulp.start('uglify:inline');
        });

        //Watch for media changes
        plugins.watch([
           plugins.path.join(paths.assets.fonts, '/**/*'),
           plugins.path.join(paths.assets.media, '/**/*'),
        ], function() {
           gulp.start('copy');
        });
    };
};
