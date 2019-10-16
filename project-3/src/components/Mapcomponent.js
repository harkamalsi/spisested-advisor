import React from 'react';
import './Mapcomponent.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';





const Mapcomponent = (props) => {
    console.log("mapcomponent updated");
    let coordinate = props.coordinate;
    let coordinates; 
    console.log(coordinate);
    if (coordinate != undefined) {
        coordinates = coordinate.split(", ");
        console.log(coordinates);
        coordinates = coordinates.map((element) => parseFloat(element));
        
    for (let i = 0; i < coordinates.length; i++){
        
    }
    };

    const zoom = 12;
    
    return (
        <Map className='heo' center={coordinates} zoom={zoom}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            
            <MapMarker coordinates={coordinates} popuptext={"NTNU GLØS ONLINE-KONTORET"} />
            <MapMarker coordinates={[63.435687, 10.416358]} popuptext="HEI"></MapMarker>
        </Map>
    );
}


const MapMarker = (props) => {
    return (
        <Marker position={props.coordinates}>
            <Popup>
                {props.popuptext}
            </Popup>
        </Marker>
    )
}


export default Mapcomponent