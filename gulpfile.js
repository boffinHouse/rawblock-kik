/**
 * Dependencies
 *
 */
'use strict';

// Gulp + plugins
const gulp =  require('gulp');
const plugins = require('gulp-load-plugins')();

// Non-gulp modules
plugins.path = require('path');
plugins.browserSync = require('browser-sync');
plugins.runSequence = require('run-sequence'); //temporary solution until the release of gulp 4.0

// Shared paths
const paths = {

    // Build paths
    base: __dirname,
    src: plugins.path.join(__dirname, 'source'),
    dev: plugins.path.join(__dirname, 'dev'),
    dist: plugins.path.join(__dirname, 'dist'),
    doc: plugins.path.join(__dirname, 'docs'),
    tasks: plugins.path.join(__dirname, 'gulp'),

    // Assets
    assets: {
        css: plugins.path.join(__dirname, 'source/sass'),
        js: plugins.path.join(__dirname, 'source/js'),
        fonts: plugins.path.join(__dirname, 'source/fonts'),
        media: plugins.path.join(__dirname, 'source/media')
        //styleguide: plugins.path.join(__dirname, 'source/media')
    },

    // HTML templates, Components
    html: plugins.path.join(__dirname, 'source/templates'),
    components: plugins.path.join(__dirname, 'source/components'),

    //Node modules
    npm: plugins.path.join(__dirname, 'node_modules')
};


/**
 * Child tasks
 *
 */
plugins.getTaskModule = (task) => {
    return require(plugins.path.join(paths.tasks, task))(paths, gulp, plugins);
};

gulp.task('css', plugins.getTaskModule('css/sass'));
gulp.task('cssmin', plugins.getTaskModule('css/cssmin'));
gulp.task('watch', plugins.getTaskModule('watch'));
gulp.task('html', plugins.getTaskModule('html/html'));
gulp.task('js', plugins.getTaskModule('js/webpack'));
gulp.task('eslint', plugins.getTaskModule('js/eslint'));
gulp.task('browser-sync', plugins.getTaskModule('browser-sync'));
gulp.task('copy', plugins.getTaskModule('copy'));
gulp.task('favicon', plugins.getTaskModule('favicon'));
gulp.task('doc:html', plugins.getTaskModule('doc/doc-html'));


/**
 * Utility tasks
 */

// Clean build directory
gulp.task('clean', (fn) => {
    return require('del')([
        plugins.path.join(paths.dev, '*'),
    ], fn);
});

gulp.task('uglify:inline', function() {
    gulp.src(plugins.path.join(paths.src, 'js/_inlinehead-behavior.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(plugins.path.join(paths.dev, 'js/')));
});

/**
 * Main tasks
 */

gulp.task('default', (fn) => {
    plugins.util.env.type = 'production';
    plugins.runSequence(['build', 'cssmin',], fn);
});

gulp.task('dev', (fn) => {
    plugins.util.env.type = 'development';
    plugins.runSequence('build', ['watch', 'browser-sync'], fn);
});

gulp.task('testing', (fn) => {
    plugins.util.env.type = 'testing';
    plugins.runSequence('build', ['watch', 'browser-sync'], fn);
});

gulp.task('build', ['clean'], (fn) => {
    plugins.runSequence(['copy', 'css', 'eslint', 'js', 'uglify:inline'], ['html'], fn);
})
