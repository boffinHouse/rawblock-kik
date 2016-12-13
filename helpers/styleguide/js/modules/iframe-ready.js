import pubsub from './pubsub';

const data = {};
const iframe = document.querySelector('.doc-page-iframe');
const iframePubSub = pubsub();

function detectReady(){
    data.window = iframe.contentWindow;

    data.document = data.window.document || iframe.contentDocument;

    if(data.document && (document.readyState == 'complete' || document.readyState == 'interactive')){
        iframePubSub.publish(data);
    }
}

iframe.addEventListener('load', detectReady);
iframe.addEventListener('error', detectReady);

detectReady();

export default iframePubSub;
