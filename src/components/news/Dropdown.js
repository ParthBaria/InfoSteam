import React from 'react';
import "./Dropdown.css";

const option = ["world", "technology", "business", "health","sports"];

function Dropdown(props) {
  function handleChange(event) {
    props.onOption(event.target.value);
  }

  return (
    <div className="cat">
      <select className="dropdown_menu" name="select" onChange={handleChange} defaultValue="">
        <option value="" disabled>Select category</option>
        {option.map((item) => (
          <option key={item} value={item}>
            {item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
