import {FETCH_RESTURANTS_PENDING, FETCH_RESTURANTS_SUCCESS, FETCH_RESTURANTS_ERROR} from '../actions/index';

const initialState = {
    pending: false,
    resturants: [],
    error: null
}


const fetchDataReducer = (state = initialState, action) => {

    switch(action.type){
        case FETCH_RESTURANTS_PENDING:
            return {
                ...state,
                pending: true
            };
        case FETCH_RESTURANTS_SUCCESS:
            return {
                ... state,
                pending: false,
                resturants: action.resturants
            };
        case FETCH_RESTURANTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            };
        default:
            return state;
    }
}


export const getResturants = state => state.resturants;
export const getResturantsPending = state => state.pending;
export const getResturantsError = state => state.error; 

export default fetchDataReducer;
