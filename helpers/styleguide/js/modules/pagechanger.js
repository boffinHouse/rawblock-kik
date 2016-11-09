const nav = document.querySelector('.doc-navmain');
const iframe = document.querySelector('.doc-page-iframe');

function changePage(event) {
    let targetHref = event.target.getAttribute('href');
    if(targetHref) {
        iframe.src = targetHref;
    }
    event.preventDefault();
}

nav.addEventListener('click', changePage, false);
