import React from 'react';
import smiley_happy from './smiley-happy.svg';
import smiley_neutral from './smiley-neutral.svg';
import smiley_sad from './smiley-sad.svg';

import './Smiley.css';

const Smiley = (props) => {
    let value = props.value;
    console.log(value);
    if (value ===0 || value===1)
        return(
            <img className="Smiley" src={smiley_happy} alt="Happy Face"/>
        );
    else if (value ===2)
        return(
            <img className="Smiley" src={smiley_neutral} alt="Neutral Face"/>
        );
    else if (value ===3)
        return(
            <img className="Smiley" src={smiley_sad} alt="Sad Face"/>
        );
    else
    return(
        <div>Ikke</div>
    );
}
export default Smiley;