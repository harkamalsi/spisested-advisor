import React from 'react';
import './App.css';
import List from '././components/List/List.js'

const data = [
  {name:"McDonald",address:"Torgetvei 3",city:"Trondheim",smiley:2,rating:1},
  {name:1,address:2,city:323,smiley:2, rating:3},
  {name:2,address:3,city:2423,smiley:1, rating:2},
  {name:3,address:4,city:234,smiley:0, rating:5},
  {name:4,address:5,city:233,smiley:0, rating:5},
  {name:5,address:6,city:23,smiley:2, rating:3},
  {name:6,address:7,city:233,smiley:1, rating:4}
];

function App() {
  return (
    <div className="App">
      <List listRawData = {data}></List>
   
    </div>
  );
}

export default App;
