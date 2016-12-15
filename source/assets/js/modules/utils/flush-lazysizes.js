if(window.lazySizes){
    const setLoadPriority = ()=>{
        if(window.lazySizesConfig.loadMode < 2){
            window.lazySizesConfig.loadMode = 2;
        }
    };

    lazySizes.init();

    setTimeout(()=>{
        if(window.lazySizesConfig.loadMode < 2 && window.rb && rb.ready){
            rb.ready.then(()=>{
                setTimeout(setLoadPriority, 2000);
            });
        }
    }, 9);
}
