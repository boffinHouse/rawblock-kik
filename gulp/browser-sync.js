/**
 * Starts server and reloads
 *
 * @param paths {object} Shared paths from gulpfile}
 * @param gulp {object} Gulp object
 * @param plugins {object} Shared tasks (uses gulp-load-plugins to get tasks from package.json)
 * @returns {Function} Return Module
 */

module.exports = function(paths, gulp, plugins) {
    'use strict';

    return function() {
        const isTesting = plugins.util.env.type == 'testing';
        const history = require('connect-history-api-fallback');

        return plugins.browserSync({
            browser: !isTesting ? '' : [
                'google chrome',
                'firefox',
                'safari',
                'firefoxdeveloperedition',
                'google chrome canary',
            ],
            notify: false,
            port: 7000,
            startPath: '/app.html',
            server: { baseDir: paths.dev },
            middleware: [history({index: '/index.html'})],
        });
    };
};
