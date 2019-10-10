import React from 'react';
import './ListRow.css';
import Smiley from '../Smiley/Smiley.js';
import StarRatingComponent from 'react-star-rating-component';

function onStarClick(nextValue, prevValue, name) {
    //update state with rest api
    this.setState({rating: nextValue});
  }
function  handleClick(id) {
    console.log("hello, im row number " + id );
}
const ListRow = (props) =>{
    let row = props.rowData;
    return(
        <li className = "Row" onClick={handleClick.bind(this)}>
            <div className = "Cell">
                {row.name}
            </div>
            <div className = "Cell">
                {row.city}
            </div>
            <div id="SmileyCell" className = "Cell">
                <Smiley value={row.smiley}></Smiley>
            </div>
            <div id="StarCell" className = "Cell">
            <StarRatingComponent 
                name="rate"  
                starCount={5}
                value={row.rating}
                onStarClick={onStarClick.bind(this)}
            />
            </div>
        </li>
    );
}
export default ListRow