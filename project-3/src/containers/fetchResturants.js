import {fetchResturantsPending, fetchResturantsSuccess, fetchResturantsError} from '../actions/index';

const fetchResturants = (query="") => {
    return dispatch => {
        dispatch(fetchResturantsPending());
        fetch(query)
        .then(res => res.json())
        .then(res => {
            if (res.error){
                throw (res.error);
            } 
            dispatch(fetchResturantsSuccess(res, query));
            return res;
        })
        .catch(error=> {
            dispatch(fetchResturantsError(error));
        })
    }
}

export default fetchResturants;