const nav = document.querySelector('.doc-navbutton');

function navToggle(event) {
    const target =  event.target.closest('[aria-expanded]');
    const state = target.getAttribute('aria-expanded') == 'true' ? false : true;
    let toggle = state ? 'add' : 'remove';
    
    target.setAttribute('aria-expanded', state);
    document.body.classList[toggle]('is-nav-open');
    
    event.preventDefault();
}

if(nav) {
    nav.addEventListener('click', navToggle, false);
}
