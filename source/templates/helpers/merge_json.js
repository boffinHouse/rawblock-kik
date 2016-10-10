var _ = require('lodash');
module.exports.register = function (Handlebars/*, options*/) {

    Handlebars.registerHelper('mergeJSON', (function () {
        var slice = [].slice;
        var toObj = function (json) {
            if (typeof json == 'string') {
                try {
                    json = json.trim();
                    if (!/^(\{|\[).*(]|})$/.test(json)) {
                        json = '{' + json + '}';
                    }
                    /* jshint ignore:start */
                    json = (new Function('return (' + json + ')')());
                    /* jshint ignore:end */
                } catch (e) {
                    /* eslint-disable no-console */
                    console.log('error with JS string: ' + json);
                    /* eslint-enable no-console */
                    json = null;
                }
            }
            return json;
        };

        return function () {
            var args = slice.call(arguments);
            var options = args.pop();

            args = args.map(toObj);

            if (args.length == 1 && this) {
                args.unshift(this || options.data);
            }

            args.unshift({});
            return options.fn(_.merge.apply(_, args));
        };
    })());

};
