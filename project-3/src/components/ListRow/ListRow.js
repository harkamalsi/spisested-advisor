import React, { useState } from "react";
import "./ListRow.css";
import Smiley from "../Smiley/Smiley.js";
import StarRatingComponent from "react-star-rating-component";

const ListRow = props => {
  //State Hook for setting rating for this row
  const [rating, setRating] = useState(0);

  //Fetches extra information for an expanded row
  function fetchExtraInformation(id) {
    return {
      addr2: "Bakkeveien 23",
      postcode: "7012",
      totalRating: "4.33"
    };
  }
  //format fetched extra information (object) in JSX format
  function formatExtraInformation(object, smileysComponents) {
    return (
      <div className="ExtraInformation">
        <div id="Address2Cell" className="Cell">
          {object.addr2}
        </div>
        <div id="GiveReviewCell" className="Cell">
          Gi en vurdering
        </div>
        <div id="PostcodeCell" className="Cell">
          {object.postcode}
        </div>
        <div id="StarCell" className="Cell">
          <StarRatingComponent
            name={row.name}
            //number of total stars
            starCount={5}
            //number of star to display
            value={rating}
            onStarClick={onStarClick.bind(this)}
          />
        </div>
        <div id="TextCell" className="Cell">
          Forrige inspeksjoner
        </div>
        <div id="OldSmileys" className="Cell">
          {smileysComponents.slice(0, -1)}
        </div>
      </div>
    );
  }
  //Update database with rating given by the user
  function updateRating(newValue) {}

  //handles a start click
  function onStarClick(nextValue, prevValue, name, e) {
    //stop propagating to the parent onClick function (not working, must check why)
    e.stopPropagation();
    setRating(nextValue);
    updateRating(nextValue);
  }
  function formatSmileys(s) {
    //Split string, map into an array of dates and value and map into a sorted array of smiley components
    let smileys = s
      .split(".")
      .map(review => {
        let tmp = review.split("-");
        return { year: tmp[0].substring(4), smiley: parseInt(tmp[1]) };
      })
      .sort((a, b) => (a.year >= b.year ? 1 : -1));
    console.log(smileys);
    let smileysComponents = smileys.map(review => (
      <Smiley value={review.smiley} year={review.year}></Smiley>
    ));

    return smileysComponents;
  }
  let row = props.rowData;
  let smileysComponents = formatSmileys(row.smileys);
  let rowClassType = null;
  let extraInformation = null;

  //If prop is true, set rowClassType to expanded Row and then render an expanded row.
  if (props.isExpanded) {
    rowClassType = "Row Expanded";
    extraInformation = formatExtraInformation(
      fetchExtraInformation(row.id),
      smileysComponents
    );
  } else rowClassType = "Row";
  return (
    <li
      className={rowClassType}
      onClick={e => props.handleClick(props.id, e)}
      id={props.id}
    >
      <div id="NameCell" className="Cell">
        {row.name}
      </div>
      <div id="AdressCell" className="Cell">
        {row.city}
      </div>
      <div id="SmileyCell" className="Cell">
        {smileysComponents[smileysComponents.length - 1]}
      </div>
      <div id="ReviewCell" className="Cell">
        {row.rating}/5
      </div>

      {extraInformation}
    </li>
  );
};
export default ListRow;
