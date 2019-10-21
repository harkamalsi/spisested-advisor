export const FETCH_RESTURANTS_PENDING = 'FETCH_RESTURANTS_PENING'; // LOADING SYMBOL VED HENTING AV DATA
export const FETCH_RESTURANTS_SUCCESS = 'FETCH_RESTURANTS_SUCCES'; // HENTET DATA SUCCESFULLY
export const FETCH_RESTURANTS_ERROR = 'FETCH_RESTURANTS_ERROR'; // ERROR VED HENTING AV DATA

export const fetchResturantsPending = () => ({
    type: FETCH_RESTURANTS_PENDING
});

export const fetchResturantsSuccess = (resturants) => ({
    type: FETCH_RESTURANTS_SUCCESS,
    resturants
});

export const fetchResturantsError = (error) => ({
    type: FETCH_RESTURANTS_ERROR,
    error
});
