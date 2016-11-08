/**
 * SVGStore combines svg files into one with <symbol> elements.
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
                plugins.path.join(paths.assets.media, 'svg-sprite/**/!(svg-sprite)*.svg')
            ])
            .pipe(plugins.rename({prefix: 'icon-'}))
            .pipe(plugins.imagemin([
                plugins.imagemin.svgo({
                    plugins: require('./svgmin-config'),
                    js2svg: {
                        pretty: true
                    }
                })
            ]))
            .pipe(plugins.svgstore({
                inlineSvg: true,
            }))
            .pipe(gulp.dest(plugins.path.join(paths.assets.media, 'svg-sprite')))
        ;
    }
    
};
