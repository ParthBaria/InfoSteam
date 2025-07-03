import React from 'react'
import "./Description.css"
function Description() {
    return (
        <header className="header_container">
            <h1 className="header_title">Bloge by <span id='title' data-text="InfoStream">InfoStream</span></h1>


            <p className="header_desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus itaque at optio.
                Reiciendis, aspernatur. Optio odit maiores at aliquam in neque nam assumenda, molestias sint saepe?
                Quasi natus inventore explicabo.
            </p>
        </header>
    )
}

export default Description