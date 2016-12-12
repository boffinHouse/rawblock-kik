module.exports = (paths, gulp, plugins) => {
    'use strict';
    const Server = require('karma').Server;

    return (done) => {
        new Server({
            configFile: plugins.path.join(paths.base, 'test/karma.config.js'),
            singleRun: false,
        }, done).start();
    }
};
