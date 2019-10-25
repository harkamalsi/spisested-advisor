import React  from "react";
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import ReactDOM from "react-dom";
import List from "././components/List/List";
import Searchbar from "././components/Searchbar/Searchbar.js";
import App from "./App"
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

import configureMockStore from "redux-mock-store";

function shallowSetup() {

  const props = {
    pending: false,
    resturants: [],
    resturantLocations: [],
    error: null,
    query: "",
    page: 0
  }

  Enzyme.configure({ adapter: new Adapter() });

  const enzymeWrapper = shallow(<App {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Shallow rendered Todo Card', () => {
  it('should render a card with the details of the Todo', () => {
    // Setup wrapper and assign props.
    const { enzymeWrapper, props } = shallowSetup();
    expect(enzymeWrapper.find('#title').text()).toBe("Spisested Adviser");

  });
});

import * as actions from "./actions/index";

describe("Test redux actions", () => {

  it("should create an action fetch resturant success", () => {
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

  it("Should create an action fetch resturant error", () => {
    const error = "error";
    const expectedAction = {
      type: actions.FETCH_RESTURANTS_ERROR,
      error
    };
    expect(actions.fetchResturantsError(error)).toEqual(
      expectedAction
    );
  });

  it("Should create an action fetch resturant pending", () => {
    const expectedAction = {
      type: actions.FETCH_RESTURANTS_PENDING,
    };
    expect(actions.fetchResturantsPending()).toEqual(
      expectedAction
    );
  });
  
  it("Should create an action for fetch more resturants", () => {
    const resturants = [1, 2, 3]
    const expectedAction = {
      type: actions.FETCH_MORE_RESTURANTS,
      resturants
    };
    expect(actions.fetchMoreResturants(resturants)).toEqual(
      expectedAction
    );
  });
  
  it("Should create an action fetch resturant locations", () => {
    const resturantLocations = [1, 2, 3]
    const expectedAction = {
      type: actions.FETCH_RESTURANTS_LOCATIONS,
      resturantLocations
    };
    expect(actions.fetchResturantLocations(resturantLocations)).toEqual(
      expectedAction
    );
  });
  
});
 