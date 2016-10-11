/**
 * CSSMin tasks to minify css files
 *
 * @param paths {object} Shared paths from gulpfile
 * @param gulp {object} Gulp object
 * @param plugins {object} Shared tasks (uses gulp-load-plugins to get tasks from package.json)
 * @returns {Function} Return Module
 */
module.exports = function(paths, gulp, plugins) {
    'use strict';

    return () => {

        gulp.src([plugins.path.join(paths.dev, '/css/*.css'), '!/**/*.min.css'])
            .pipe(plugins.cleanCss({
                keepSpecialComments: false,
            }))
            .pipe(plugins.extname({
                ext: '.min.css'
            }))
            .pipe(gulp.dest(plugins.path.join(paths.dev, '/css/')))
        ;
    }

    return gulp;
};
