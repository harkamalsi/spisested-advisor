import { fetchMoreResturants } from "../actions/index";
import { connect } from "react-redux";
import { getQuery } from "../reducers/fetchResturantsReducer";

const fetchMore = query => {
  return dispatch => {
    //dispatch(fetchResturantsPending(query, isNewQuery));
    fetch(query, {
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
        dispatch(fetchMoreResturants(res));
        return res;
      });
  };
};

export default fetchMore;
