const screensize = document.querySelector('.doc-screensize');
const iframe = document.querySelector('.doc-page-iframe');

function changeScreensize(event) {
    const screensizeData = event.target.getAttribute('data-screensize');
    
    if(event.target && screensizeData) {
        iframe.setAttribute('data-framesize', screensizeData);
        event.preventDefault();
    }
}

window.addEventListener('popstate', (event) => {
    console.log(event);
});


screensize.addEventListener('click', changeScreensize, false);


