export default function loadJs( src, ordered, cb ){
    const script = document.createElement('script');

    if(cb){
        script.addEventListener('load', cb);
    }

    script.src = src;
    script.async = !ordered;

    document.head.appendChild(script);

    return script;
}
