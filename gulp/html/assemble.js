/**
 * Compile Assemble (Handlebars) templates to HTML.
 *
 * @param paths {object} Shared paths from gulpfile
 * @param gulp {object} Gulp object
 * @param plugins {object} Shared tasks (uses gulp-load-plugins to get tasks from package.json)
 * @returns {Function} Return Module
 */
module.exports = (paths, gulp, plugins) => {
    'use strict';

    const assemble = require('assemble')();

    return function() {

        //Layouts
        assemble.layouts(plugins.path.join(paths.html, 'layouts/{,**/}*.hbs'));

        //Partials
        assemble.partials(plugins.path.join(paths.html, '{,**/}*.hbs'));
        assemble.partials(plugins.path.join(paths.components, '{,**/}*.{hbs, md}'));

        //Helpers
        assemble.helpers(require('handlebars-helpers')());
        assemble.helpers(plugins.path.join(paths.html, 'helpers/{,**/}*.js'));

        //Data
        assemble.data(plugins.path.join(paths.html, 'data/**/*.{js,json}'));
        assemble.data(plugins.path.join(paths.components, '**/*.{json, js}'));

        assemble.src([plugins.path.join(paths.html, 'pages/{,**/}*.hbs'),])
            //.toStream('pages')
            .pipe(assemble.renderFile())
            .on('error', function swallowError(error) {
                /* eslint-disable */
                console.log(error.toString() + ' inside assemble');
                this.emit('end');
            })
            .pipe(plugins.extname())
            .pipe(gulp.dest(paths.dev))
        ;
    };
};
