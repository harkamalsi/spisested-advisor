import React, { Component } from "react";
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import ReactDOM from "react-dom";
import App from "./App";

import configureStore from "redux-mock-store";
const mockStore = configureStore([]);

it("renders without crashing", () => {
  let store = mockStore({
    pending: false,
    resturants: [],
    resturantLocations: [],
    error: null,
    query: "",
    page: 0
  });
  
  let component = renderer.create(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const div = document.createElement("div");
  ReactDOM.render(component, div);
  ReactDOM.unmountComponentAtNode(div);
});

import * as actions from "./actions/index";

describe("actions", () => {
  it("should create an action to fetch resturant success", () => {
    const query = "some_query";
    const resturants = [1, 2];
    const expectedAction = {
      type: actions.FETCH_RESTURANTS_SUCCESS,
      resturants,
      query
    };
    expect(actions.fetchResturantsSuccess(resturants, query)).toEqual(
      expectedAction
    );
  });
});
