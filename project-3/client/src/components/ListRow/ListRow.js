import React, { useState } from "react";
import "./ListRow.css";
import Smiley from "../Smiley/Smiley.js";
import StarRatingComponent from "react-star-rating-component";
import Star from "./star.svg";

const ListRow = props => {
  //State Hook for setting rating for this row
  //used to highlight hover stars, but on click ratinGiven becomes true and saves the
  //last rating to the databases
  const [rating, setRating] = useState(0);
  const [ratingGiven, setGivenRating] = useState(false);
  let row = props.rowData;
  let id = row._id;
  let smileysComponents = formatSmileys(row.smileys);

  //format extra information in JSX format
  function formatExtraInformation() {
    let text = !ratingGiven ? "Gi en vurdering :" : "Din vurdering:";
    let smileyText =
      row.smileys.length > 1
        ? "Resultat fra tidligere inspeksjoner:"
        : "Ingen tidligere inspeksjoner.";
    return (
      <div className="ExtraInformation">
        <div id="Address2Cell" className="Cell">
          {row.address}
        </div>
        <div id="GiveReviewCell" className="Cell">
          {text}
        </div>
        <div id="PostcodeCell" className="Cell">
          {row.postcode}
        </div>
        <div id="StarCell" className="Cell">
          <StarRatingComponent
            name={row.name}
            //number of total stars
            starCount={5}
            //number of star to display
            value={rating}
            onStarClick={onStarClick.bind(this)}
            onStarHover={onStarHover.bind(this)}
            onStarHoverOut={onStarHoverOut.bind(this)}
            editing={!ratingGiven}
          />
        </div>
        <div id="TextCell" className="Cell">
          <p className="Text">{smileyText} </p>
        </div>
        <div id="OldSmileys" className="Cell">
          {smileysComponents.slice(1, 7)}
        </div>
      </div>
    );
  }
  //Sincronise frontend with backend with rating given by the user

  //handles a start click
  function onStarClick(nextValue, prevValue, name, e) {
    //stop propagating to the parent onClick function (not working, must check why)
    e.preventDefault();
    setGivenRating(true);
    props.saveReview(id, nextValue);
  }
  function onStarHover(nextValue) {
    setRating(nextValue);
  }
  function onStarHoverOut() {
    setRating(0);
  }
  function formatSmileys(smileys) {
    //Split string by ".", map the result array into an array of Objects with smileys with relative years.
    // It then sortes the array by the year and finally maps the array into an array of Smiley component

    return smileys.map(smiley => (
      <Smiley
        key={smiley.date + "-" + smiley.grade}
        value={smiley.grade}
        year={smiley.date.substring(4)}
      ></Smiley>
    ));
  }

  let rowClassType = null;
  let extraInformation = null;
  let stars =
    row.numberOfRatings === 0
      ? "No rating yet"
      : (row.sumStars / row.numberOfRatings).toFixed(2).toString() + "/5";

  //If prop is true, set rowClassType to expanded Row and then render an expanded row.
  if (props.isExpanded) {
    rowClassType = "Row Expanded";
    extraInformation = formatExtraInformation();
  } else rowClassType = "Row";
  let pic = <img className="Star" src={Star} alt="Star" />;
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
        {smileysComponents[0]}
      </div>
      <div id="ReviewCell" className="Cell">
        <p className="Text"> {stars} </p>
        {pic}
      </div>
      {extraInformation}
    </li>
  );
};
export default ListRow;
