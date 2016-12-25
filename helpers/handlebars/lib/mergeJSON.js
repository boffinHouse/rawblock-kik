module.exports = (() => {
    const _ = require('lodash');

    const slice = [].slice;

    const toObj = function (json) {
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
                console.log('error with JS string: ' + json);
                json = null;
            }
        }
        return json;
    };


    return function () {
        let args = slice.call(arguments);
        const options = args.pop();

        args = args.map(toObj);

        if (args.length == 1 && this) {
            args.unshift(this || options.data);
        }

        args.unshift({});

        return options.fn(_.merge.apply(_, args));
    };
})();

