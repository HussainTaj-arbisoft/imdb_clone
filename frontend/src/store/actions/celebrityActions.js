import * as types from './types';

export const listCelebritiesBornToday = () => dispatch => {
    dispatch({
        type: types.CELEBRITY_BORN_TODAY_LIST,
        payload: {} // TODO: 
    })
}
