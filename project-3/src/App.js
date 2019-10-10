import React from 'react';
import './App.css';
import List from '././components/List/List.js'

const data = [
  {name:"McDonald",address:"Torgetvei 3",city:"Trondheim",smiley:2,rating:1},
  {name:"Burger King",address:2,city:"Bergen",smiley:2, rating:3},
  {name:"Villa paradiso",address:3,city:"Oslo",smiley:0, rating:5},
  {name:"Narvesen",address:"Stavangervei",city:"Stavanger",smiley:0, rating:5},
  {name:"Una Pizzeria",address:"something",city:"Trondheim",smiley:0, rating:5},
  {name:"Egon",address:6,city:"Oslo",smiley:2, rating:3},
  {name:"Seven Eleven",address:7,city:"Alta",smiley:1, rating:4}
];

function App() {
  return (
    <div className="App">
      <List listRawData = {data}></List>
   
    </div>
  );
}

export default App;
