import {FETCH_RESTURANTS_SUCCESS, FETCH_RESTURANTS_PENDING, FETCH_RESTURANTS_ERROR, fetchResturantsPending, fetchResturantsSuccess, fetchResturantsError} from '../actions/index';

const fetchResturants = () => {
    return dispatch => {
        dispatch(fetchResturantsPending());
        fetch('http://10.22.15.83:5000/companies/?name=mcDonalds')
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