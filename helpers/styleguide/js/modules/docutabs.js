import iframeReady from './iframe-ready';

const tabExpando = 'docutabs-' + Date.now();

class DocsTabs {

    constructor(element){
        this.element = element;

        this.currentIndex = 0;

        this.getElements();
        this.addListener();
    }

    getElements(){
        this.buttons = Array.from(this.element.querySelectorAll('.doc-tabs-btn'));
        this.panels = Array.from(this.element.querySelectorAll('.doc-tabs-panel'));
    }

    selectItem(domOrIndex){
        if(typeof domOrIndex != 'number'){
            let index = this.buttons.indexOf(domOrIndex);

            if(index == -1){
                index = this.buttons.indexOf(domOrIndex);
            }

            domOrIndex = index;
        }

        if(domOrIndex == this.currentIndex || domOrIndex == -1 || !this.buttons[domOrIndex]|| !this.panels[domOrIndex]){return;}

        this.buttons[this.currentIndex].setAttribute('aria-expanded', 'false');
        this.panels[this.currentIndex].classList.toggle('is-open', false);

        this.currentIndex = domOrIndex;

        this.buttons[this.currentIndex].setAttribute('aria-expanded', 'true');
        this.panels[this.currentIndex].classList.toggle('is-open', true);
    }

    addListener(){
        this.buttons.forEach((element)=>{
            element.addEventListener('click', (e)=> {
                this.selectItem(e.currentTarget);
            });
        });
    }
}

iframeReady.subscribe((data)=>{
    Array.from(data.document.querySelectorAll('.doc-tabs')).forEach((element)=>{
        if(!element[tabExpando]){
            element[tabExpando] = new DocsTabs(element);
        }
    });
}, true);
