import React, { useState } from "react";
import "./Mapcomponent.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { connect } from "react-redux";
import { getResturantLocations } from "../../reducers/fetchResturantsReducer";
const Mapcomponent = props => {
  const centerOfNorway = [64.6427, 12.4805];
  const norwayZoomLevel = 5;
  const restaurantZoomLevel = 20;
  //Initial state of the Map component, zoom to see al norway and centered
  const [center, setCenter] = useState(centerOfNorway);
  const [zoom, setZoom] = useState(norwayZoomLevel);

  let resturants = props.resturants;

  let coordinates = [];
  let resturantNames = [];
  props.resturants.map(restaurant => {
    if (restaurant.coordinates !== null) {
      coordinates.push(restaurant.coordinates);
      resturantNames.push(restaurant.name);
    }
  });
  //If an element in the list is selected, find the relative restaurant
  if (props.selectedPointId !== null) {
    let selectedRestaurant = resturants.filter(
      restaurant => restaurant._id === props.selectedPointId
    )[0];
    //If the restaurant has valid coordinates,
    if (selectedRestaurant.coordinates !== null) {
      let tmpCoordinates = selectedRestaurant.coordinates;
      if (JSON.stringify(center) !== JSON.stringify(tmpCoordinates)) {
        //Zoom in to restaurant and center
        setCenter(tmpCoordinates);
        setZoom(restaurantZoomLevel);
      }
    } //If coordinate for the match restaurant is not in the database
    else if (JSON.stringify(center) !== JSON.stringify(centerOfNorway)) {
      //Zoom out to all norway and center
      setCenter(centerOfNorway);
      setZoom(norwayZoomLevel);
    }
  } //If no restaurant is selected, the zoom out to all norway
  else if (JSON.stringify(center) !== JSON.stringify(centerOfNorway)) {
    //Zoom out to all norway and center
    setCenter(centerOfNorway);
    setZoom(norwayZoomLevel);
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
    <MarkerClusterGroup>
      {props.coordinates.map((coordinate, index) => (
        <Marker key={index} position={coordinate}>
          <Popup>{props.resturantNames[index]}</Popup>
        </Marker>
      ))}
    </MarkerClusterGroup>
  );
};

const mapStateToProps = state => ({
  resturants: getResturantLocations(state)
});

export default connect(
  mapStateToProps,
  null
)(Mapcomponent);
