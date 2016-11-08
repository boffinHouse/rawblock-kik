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
    const engine = require('engine-assemble');
    const layouts = require('handlebars-layouts');
    const fs = require('fs-extra');

    const createDocs = function(file) {
        let docLayout;
        const componentName = plugins.path.basename(file.path).replace(/\.[^.$]+$/, '');
        const matchName = /(\$componentName)/g;

        docLayout = fs.readFileSync(plugins.path.join(paths.helpers, 'styleguide/partials/styleguide.hbs'), 'utf8');
        docLayout = docLayout.replace(matchName, componentName)

        file.contents = new Buffer(docLayout);
    };
    
    function createHTML(pages, dest, isDocs) {
        
        assemble.engine('hbs', engine);
        assemble.helpers(layouts(engine.Handlebars));
        

        //Layouts
        assemble.layouts( plugins.path.join(paths.html, 'layouts/**/*.hbs'));
        assemble.layouts( plugins.path.join(paths.helpers, 'styleguide/layouts/**/*.hbs'));

        //Partials
        assemble.partials(plugins.path.join(paths.html, '**/*.hbs'));
        assemble.partials(plugins.path.join(paths.components, '**/*.{hbs, md}'));
        assemble.partials(plugins.path.join(paths.helpers, 'styleguide/**/*.hbs'));
        
        
        //Helpers
        assemble.helpers(require('handlebars-helpers')());
        assemble.helper('markdown', require('helper-markdown'));
        assemble.helpers(plugins.path.join(paths.base, 'helpers/handlebars/**/*.js'));
        
        //Data
        assemble.data(plugins.path.join(paths.html, 'data/**/*.{js,json}'));
        assemble.data(plugins.path.join(paths.components, '**/*.{json, js}'));

        return assemble.src(pages, {layout: 'default_tpl'})
                       .pipe(!isDocs ? plugins.util.noop() : plugins.tap(createDocs))
                       .pipe(plugins.rename(function(path) {
                           path.dirname = '';
                       }))
                       .pipe(assemble.renderFile())
                       .on('error', function swallowError(error) {
                            /* eslint-disable */
                            console.log(error.toString() + ' inside assemble');
                            this.emit('end');
                        })
                       .pipe(plugins.extname())
                       .pipe(gulp.dest(dest))
            ;
    }

    return () => {
        return plugins.eventStream.merge([
            createHTML(
                [
                    plugins.path.join(paths.html, 'pages/{,**/}*.hbs'),
                    plugins.path.join(paths.helpers, 'styleguide/pages/*.hbs'),
                ],
                paths.dev,
                false
            ),
            createHTML(
                [
                    plugins.path.join(paths.components, '{,**/}!(*_examples)*.hbs'),
                ],
                paths.dev,
                true
            )
        ]);
    };


};

