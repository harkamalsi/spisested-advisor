import { FETCH_RESTURANTS_PENDING, FETCH_RESTURANTS_SUCCESS, FETCH_RESTURANTS_ERROR } from '../actions/index';

const initialState = {
    pending: false,
    resturants: [],
    error: null,
    query: ""
}


const fetchResturantsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_RESTURANTS_PENDING:
            return {
                ...state,
                pending: true,
            };
        case FETCH_RESTURANTS_SUCCESS:
            if (state.query == action.query) {
                return {
                    ...state,
                    pending: false,
                    resturants: action.resturants.concat(state.resturants)
                };
            } else {
                return {
                    ...state,
                    pending: false,
                    resturants: action.resturants,
                    query: action.query
                };
            }
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
export const getQuery = state => state.query;


export default fetchResturantsReducer;
