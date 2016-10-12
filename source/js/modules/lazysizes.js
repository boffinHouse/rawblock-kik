require('lazysizes');
require('lazysizes/plugins/respimg/ls.respimg');
require('lazysizes/plugins/optimumx/ls.optimumx');
//require('lazysizes/plugins/parent-fit/ls.parent-fit');

let rbLiveClass;
const rb = window.rb;
const lazySizesConfig = window.lazySizesConfig || {};

lazySizesConfig.hFac = 1;
lazySizesConfig.constrainPixelDensity = true;

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

document.addEventListener('lazyunveilread', function(e){
    const container = e.target;
    const module = container.getAttribute('data-module');

    if(module) {
        if(rb.getComponent){
            rb.getComponent(container, module);
        } else {
            window.lazySizes.rAF(function(){
                container.classList.add(rbLiveClass);
            });
        }
    }
});

function jeroen() {};

