import React, { useState } from "react";
import "./App.css";
import List from "././components/List/List.js";
import Searchbar from "././components/Searchbar/Searchbar.js";
import Map from "./components/Map/Mapcomponent";

function App(props) {
  const [selectedRestaurant, selectRestaurant] = useState(null);
  const updateSelectedRow = id => {
    selectRestaurant(id);
  };
  return (
    <div className="App">
      <div id="title">
        <h1>Spisested Adviser</h1>
      </div>
      <div id="searchbar">
        <Searchbar updateSelectedRow={updateSelectedRow.bind(this)}></Searchbar>
      </div>
      <div id="map">
        <Map selectedPointId={selectedRestaurant}></Map>
      </div>
      <div id="list">
        <List
          updateSelectedRow={updateSelectedRow.bind(this)}
          selectedRow={selectedRestaurant}
        ></List>
      </div>
    </div>
  );
}

export default App;
