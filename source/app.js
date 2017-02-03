import React from 'react';
import { render } from 'react-dom';
import Root from './components/root/root';
import configureStore from './cfg-store';

import createLocationDispatcher from './duck/location-dispatchers';
import './layouts/Home';

const store = configureStore();

export default {
    store,
    locationDispatchers: createLocationDispatcher(store.dispatch),
};

render(
    <Root store={store} />,
    document.getElementById('root')
);


//require('../../../gulp/js/webpack/lazyglobloader!./../lazyglob.paths');
