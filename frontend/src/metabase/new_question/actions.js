/* eslint-disable */
import { createAction, createThunkAction } from 'metabase/lib/redux';
import { fetchDatabases } from 'metabase/redux/metadata';

export const ADVANCE_STEP = 'ADVANCE_STEP';
export const advanceStep = createAction(ADVANCE_STEP);

export const BACK = 'BACK';
export const back = createAction(BACK);

export const NEW_METRIC = 'NEW_METRIC';
export const newMetric = createThunkAction(NEW_METRIC, () => {
    return (dispatch) => {
        return dispatch(fetchDatabases())
    }
});

export const SELECT_FLOW = 'SELECT_FLOW';
export const selectFlow = createAction(SELECT_FLOW);

