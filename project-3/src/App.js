import React from "react";
import "./App.css";
import List from "././components/List/List.js";

const data = [
  {
    id: 0,
    name: "McDonald",
    address: "Torgetvei 3",
    postcode: "7012",
    city: "Trondheim",
    smileys:
      "06202000-0.02011993-1.12012021-0.02012010-2.11122012-1.09122019-3",
    numberOfRatings: 42,
    sumStars: 122
  },
  {
    id: 1,
    name: "Burger King",
    address: "Somethingveien 55",
    postcode: "7012",
    city: "Bergen",
    smileys:
      "06202000-0.02011993-1.12012021-0.02012010-2.11122012-1.09122019-3",
    numberOfRatings: 44,
    sumStars: 230
  },
  {
    id: 2,
    name: "Villa paradiso",
    address: "Somethingveien 55",
    postcode: "7012",
    city: "Oslo",
    smileys:
      "06202000-0.02011993-1.12012021-0.02012010-2.11122012-1.09122019-3",
    numberOfRatings: 27,
    sumStars: 122
  },
  {
    id: 3,
    name: "Narvesen",
    address: "Stavangervei",
    postcode: "1100",
    city: "Stavanger",
    smileys:
      "06202000-0.02011993-1.12012021-0.02012010-2.11122012-1.09122019-3",
    numberOfRatings: 30,
    sumStars: 122
  },
  {
    id: 4,
    name: "Una Pizzeria",
    address: "Somethingveien 55",
    postcode: "7012",
    city: "Trondheim",
    smileys:
      "06202000-0.02011993-1.12012021-0.02012010-2.11122012-1.09122019-3",
    numberOfRatings: 60,
    sumStars: 122
  },
  {
    id: 5,
    name: "Egon Restaurant",
    address: "Somethingveien 55",
    postcode: "7012",
    city: "Oslo",
    smileys:
      "06202000-0.02011993-1.12012021-0.02012010-2.11122012-1.09122019-3",
    numberOfRatings: 44,
    sumStars: 100
  },
  {
    id: 6,
    name: "Seven Eleven",
    address: "Somethingveien 55",
    postcode: "7012",
    city: "Alta",
    smileys:
      "06202000-0.02011993-1.12012021-0.02012010-2.11122012-1.09122019-3",
    numberOfRatings: 70,
    sumStars: 300
  }
];

function App() {
  return (
    <div className="App">
      <List listRawData={data} totalPages={112}></List>
    </div>
  );
}

export default App;
