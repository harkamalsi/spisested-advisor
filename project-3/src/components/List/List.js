import React, { useState } from "react";
import ListRow from "../ListRow/ListRow.js";
import { Button } from "react-bootstrap";
import { ButtonToolbar } from "react-bootstrap";
import "./List.css";


import { getQuery } from "../../reducers/fetchResturantsReducer";
import fetchResturants from '../../containers/fetchResturants';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
/*
    Renders a List like component with expandable rows.

    Props:
    {listRawData} = A list of object with raw data (needs formatting)
        each element of the array will be displayed as a row.
    {totalPages} = The number of the total pages of the list
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

  function handleNextClick() {
    props.fetchResturants(props.query);
  }

  function handlePreviousClick() {

  }



  console.log(props.listRawData)
  let rows =
    props.listRawData === undefined ? (
      <h2>Søkeresultater listes her</h2>
    ) : (
      props.listRawData.map(row => (
        <ListRow
          key={row.id}
          id={row.id}
          rowData={row}
          handleClick={updateExpandedRow.bind(this)}
          isExpanded={expandedRowId === row.id}
          saveReview={saveReview}
        ></ListRow>
      ))
    );
  return (
    <ul className="Table">
      <ButtonToolbar id="Toolbar">
        <Button
          id="Previous"
          variant="outline-secondary"
          onClick={handlePreviousClick.bind(this)}
        >
          Forrige
        </Button>{" "}
        <p id="SideNr">Side nr 1/{props.totalPages}</p>
        <Button
          id="Next"
          variant="outline-secondary"
          onClick={handleNextClick.bind(this)}
        >
          Neste
        </Button>
      </ButtonToolbar>
      <div id="Rows">{rows}</div>
    </ul>
  );
};



const mapDispatchToProps = dispatch => bindActionCreators({
  fetchResturants: fetchResturants
}, dispatch)

const mapStateToProps = state => ({
  query: getQuery(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
