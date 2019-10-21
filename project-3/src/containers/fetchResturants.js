import {fetchResturantsPending, fetchResturantsSuccess, fetchResturantsError} from '../actions/index';

const fetchResturants = (query="") => {
    return dispatch => {
        dispatch(fetchResturantsPending());
        fetch('http://localhost:5000/companies/'+query.toString())
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.error){
                throw (res.error);
            } 
            dispatch(fetchResturantsSuccess(res));
            return res;
        })
        .catch(error=> {
            dispatch(fetchResturantsError(error));
        })
    }
}

export default fetchResturants;