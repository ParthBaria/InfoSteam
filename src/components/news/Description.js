import React from 'react'
import "./Description.css"
function Description() {
    return (
        <header className="header_container">
            <h1 className="header_title">News by <span id='title' data-text="InfoStream">InfoStream</span></h1>


            <p className="header_desc">InfoStream is a dynamic news platform that delivers real-time updates from trusted sources in a clean, user-friendly interface. Stay ahead with trending headlines, personalized categories, and an engaging experience that keeps you informed anytime, anywhere.
            </p>
        </header>
    )
}

export default Description