import {
  FETCH_RESTURANTS_PENDING,
  FETCH_RESTURANTS_SUCCESS,
  FETCH_RESTURANTS_ERROR,
  FETCH_RESTURANTS_LOCATIONS,
  FETCH_MORE_RESTURANTS
} from "../actions/index";

const initialState = {
  pending: false,
  resturants: [],
  resturantLocations: [],
  error: null,
  query: "",
  page: 0
};

const fetchResturantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESTURANTS_PENDING:
      return {
        ...state,
        pending: true,
        resturants: [],
        page: 0
      };

    case FETCH_RESTURANTS_SUCCESS:
      return {
        ...state,
        pending: false,
        resturants: action.resturants,
        query: action.query,
        page: state.page + 1
      };
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
      };
    case FETCH_MORE_RESTURANTS:
      return {
        ...state,
        resturants: state.resturants.concat(action.resturants),
        page: state.page + 1
      };
    default:
      return state;
  }
};

export const getPage = state => state.page;
export const getResturants = state => state.resturants;
export const getResturantLocations = state => state.resturantLocations;
export const getResturantsPending = state => state.pending;
export const getResturantsError = state => state.error;
export const getQuery = state => state.query;

export default fetchResturantsReducer;
