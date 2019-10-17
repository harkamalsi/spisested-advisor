import React, { useState } from "react";
import ListRow from "../ListRow/ListRow.js";
import { Button } from "react-bootstrap";
import { ButtonToolbar } from "react-bootstrap";
import "./List.css";
/*
    Renders a List like component with expandable rows.

    Props:
    {listRawData} = A list of object with raw data (needs formatting)
        each element of the array will be displayed as a row.
    {onPreviousClick} = Triggers when Previous button clicked
    {onNextClick} = Triggers when Next button clicked
    {saveReview} = Syncronises user review with backend

    {listRawData} =(Array) [
        {
            id: "(Int)Unique ID for Business
            name: "(String)Name of the business",
            address: "(String)Adress without postcode"
            postcode: "(String)Postcode"
            city: "(String)City name",
            smileys:"(String)Formatted as each review $date$'-'$resultValue(0-3)$ 
                Each revies is separated by a '.' ",
            numberOfRatings: "(Int)Number of the total ratings ",
            sumStars:"(Int)Sum of all the stars given by the users"
        }, ...
    ]

*/
const List = props => {
  const [expandedRowId, setExpandedRow] = useState(null);
  //Logic to expand selected row (Can be used for test)
  function handleExpanedRow(id) {
    if (expandedRowId === id) return null;
    return id;
  }
  //update selected row to be expanded
  function updateExpandedRow(id) {
    setExpandedRow(handleExpanedRow(id));
  }
  function saveReview(id, starValue) {
    //logic for comunicating with API
    console.log(id, starValue);
  }
  let rows = props.listRawData.map(row => (
    <ListRow
      key={row.id}
      id={row.id}
      rowData={row}
      handleClick={updateExpandedRow.bind(this)}
      isExpanded={expandedRowId === row.id}
      saveReview={saveReview}
    ></ListRow>
  ));
  return (
    <ul className="Table">
      <ButtonToolbar id="Toolbar">
        <Button variant="outline-secondary">Forrige</Button>{" "}
        <p id="SideNr">Side nr 1</p>
        <Button variant="outline-secondary">Neste</Button>
      </ButtonToolbar>
      {rows}
    </ul>
  );
};

export default List;
