import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { UPDATE_SUGGESTIONS } from './actions';

// a description of the currently "focused" data on which suggestions are based
const descriptor = handleActions({
    [UPDATE_SUGGESTIONS]: { next: (state, { payload }) => payload.descriptor }
}, {});

// an array of categories returned by the recommenders
const categories = handleActions({
    [UPDATE_SUGGESTIONS]: { next: (state, { payload }) => payload.categories }
}, []);

export default combineReducers({
    descriptor,
    categories
});
