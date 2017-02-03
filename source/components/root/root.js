import React from 'react';

import {Provider} from 'react-redux';
import Location from '../location/Location';

const Root = ({store}) => (
    <Provider store={store}>
        <Location></Location>
    </Provider>
);

Root.propTypes = {
    store: React.PropTypes.any
};


export default Root;
