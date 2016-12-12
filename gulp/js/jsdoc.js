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
        const opts = require('./jsdocConfig.json');

        gulp.src([
                'README.md',
                plugins.path.join(paths.npm, 'rawblock/components/**/*.js'),
                plugins.path.join(paths.npm, 'rawblock/utils/**/*.js'),
                plugins.path.join(paths.npm, 'rawblock/_main.js'),
            ], {read: false})
            .pipe(plugins.jsdoc3(opts, callback));
    }
};
