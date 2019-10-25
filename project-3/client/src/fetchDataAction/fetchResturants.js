import {
  fetchResturantsPending,
  fetchResturantsSuccess,
  fetchResturantsError,
  fetchResturantLocations
} from "../actions/index";

const fetchResturants = (endpoint, query) => {
  return dispatch => {
    dispatch(fetchResturantsPending());
    fetch(endpoint + query, {
      headers: {
        "Content-type": "text/html; charset=iso-8859-1"
      },
      mode: "cors"
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        if (endpoint.includes("locations")) {
          dispatch(fetchResturantLocations(res));
        } else {
          dispatch(fetchResturantsSuccess(res, endpoint + query));
        }
        return res;
      })
      .catch(error => {
        dispatch(fetchResturantsError(error));
      });
  };
};

export default fetchResturants;
