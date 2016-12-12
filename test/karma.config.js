// Karma configuration
// Generated on Fri Mar 21 2014 13:56:03 GMT+0100 (CET)

const BROWSER_NAME = 'Chrome';

module.exports = function (config) {
    config.set({
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
        ],
        frameworks: ['jasmine'],
        runnerPort: 9999,
        files: [
            '../dev/assets/js/_polyfills.js',
            '../dev/assets/js/_crucial-behavior.js',
            '../dev/assets/js/_main-behavior.js',

            '../test/test-helper.js',

            {
                pattern: '../dev/assets/js/*.js.map',
                included: false,
            },

            {
                pattern: '../dev/assets/js/*.js',
                included: false,
            },

            '../source/components/**/test/**/*-spec.js',
            '../source/assets/js/**/*-spec.js',
            {
                pattern: '../tests/fixtures/**/*',
                included: false,
            },
        ],
        autoWatch: false,

        singleRun: true,
        browsers: [BROWSER_NAME],
        background: false,

        // coverage reporter generates the coverage
        reporters: ['progress'],
        preprocessors: {

        },
    });
};
