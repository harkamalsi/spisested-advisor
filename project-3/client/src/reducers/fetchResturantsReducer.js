import { FETCH_RESTURANTS_PENDING, FETCH_RESTURANTS_SUCCESS, FETCH_RESTURANTS_ERROR, FETCH_RESTURANTS_LOCATIONS } from '../actions/index';

const initialState = {
    pending: false,
    resturants: [],
    resturantLocations: [], 
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
        case FETCH_RESTURANTS_LOCATIONS:
            return {
                ...state,
                pending: false,
                resturantLocations: action.resturantLocations
            }
        default:
            return state;
    }
}


export const getResturants = state => state.resturants;
export const getResturantLocations = state => state.resturantLocations;
export const getResturantsPending = state => state.pending;
export const getResturantsError = state => state.error;
export const getQuery = state => state.query;


export default fetchResturantsReducer;
