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
    const extname = require('gulp-extname');

    const config = {
        files: {
            pages: [
                plugins.path.join(paths.html, 'pages/{,**/}*.hbs'),
                plugins.path.join(paths.components, '{,**/}*.hbs')
            ],
            partials: {
                templates: plugins.path.join(paths.html, '{,**/}*.hbs'),
                components: plugins.path.join(paths.components, '{,**/}*.{hbs, md}'),
            },
            helpers: {
                helpers: plugins.path.join(paths.base, '/helpers/handlebars.js')
            },
            data: {
                templates: plugins.path.join(paths.html, 'data/**/*.{js,json}'),
                modules: plugins.path.join(paths.components, '**/*.{json, js}')
            },
            moduleLayout: plugins.path.join(paths.html, 'layouts/modules_tpl.hbs')
        }
    };

    return () => {
        //Parials
        assemble.partials(config.files.partials.templates);
        assemble.partials(config.files.partials.components);

        assemble.layouts(plugins.path.join(paths.html, 'layouts/{,**/}*.hbs'))

        assemble.helpers(require('handlebars-helpers')());

        assemble.page('post.md', {content: 'This it a {{ title }}'});
        assemble.render('post.md', {title: 'Home'}, (err, view) => {
            console.log(view.content);
        });
        //return assemble
        //    .src(config.files.pages)
        //    //.toStream('pages')
        //    .pipe(assemble.renderFile())
        //    .pipe(extname())
        //    .pipe(gulp.dest(paths.dev))
        //;
    };

};
