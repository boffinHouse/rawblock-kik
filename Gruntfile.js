(function () {
    'use strict';

    module.exports = function (grunt) {
        require('jit-grunt')(grunt, {

        });
        require('time-grunt')(grunt);

        // Project settings
        var options = {
            env: 'dev',
            config: {
                src: 'taskrunner/grunt/configs/*.js',
            },
            paths: {
                src: 'sources',
                dev: 'dev',
                dist: 'dist',

                build: '',
                tmp: 'tmp',
                helper: {
                    task: 'taskrunner/grunt/configs',
                    settings: 'taskrunner/task-settings',
                }
            },
            ports: {
                app: '8000',
                test: '9001',
                livereload: 35730
            },
        };

        var configs = require('load-grunt-configs')(grunt, options);

        grunt.initConfig(configs);

        grunt.task.loadTasks('taskrunner/grunt/tasks');

        grunt.registerTask('setDevEnv', function(){
            grunt.config.set('paths.build', grunt.config.get('paths.dev'));
            grunt.config.set('env', 'development');
        });

        grunt.registerTask('setProductionEnv', function(){
            grunt.config.set('paths.build', grunt.config.get('paths.dev'));
            grunt.config.set('env', 'production');
        });

        grunt.registerTask('default', [
            'build',
        ]);

        grunt.registerTask('test', [
            'eslint',
            //'qunit',
        ]);

        grunt.registerTask('svg', [
            'svgmin:svgIcons',
            'svgstore:svgIcons',
            'clean:tmp',
        ]);

        grunt.registerTask('css', [
            'scssglobbing',
            'sass:dev',
            'postcss',
            'clean:scssglobbing',
        ]);

        // Build task
        grunt.registerTask('build', [
            'setDevEnv',
            'dev',
            'connect:livereload',
            'watch',
        ]);

        grunt.registerTask('dev', [
            'clean:dev',
            'clean:tmp',
            //'csscomb',
            'svg',
            'css',
            'eslint',
            'uglify:inline',
            'assemble:dev',
            'handlebars:dev',
            'jst',
            'webpack:dev',
            'sync',
            'prettify:dev',
        ]);

        grunt.registerTask('dist', [
            'setProductionEnv',
            'clean:dist',
            'clean:tmp',
            'dev',
            'test',
            'copy:fonts',
            'copy:favicon',
            'copy:dist',
            'cssmin',
            'uglify:dist',
        ]);
    };

})();
