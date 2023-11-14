import React from "react";

import "./RadioButton.css"

const RadioButton = ({ options, selectedOption, onChange }) => {
    return (
      <div className="radio-button">
        {options.map((option, index) => (
          <label key={index} className={`radio-option ${selectedOption === index ? 'selected' : ''}`}>
            <input
              type="radio"
              name="radioOptions"
              value={index}
              checked={selectedOption === index}
              onChange={() => onChange(index)}
            />
            <div className="radio-icon">{option.icon}</div>
          </label>
        ))}
      </div>
    );
  };
  
  export default RadioButton;