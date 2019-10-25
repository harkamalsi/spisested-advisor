import { fetchMoreResturants } from "../actions/index";

const fetchMore = query => {
  return dispatch => {
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
