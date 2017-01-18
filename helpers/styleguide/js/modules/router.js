import iframePubSub from './iframe-ready';
// Update document title
// Add class to active anchor and
let currentUrl;
const baseUrl = location.href.split('?')[0];
const iframe = document.querySelector('#iframe');
const regUrl = /url=(.+)[#&]/;


function getUrlTarget(url) {
    return url.replace(location.origin + '/', '');
}

function changeIframeSrc(path)  {
    iframe.contentWindow.location.replace(path);
    
}

function getUrlFragment() {
    const fragment = (location.search + '&').match(regUrl);
   
    return fragment ? decodeURIComponent(fragment[1]) : getUrlTarget(iframe.src);
}

function pushUrl(page) {
    const currentUrl = baseUrl + '?url=' + (encodeURIComponent(page));
    history.pushState(null, '', currentUrl);
}

function updatePage(href) {
    href = href ? getUrlTarget(href) : getUrlFragment();
    
    currentUrl = href;
    
    changeIframeSrc(href);
    
    return href;
}

export default function pushState(url){
    url =updatePage(url);
    pushUrl(url);
}

iframePubSub.subscribe((data)=>{
    const currentLoadedUrl = getUrlTarget(data.window.location.href);
    
    if(currentLoadedUrl != currentUrl){
        currentUrl = currentLoadedUrl;
        history.replaceState(null, '', baseUrl + '?url=' + (encodeURIComponent(currentLoadedUrl)));
    }
});

window.addEventListener('popstate', () => {
    updatePage();
});

updatePage();
