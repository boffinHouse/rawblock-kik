import React from 'react';
import { render } from 'react-dom';
import Root from './components/root/root';
import configureStore from './cfg-store';

const store = configureStore();

render(
    <Root store={store} />,
    document.getElementById('root')
);


//require('../../../gulp/js/webpack/lazyglobloader!./../lazyglob.paths');
