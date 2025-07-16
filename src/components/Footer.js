import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom'; 

function Footer() {
    return (
        <footer className="footer_main">
            <div className="footer_content">
                <div className="footer_section">
                    <h3>infoStream</h3>
                    <p>Your trusted source for latest news and media.</p>
                </div>

                <div className="footer_section">
                    <h4>Quick Links</h4>
                    <ul className="footer_links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        
                    </ul>
                </div>

                <div className="footer_section">
                    <h4>Support</h4>
                    <ul className="footer_links">
                        <li><a href="mailto:support@infostream.com">Email Support</a></li>
                        
                    </ul>
                </div>
            </div>

            <div className="footer_bottom">
                <p>&copy; 2025 infoStream. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
