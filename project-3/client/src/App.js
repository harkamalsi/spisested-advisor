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
      <Searchbar updateSelectedRow={updateSelectedRow.bind(this)}></Searchbar>
      <div className="resultContainer">
        <div className="map">
          <Map selectedPointId={selectedRestaurant}></Map>
        </div>
        <div className="List">
          <List
            updateSelectedRow={updateSelectedRow.bind(this)}
            selectedRow={selectedRestaurant}
          ></List>
        </div>
      </div>
    </div>
  );
}

export default App;
