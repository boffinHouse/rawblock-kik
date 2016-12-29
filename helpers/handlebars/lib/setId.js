let now = Date.now();

module.exports = (context, name, _options) => {
    let ret;

    now += Math.round(Math.random() * 9999999);

    if(typeof context == 'string'){
        name = context;
        context = {};
        ret = context;
    }

    context[name] = now.toString(36);

    return ret;
};
