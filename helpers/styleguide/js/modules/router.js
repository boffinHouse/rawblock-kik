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

function changeIframeSrc(url)  {
    iframe.contentWindow.location.replace(url);
}

function getUrlFragment() {
    const fragment = (location.search + '&').match(regUrl);
   
    return fragment ? decodeURIComponent(fragment[1]) : getUrlTarget(iframe.src);
}

function pushUrl(url) {
    const currentUrl = baseUrl + '?url=' + (encodeURIComponent(url));
    history.pushState(null, '', currentUrl);
}

function updatePage(url) {
    url = url ? getUrlTarget(url) : getUrlFragment();
    
    currentUrl = url;
    
    changeIframeSrc(url);
    
    return url;
}

export default function pushState(url){
    url = updatePage(url);
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
