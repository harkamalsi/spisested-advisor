import React from 'react';
import './Mapcomponent.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

  


const Mapcomponent = (props) => {

    console.log("mapcomponent updated");

    let coordinate = props.coordinates;

    let coordinates = [[63.415517, 10.404421], [63.41, 10.4], [63.43, 10.39],
    [63.43, 10.43], [63.42, 10.405], [63.40159, 10.4156]
    ]; 
    if (coordinate != ""){
        console.log(coordinate[0].coordinates);
        coordinates = [coordinate[0].coordinates.map(coordinate => parseFloat(coordinate))]
    }




    
    /* if (coordinate !== undefined) { 
        coordinates.push(coordinate.split(", ").map((element) => parseFloat(element)));
        console.log(coordinates);
        
    } else {
        coordinates = [63.415517, 10.404421]
    }; */

    const zoom = 12;
    
    return (
         <Map className='heo' center={coordinates[0]} zoom={zoom} maxZoom={16}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            <MapMarkers coordinates={coordinates}  />
        </Map> 
    );
}

//popuptext={"NTNU GLØS ONLINE-KONTORET"}


const MapMarkers = (props) => {
    

    console.log(props.coordinates);

    

    let i = 0;

    return (
        // React-leaflet
        // react-leaflet-markercluster
        <MarkerClusterGroup>
            {props.coordinates.map(coordinate => 
            <Marker key={i++} position={coordinate}>
                <Popup>Lat: {coordinate[0]} Long: {coordinate[1]}</Popup>
            </Marker>)}
        </MarkerClusterGroup>
        
    )
}


export default Mapcomponent