import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './duck/reducers';

let composeEnhancers = compose;

if(typeof process != 'undefined' && process.env && process.env.NODE_ENV != 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

const configureStore = () => {
    const middlewares = [];

    if(typeof process != 'undefined' && process.env && process.env.NODE_ENV != 'production'){
        middlewares.push(require('redux-immutable-state-invariant')());
    }

    middlewares.push(thunk);

    return createStore(
        reducer,
        composeEnhancers(applyMiddleware(...middlewares)),

    );
};

export default configureStore;
