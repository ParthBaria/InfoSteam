import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom'; 

function Footer() {
    return (
        <footer className="footer_main">
            <div className="footer_content">
                <div className="footer_section">
                    <h3>infoStream</h3>
                    <p>Your trusted source for streamlined medical information and health records.</p>
                </div>

                <div className="footer_section">
                    <h4>Quick Links</h4>
                    <ul className="footer_links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of Service</Link></li>
                    </ul>
                </div>

                <div className="footer_section">
                    <h4>Support</h4>
                    <ul className="footer_links">
                        <li><a href="mailto:support@infostream.com">Email Support</a></li>
                        <li><a href="https://www.infostream.com/help" target="_blank" rel="noreferrer">Help Center</a></li>
                        <li><a href="https://www.infostream.com/faq" target="_blank" rel="noreferrer">FAQ</a></li>
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
