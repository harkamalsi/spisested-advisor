import React from 'react';
import './Mapcomponent.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';




const Mapcomponent = (props) => {

    console.log("mapcomponent updated");

    let resturants = props.resturants;


    let coordinates = [];
    let resturantNames = [];

    if (resturants != "" && resturants !== null && resturants !== undefined) {

        for (let i = 0; i < resturants.length; i++){
            if(resturants[i].coordinates != null){
                let coordinatesToFloat = resturants[i].coordinates.map(coordinate => parseFloat(coordinate));
                coordinates.push(coordinatesToFloat); 
            }
           
        }
        
    } else {
        coordinates = [[63.415517, 10.404421]];
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
            <MapMarkerCluster coordinates={coordinates} resturantNames={resturantNames}/>
        </Map>
    );
}

//popuptext={"NTNU GLØS ONLINE-KONTORET"}


const MapMarkerCluster = (props) => {


    console.log(props.resturantNames);

    let i = 0;

    return (
        // React-leaflet
        // react-leaflet-markercluster
        <MarkerClusterGroup>
            {props.coordinates.map(coordinate =>
                <Marker key={i++} position={coordinate}>
                    <Popup>{props.resturantNames}</Popup>
                </Marker>)}
        </MarkerClusterGroup>

    )
}

/* const MapMark = (props) => {


    return (
        
    )
}
 */

export default Mapcomponent