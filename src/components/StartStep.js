import React from "react";
import "../App.css";

const StartStep = ({ onStart }) => {
  return (
    <div className="step-container">
      <h2 className="step-title">Mortgage calculator</h2>
      <p>
        Use our mortgage calculator to find out how much you could borrow, how
        much it could cost you per month and what your loan to value ratio would
        be.
      </p>
      <div className="button-container">
        <button className="btn-continue" onClick={onStart}>
          Start
        </button>
      </div>
    </div>
  );
};

export default StartStep;
