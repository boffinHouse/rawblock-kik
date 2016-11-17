/**
 * An API documentation generator for JavaScript
 *
 * @param paths {object} Shared paths from gulpfile
 * @param gulp {object} Gulp object
 * @param plugins {object} Shared tasks (uses gulp-load-plugins to get tasks from package.json)
 * @returns {Function} Return Module
 */
module.exports = (paths, gulp, plugins) => {
    'use strict';
    
    return (callback) => {
        gulp.src([
                'README.md',
                plugins.path.join(paths.npm, 'rawblock/components/**/*.js'),
            ], {read: false})
            .pipe(plugins.jsdoc3(require('./jsdocConfig.json'), callback));
    }
};
