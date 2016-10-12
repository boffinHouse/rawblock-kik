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
//plugins.browserSync = require('browser-sync');
plugins.runSequence = require('run-sequence'); //temporary solution until the release of gulp 4.0


// Shared paths
const paths = {

    // Build paths
    base: __dirname,
    src: plugins.path.join(__dirname, 'source'),
    dev: plugins.path.join(__dirname, 'dev'),
    dist: plugins.path.join(__dirname, 'dist'),
    tasks: plugins.path.join(__dirname, 'gulp'),

    // Assets
    assets: {
        css: plugins.path.join(__dirname, 'source/sass'),
        js: plugins.path.join(__dirname, 'source/js'),
        fonts: plugins.path.join(__dirname, 'source/fonts'),
        media: plugins.path.join(__dirname, 'source/media')
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
gulp.task('html', plugins.getTaskModule('html/assemble'));
gulp.task('js', plugins.getTaskModule('js/webpack'));

/**
 * Utility tasks
 */

// Clean build directory
gulp.task('clean', (fn) => {
    return require('del')([
        plugins.path.join(paths.dev, '*'),
    ], fn);
});


/**
 * Main tasks
 */

//Task default
gulp.task('default', (fn) => {
    plugins.util.env.type = 'production';
    plugins.runSequence(['build', 'cssmin',], fn);
});

gulp.task('build', ['clean'], (fn) => {
    plugins.runSequence(['css', 'js', 'html',], fn);
})

//Task used in development phase.
gulp.task('dev', (fn) => {
    plugins.runSequence('build', ['watch'], fn);
});

