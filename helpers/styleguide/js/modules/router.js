
//const rootPath = iframe.getAttribute('data-location');
// const cacheBackward = [];
// const cacheForward = [];

export default class Router {
    constructor() {
        this.nav = document.querySelector('.doc-navmain');
        this.iframe = document.querySelector('.doc-page-iframe');
        
        this.getEvent();
    }
    
    getEvent() {
        window.addEventListener('DOMContentLoaded', this.getPage);
        this.nav.addEventListener('click', this.getPage);
    }
    
    getPage(event) {
        const target = event.target;
        //const pathName = this.getFragment();
       
        this.addPage();
        
        event.preventDefault();
    }
    
    // clearSlashes(path) {
    //     return path.toString().replace(/\/$/, '').replace(/^\//, '');
    // }
    
    getFragment() {
        const name = location.search.match(/[^\?]+$/);
        return name ? name[0] : 'index';
    }
    
    addPage() {
        console.log('hello');
    }
    
    removePage() {
        
    }
    
    // changePage(event) {
    //     const pageURL = event.target.getAttribute('href');
    //     const currentURL = rootPath + '?' + pageURL.replace(/\.[^.$]+$/, '');
    //
    //     if(event.target != event.currentTarget && currentURL) {
    //         // history.replaceState(null, null, currentURL);
    //         iframe.contentWindow.location.replace(pageURL);
    //     }
    // }
}


