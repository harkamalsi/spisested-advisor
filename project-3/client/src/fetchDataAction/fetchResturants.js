import {fetchResturantsPending, fetchResturantsSuccess, fetchResturantsError, fetchResturantLocations} from '../actions/index';

const fetchResturants = (endpoint, query, newQuery=false) => {

    return dispatch => {
        dispatch(fetchResturantsPending(newQuery));
        fetch(endpoint + query)
        .then(res => res.json())
        .then(res => {
            if (res.error){
                throw (res.error);
            } 
            if (endpoint.includes("locations")){
                dispatch(fetchResturantLocations(res));
            } else {
                dispatch(fetchResturantsSuccess(res, query));
            }
            return res;
            
        })
        .catch(error=> {
            dispatch(fetchResturantsError(error));
        })
    }
}

export default fetchResturants;