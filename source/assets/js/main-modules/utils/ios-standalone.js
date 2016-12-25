(function(document, navigator, standalone) {
    if ((standalone in navigator) && navigator[standalone]) {
        const location = window.location;
        const baseUrl = `${location.protocol}//${location.host}`;
        const hashedBaseUrl = `${baseUrl}${location.pathname}${location.search}#`;

        document.addEventListener('click', function(e) {

            if(e.isDefaultPrevented){return;}

            const anchor = e.target.closest('a[href]');

            if(!anchor){return;}

            const url = anchor.href;
            const target = anchor.target;

            if(url.startsWith(baseUrl) && !url.startsWith(hashedBaseUrl) && (!target || target == 'self')){
                location.href = url;
                e.preventDefault();
            }

        },false);
    }
})(document, window.navigator, 'standalone');
