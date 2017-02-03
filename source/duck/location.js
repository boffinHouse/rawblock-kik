const LOCATION_CHANDED = 'sob/location/CHANGED';
const LOCATION_COMPONENT_LOADED = 'sob/location/LOCATION_COMPONENT_LOADED';

export const locationChanged = payload => ({
    type: LOCATION_CHANDED,
    payload,
});

export const locationComponentLoaded = query => ({
    type: LOCATION_COMPONENT_LOADED,
    query,
});

export default function reduce(state = {route: '', params: [], options: {}}, action) {
    switch (action.type){
        case LOCATION_CHANDED:
            state = {...action.payload};
            break;
        case LOCATION_COMPONENT_LOADED:
            state = {...action.payload};
            break;
    }

    return state;
}
