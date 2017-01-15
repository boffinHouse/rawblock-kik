// Get target to update (This example iframe)
// Get URL to update
// Update url with like your-basic?url=button
// Update document title
// Create forward/back history
// Add class to active anchor and

//actionElement
//target
//popstate, replaceUrl
function test() {
    
}

document.addEventListener('click', (e) => {
    
    if(!e.preventDefault && e.target == 'a[href]') {
        console.log('hello');
    }
    console.log(e.target != e.currentTarget);
    e.preventDefault();
    
});


// const clearSlashes = (path) => {
//     return path.toString().replace(/\/$/, '').replace(/^\//, '');
// };
//
// const getURL = (event) => {
//     let root = clearSlashes(location.path);
//     console.log(root);
// };

//window.addEventListener('DOMContentLoaded', getURL);

// const router = {

//
//     getPage: (event) => {
//         //const target = event.target;
//         //const pathName = this.getFragment();
//
//         this.addPage();
//
//         event.preventDefault();
//     },
//
//     // clearSlashes(path) {
//     //     return path.toString().replace(/\/$/, '').replace(/^\//, '');
//     // }
//
//     getFragment: () => {
//         const name = location.search.match(/[^\?]+$/);
//         return name ? name[0] : 'index';
//     },
//
//     addPage: () => {
//         console.log('hello');
//     },
//
//     removePage: () => {
//
//     },
//
//     // changePage(event) {
//     //     const pageURL = event.target.getAttribute('href');
//     //     const currentURL = rootPath + '?' + pageURL.replace(/\.[^.$]+$/, '');
//     //
//     //     if(event.target != event.currentTarget && currentURL) {
//     //         // history.replaceState(null, null, currentURL);
//     //         iframe.contentWindow.location.replace(pageURL);
//     //     }
//     // }
// };
//
// export default router.init();

