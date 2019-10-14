import React from 'react';
import './Mapcomponent.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


const Mapcomponent = () => {


    const position = [63.415517, 10.404421];
    const zoom = 12;
    return (
        <Map className='heo' center={position} zoom={zoom}>
            <TileLayer 
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            <Marker position={position}>
                <Popup>
                    NTNU GLØS <br/> 
                    ONLINE-KONTORET
                </Popup>
            </Marker>
            <Marker position={[63.435687, 10.416358]}>
                <Popup>
                    SABRURA SOLSIDEN <br/>
                    :D 10/10 stjerner
                </Popup>
            </Marker>

        </Map>
    );
    
}



export default Mapcomponent