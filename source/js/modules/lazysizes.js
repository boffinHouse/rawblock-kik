require('lazysizes');
require('lazysizes/plugins/respimg/ls.respimg');
require('lazysizes/plugins/optimumx/ls.optimumx');

// require('lazysizes/plugins/parent-fit/ls.parent-fit');

let rbLiveClass;
const rb = window.rb;
const lazySizesConfig = window.lazySizesConfig || {};

lazySizesConfig.hFac = 1;
lazySizesConfig.constrainPixelDensity = true;
lazySizesConfig.loadMode = 1;

if(!window.lazySizesConfig){
    window.lazySizesConfig = lazySizesConfig;
}

function configureMediaQueries(){
    var cssConfig = rb.cssConfig;
    document.removeEventListener('lazyunveilread', configureMediaQueries);
    Object.assign(lazySizesConfig.customMedia, cssConfig.mqs);
    rbLiveClass = ['js', 'rb', 'live'].join(cssConfig.nameSeparator || rb.nameSeparator || '-');
}

document.addEventListener('lazyunveilread', configureMediaQueries);

document.addEventListener('lazyunveilread', (e)=> {
    const container = e.target;
    const module = container.getAttribute('data-module');

    if(module) {
        if(rb.getComponent && rb.ready.isDone){
            rb.getComponent(container, module);
        } else {
            window.lazySizes.rAF(()=> {
                container.classList.add(rbLiveClass);
            });
        }
    }
});

if(document.querySelector('.lazyload')){
    lazySizes.init();
}
