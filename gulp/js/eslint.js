/**
 * Lints JavaScript files for formatting issues
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
                plugins.path.join(paths.assets.js, '**/*.js'),
                '!/**/vendor/**/*.js',
            ])
            .pipe(plugins.eslint({
                useEslintrc: true,
                configFile: '.eslintrc',
            }))
            .pipe(plugins.eslint.format())
            .pipe(plugins.eslint.failAfterError())
        ;
    };
};
