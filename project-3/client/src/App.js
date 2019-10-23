import React from "react";
import "./App.css";
import List from "././components/List/List.js";
import Searchbar from "././components/Searchbar/Searchbar.js";
import { getResturants, getResturantsError, getResturantsPending, getResturantLocations } from "./reducers/fetchResturantsReducer";
import Map from './components/Map/Mapcomponent'
import { connect } from 'react-redux';



function App(props) {      
  console.log(props.resturants)
  return (
    <div className="App">
      <Searchbar></Searchbar>
      <div className="resultContainer">
        <div className="map">
          <Map resturants={props.resturantLocations}></Map>
        </div>
        <div className="List">
          <List listRawData={props.resturants} ></List> 
       </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  resturants: getResturants(state),
  resturantLocations: getResturantLocations(state),
  error: getResturantsError(state),
  pending: getResturantsPending(state)
});


export default connect(
  mapStateToProps,
  null
)(App);
