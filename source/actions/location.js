import deserialize from 'rawblock/utils/deserialize';

export const locationChanged = query => ({
    type: 'CHANGE_LOCATION',
    query,
});
