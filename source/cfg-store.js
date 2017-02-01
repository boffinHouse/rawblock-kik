import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';

const configureStore = () => {
    const middlewares = [thunk];

    if(typeof process != 'undefined' && process.env && process.env.NODE_ENV != 'production'){

    }

    return createStore(
        reducer,
        applyMiddleware(...middlewares)
    );
};

export default configureStore;
