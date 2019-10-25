import React from "react";
import smiley_happy from "./smiley-happy.svg";
import smiley_neutral from "./smiley-neutral.svg";
import smiley_sad from "./smiley-sad.svg";

import "./Smiley.css";

const Smiley = props => {
  let value = props.value;
  let pic = null;
  if (value === 0 || value === 1)
    pic = <img className="Smiley" src={smiley_happy} alt="Happy Face" />;
  else if (value === 2)
    pic = <img className="Smiley" src={smiley_neutral} alt="Neutral Face" />;
  else if (value === 3)
    pic = <img className="Smiley" src={smiley_sad} alt="Sad Face" />;
  else pic = <div>Ikke</div>;
  return (
    <div className="CompleteSmiley">
      {pic}
      <p id="Text">{props.year}</p>
    </div>
  );
};
export default Smiley;
