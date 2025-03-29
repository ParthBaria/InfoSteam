import React from 'react'
import "./Dropdown.css"
import useHttp from '../hook/http';

const option = ["top-headlines", "business", "bitcoin", "health"]
function Dropdown(props) {

    function handleChange(event) {
        props.onOption(event.target.value);
    }

    return (
        <div className="cat">
            <select className="dropdown_menu" name="select" onChange={handleChange} >
                {/* <option value=""></option> */}
                {option.map((option) => {
                    return (<option key={option} value={option}>{option}</option>)
                })}

            </select>
        </div>
    )
}

export default Dropdown