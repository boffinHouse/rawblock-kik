import pushState from './router';

document.addEventListener('click', (e) => {
    const elem = e.target.closest('a[data-target][href]');
    
    if(elem) {
        pushState(elem.href);
        e.preventDefault();
    }
});
