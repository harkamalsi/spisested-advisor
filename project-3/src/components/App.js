import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {increment} from '../actions';
import {decrement} from '../actions';
import {addMarker} from '../actions';
import Mapcomponent from './Mapcomponent'
import {useState} from 'react';

function useForceUpdate() {
  const [value, set] = useState(true);
  return () => set(value => !value);
}

const App = () => {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  const [coordinate, setCoordinate] = useState(undefined);

  let coordinates = "62.415517, 10.404421";
  let submitCoordinates = "62.415517, 10.404421";

  const forceUpdate = useForceUpdate();
 
  const handleSubmit = (event) => {
    console.log('A coordinate was submitted: ' + coordinates);
    
    event.preventDefault();
    setCoordinate(coordinates);
  }


  return (
    <div>
      <h3> Counter {counter} </h3>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <br/><br/><br/>
      <form onSubmit={handleSubmit}>
        <label>Koordinater: 63.415517, 10.404421 
          <input 
            type="text" 
            onChange={(event) => coordinates = event.target.value} >
          </input>
        </label>
      <input type="submit" value="Submit"  />
      </form>
      <Mapcomponent coordinate={coordinate}></Mapcomponent>
    </div>

  );
}

export default App