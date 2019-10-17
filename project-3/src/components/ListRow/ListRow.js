import React, { useState } from "react";
import "./ListRow.css";
import Smiley from "../Smiley/Smiley.js";
import StarRatingComponent from "react-star-rating-component";
import Star from "./star.svg";

const ListRow = props => {
  //State Hook for setting rating for this row
  //used to highlight hover stars, but on click ratinGiven becomes true and saves the
  //last rating to the database
  const [rating, setRating] = useState(0);
  const [ratingGiven, setGivenRating] = useState(false);
  let row = props.rowData;
  let id = row.id;
  let smileysComponents = formatSmileys(row.smileys);

  /*
  //Fetches extra information for an expanded row
  function fetchExtraInformation(id) {
    return {
      addr2: "Bakkeveien 23",
      postcode: "7012",
      totalRating: "4.33"
    };
  }*/

  //format extra information in JSX format
  function formatExtraInformation() {
    let text = !ratingGiven ? "Gi en vurdering :" : "Din vurdering:";
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
          <p className="Text">Resultat fra forrige inspeksjoner: </p>
        </div>
        <div id="OldSmileys" className="Cell">
          {smileysComponents.slice(0, -1)}
        </div>
      </div>
    );
  }
  //Sincronyse frontend with backend with rating given by the user

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
  function formatSmileys(smileyString) {
    //Split string by ".", map the result array into an array of Objects with smileys with relative years.
    // It then sortes the array by the year and finally maps the array into an array of Smiley component
    return smileyString
      .split(".")
      .map(review => {
        let tmp = review.split("-");
        return {
          key: tmp[0],
          year: tmp[0].substring(4),
          smiley: parseInt(tmp[1])
        };
      })
      .sort((a, b) => (a.year >= b.year ? 1 : -1))
      .map(review => (
        <Smiley
          key={review.key}
          value={review.smiley}
          year={review.year}
        ></Smiley>
      ));
  }

  let rowClassType = null;
  let extraInformation = null;
  let stars = (row.sumStars / row.numberOfRatings).toFixed(2);

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
        {smileysComponents[smileysComponents.length - 1]}
      </div>
      <div id="ReviewCell" className="Cell">
        <p className="Text"> {stars}/5 </p>
        {pic}
      </div>
      {extraInformation}
    </li>
  );
};
export default ListRow;
