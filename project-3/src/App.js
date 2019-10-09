import React from 'react';
import logo from './logo.svg';
import './App.css';
import List from '././components/List/List.js'

function App() {
  return (
    <div className="App">
      <List listData = {[{name:0,address:1,city:2,rating:3}]}></List>
   
    </div>
  );
}

export default App;
