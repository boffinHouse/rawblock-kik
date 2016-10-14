/**
 * Copy specific files to build directory.
 *
 * @param paths {object} Shared paths from gulpfile
 * @param gulp {object} Gulp object
 * @param plugins {object} Shared tasks (uses gulp-load-plugins to get tasks from package.json)
 * @returns {Function} Return Module
 */

module.exports = function(paths, gulp, plugins) {
    'use strict';
    
    return function() {
        gulp.src([
            plugins.path.join(paths.assets.fonts, '/**/*'),
            plugins.path.join(paths.assets.media, '/**/*.{jpg,png,svg,webp}'),
        ], {base: paths.src})
            .pipe(plugins.changed(paths.dev))
            .pipe(gulp.dest(paths.dev));
    };
    
    return gulp;
};
