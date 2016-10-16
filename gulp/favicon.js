/**
 * Generating favicons for all
 *
 * @param paths {object} Shared paths from gulpfile
 * @param gulp {object} Gulp object
 * @param plugins {object} Shared tasks (uses gulp-load-plugins to get tasks from package.json)
 * @returns {Function} Return Module
 */
module.exports = function(paths, gulp, plugins) {
    const appSrc = plugins.path.join(paths.assets.media, 'app-icons');

    return function() {
        require('del')([appSrc]);

        gulp.src(plugins.path.join(paths.assets.media, 'favicon.svg'))
            .pipe(plugins.favicons({
                appName: 'My App',
                appDescription: 'This is my application',
                developerName: null,
                developerURL: null,
                background: '#020307',
                path: 'favicons/',
                url: 'http://haydenbleasel.com/',
                display: 'standalone',
                orientation: 'portrait',
                start_url: '/?homescreen=1',
                version: 1.0,
                logging: false,
                online: false,
                html: 'index.html',
                pipeHTML: true,
                replace: true,
                icons: {
                    android: true,
                    appleIcon: true,
                    appleStartup: false,
                    coast: false,
                    favicons: true,
                    firefox: true,
                    windows: true,
                    yandex: false,
                },
            }))
            .on('error', plugins.util.log)
            .pipe(gulp.dest(appSrc))
        ;
    };
};
