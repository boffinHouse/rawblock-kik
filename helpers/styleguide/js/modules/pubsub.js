const wait = window.Promise ?
    Promise.resolve() :
    {
        then(fn){
            setTimeout(fn, 0);
        },
    }
;

export default function() {
    let store;
    const fns = [];

    const publish = (data, save) => {
        if(save){
            store = data;
        }

        fns.forEach(fn => fn(data));
    };

    const unsubscribe = (handler) => {
        const index = fns.indexOf(handler);

        if(index != -1){
            fns.splice(index, 1);
        }
    };

    const subscribe = (handler, getStored)=> {
        fns.push(handler);

        if(getStored && store !== undefined){
            wait.then(()=>{
                handler(store);
            });
        }
    };

    return {subscribe, unsubscribe, publish};
}
