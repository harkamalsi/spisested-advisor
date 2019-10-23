import React, { useState, useEffect } from "react";
import ListRow from "../ListRow/ListRow.js";
import "./List.css";


import { getQuery } from "../../reducers/fetchResturantsReducer";
import fetchResturants from '../../fetchDataAction/fetchResturants';
import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
/*
    Renders a List like component with expandable rows.

    Props:
    {listRawData} = A list of object with raw data (needs formatting)
        each element of the array will be displayed as a row.
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
  const [hasMoreData, setMoreData] = useState(true);


  useEffect(() => {
    const table = document.getElementById("Table");

    table.addEventListener("scroll", e => {
      const el = e.target;
      //If the height of the table + the dynamic height of the scrolling cursor
      // is equal to the total scrollable height of the table, bottom is reached and
      // new data must be requested
      if (el.scrollTop + el.clientHeight === el.scrollHeight) {
        fetchMoreData();
      }
    });
  }, []);

  function fetchMoreData() {
    console.log("buttom reaced");
    console.log("Fetch more list items!");
    //TODO: Fetch routine with stored query and append fetched data to already stored.
    if (hasMoreData) {
      //fetch data from server
      //if data is empty --> no more data on server --> set hasMoreData to false
      if (null) setMoreData(false);
      //so it doesn't send unnecessary fetch requests
    }
  }

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
    let body = { id, stars: starValue };
    fetch("http://localhost:5000/companies/giverating", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  }


  console.log(props.listRawData)
  let rows =
    props.listRawData === undefined ? (
      <h2>Søkeresultater listes her</h2>
    ) : (
      props.listRawData.map(row => (
        <ListRow
          key={row._id}
          id={row._id}
          rowData={row}
          handleClick={updateExpandedRow.bind(this)}
          isExpanded={expandedRowId === row._id}
          saveReview={saveReview}
        ></ListRow>
      ))
    );
  return (
    <ul id="Table">{rows}</ul>
  );
};



const mapDispatchToProps = dispatch => bindActionCreators({
  fetchResturants: fetchResturants
}, dispatch)

const mapStateToProps = state => ({
  query: getQuery(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
