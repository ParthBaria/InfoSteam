import React from 'react'
import "./Footer.css"
function Footer() {
    return (
        <footer className="footer_main">
            <div className="dev_con">
                <h2>Devlopers</h2>
                <div className="dev_main">
                    <ul className="ul_footer">
                        <li className="li_footer">
                            Design & Layout: Piyush Rathva (HTML & CSS)
                        </li>
                        <li className="li_footer">
                            Development & Functionality: Parth Bariya (JavaScript & React.js)
                        </li>
                    </ul>

                </div>
            </div>

            <div className="copyright_container">
                <p className="copyright_text">
                    Copyright © 2010 by infoSteam
                </p>
            </div>
        </footer>
    )
}

export default Footer