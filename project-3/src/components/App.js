import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {increment} from '../actions';
import {decrement} from '../actions';

const App = () => {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  return (
    <div>
      <h3> Counter {counter} </h3>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={ () => dispatch(decrement())}>-</button>
    


    </div>

  );
}

export default App