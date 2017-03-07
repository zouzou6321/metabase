/* eslint-disable */
import { createAction, createThunkAction } from 'metabase/lib/redux';
import { fetchDatabases } from 'metabase/redux/metadata';

import { push } from 'react-router-redux';
import {
    serializeCardForUrl,
    startNewCard
} from 'metabase/lib/card';

import Urls from 'metabase/lib/urls';

export const ADVANCE_STEP = 'ADVANCE_STEP';
export const advanceStep = createAction(ADVANCE_STEP);

export const SET_TIP = 'SET_TIP';
export const setTip = createAction(SET_TIP);

export const BACK = 'BACK';
export const back = createAction(BACK);

export const NEW_METRIC = 'NEW_METRIC';
export const newMetric = createThunkAction(NEW_METRIC, () => (dispatch) =>
    // make our databases avaliable
    dispatch(fetchDatabases())
);

export const SELECT_AND_ADVANCE = 'SELECT_AND_ADVANCE';
export const selectAndAdvance = createThunkAction(SELECT_AND_ADVANCE, (selectionAction) => {
    return (dispatch) => {
        // selection action is a wrapper function that
        // dispatches an action provided by the caller
        dispatch(selectionAction())
        return dispatch(advanceStep())
    }
})

export const SELECT_FLOW = 'SELECT_FLOW';
export const selectFlow = createThunkAction(SELECT_FLOW, (flow) => {
    return (dispatch) => {
        // if the user is selecting a SQL starting point just dump them into SQL mode
        if(flow === 'sql') {
            const newSQL = startNewCard('native', 2)
            return dispatch(push(`/q#${serializeCardForUrl(newSQL)}`))
        }
        // otherwise return the flow type they selected
        return flow
    }
});
