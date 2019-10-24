export const FETCH_RESTURANTS_PENDING = "FETCH_RESTURANTS_PENDING"; // LOADING SYMBOL VED HENTING AV DATA
export const FETCH_RESTURANTS_SUCCESS = "FETCH_RESTURANTS_SUCCESS"; // HENTET DATA SUCCESFULLY
export const FETCH_RESTURANTS_ERROR = "FETCH_RESTURANTS_ERROR"; // ERROR VED HENTING AV DATA
export const FETCH_MORE_RESTURANTS = "FETCH_MORE_RESTURANTS";
export const FETCH_RESTURANTS_LOCATIONS = "FETCH_RESTURANTS_LOCATIONS";

export const fetchResturantsPending = () => ({
  type: FETCH_RESTURANTS_PENDING
});

export const fetchResturantsSuccess = (resturants, query) => ({
  type: FETCH_RESTURANTS_SUCCESS,
  resturants,
  query
});

export const fetchResturantsError = error => ({
  type: FETCH_RESTURANTS_ERROR,
  error
});

export const fetchResturantLocations = resturantLocations => ({
  type: FETCH_RESTURANTS_LOCATIONS,
  resturantLocations
});

export const fetchMoreResturants = resturants => ({
  type: FETCH_MORE_RESTURANTS,
  resturants
});
