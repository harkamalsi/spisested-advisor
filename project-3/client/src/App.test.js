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
  // Sample props to pass to our shallow render
  const props = {
    pending: false,
    resturants: [],
    resturantLocations: [],
    error: null,
    query: "",
    page: 0
  }
  // wrapper instance around rendered output
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
    // enzymeWrapper.find(selector) : Find every node in the render tree that matches the provided selector. 
    expect(enzymeWrapper.find('#title').text()).toBe("Spisested Adviser");

    // enzymeWrapper.containsMatchingElement(node i.e reactElement) : Check if the provided React element matches one element in the render tree. Returns a boolean.
  });
});


/* const mockStore = configureMockStore([]);

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
 */
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
 