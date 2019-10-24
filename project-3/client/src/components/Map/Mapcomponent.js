import React, { useState } from "react";
import "./Mapcomponent.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

const Mapcomponent = props => {
  const [center, setCenter] = useState([63.415517, 10.404421]);
  //const center = [63.415517, 10.404421];
  let resturants = props.resturants;

  let coordinates = [];
  let resturantNames = [];

  if (resturants != "" && resturants !== null && resturants != undefined) {
    for (let i = 0; i < resturants.length; i++) {
      if (resturants[i].coordinates !== null) {
        let coordinatesToFloat = resturants[i].coordinates.map(coordinate =>
          parseFloat(coordinate)
        );
        coordinates.push(coordinatesToFloat);
        resturantNames.push(resturants[i].name);
      }
    }
  } else {
    coordinates = [center];
    resturantNames = ["NTNU Gløs Online"];
  }

  const zoom = 12;

  if (props.selectedPointId !== null) {
    let selectedRestaurant = resturants.filter(
      restaurant => restaurant._id === props.selectedPointId
    )[0];
    if (selectedRestaurant.coordinates !== null) {
      let tmpCoordinates = selectedRestaurant.coordinates.map(coordinate =>
        parseFloat(coordinate)
      );
      if (center[0] !== tmpCoordinates[0] && center[1] !== tmpCoordinates[1]) {
        setCenter(tmpCoordinates);
      }
    }
  }
  return (
    <Map className="mapComponent" center={center} zoom={zoom} maxZoom={18}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <MapMarkerCluster
        coordinates={coordinates}
        resturantNames={resturantNames}
      />
    </Map>
  );
};

const MapMarkerCluster = props => {
  return (
    // React-leaflet
    // react-leaflet-markercluster
    <MarkerClusterGroup>
      {props.coordinates.map((coordinate, index) => (
        <Marker key={index} position={coordinate}>
          <Popup>{props.resturantNames[index]}</Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};

export default Mapcomponent;
