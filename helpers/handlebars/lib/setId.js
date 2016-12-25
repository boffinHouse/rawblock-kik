let now = Date.now();

module.exports = (context, name, _options) => {
    now += Math.round(Math.random() * 9999999);

    const id = now.toString(36);

    if(arguments.length > 2){
        context[name] = id;
    } else {
        return id;
    }
};
