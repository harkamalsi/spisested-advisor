import React, { useEffect } from "react";
import ListRow from "../ListRow/ListRow.js";
import "./List.css";
import fetchMore from "../../fetchDataAction/fetchMoreResturants";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
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
  useEffect(() => {
    const table = document.getElementById("Table");

    table.addEventListener("scroll", e => {
      const el = e.target;
      //If the height of the table + the dynamic height of the scrolling cursor
      // is equal to the total scrollable height of the table, bottom is reached and
      // new data must be requested
      if (el.scrollTop + el.clientHeight + 1 > el.scrollHeight) {
        fetchMoreData(table.attributes.url.value);
      }
    });
  }, []);

  function fetchMoreData(url) {
    //Fetches routine with stored query and append fetched data to already stored
    props.fetchMore(url);

    // if (hasMoreData) {
    //fetch data from server
    //if data is empty --> no more data on server --> set hasMoreData to false
    // if (null) setMoreData(false);
    //so it doesn't send unnecessary fetch requests
    // }
  }

  //Logic to expand selected row (Can be used for test)
  function handleExpanedRow(id) {
    if (props.selectedRow === id) return null;
    return id;
  }

  //update selected row to be expanded
  function handleRowClick(id) {
    //setExpandedRow(handleExpanedRow(id));
    props.updateSelectedRow(handleExpanedRow(id));
  }

  function saveReview(id, starValue) {
    //logic for comunicating with API
    let body = { id, stars: starValue };
    fetch("http://localhost:5000/companies/giverating", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  }

  let rows =
    props.listRawData.length === 0 ? (
      <h2>Søkeresultater listes her hvis de finnes</h2>
    ) : (
      props.listRawData.map(row => (
        <ListRow
          key={row._id}
          id={row._id}
          rowData={row}
          handleClick={handleRowClick.bind(this)}
          isExpanded={props.selectedRow === row._id}
          saveReview={saveReview}
        ></ListRow>
      ))
    );
  return (
    <ul id="Table" url={props.query + props.page}>
      {rows}
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    query: state.query,
    page: state.page
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMore: fetchMore
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
