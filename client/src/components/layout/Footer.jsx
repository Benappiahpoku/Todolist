import React from "react";
import "./Footer.css"; // Import the CSS file

function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer-content">
          <h3>Your Company</h3>
          <p>Copyright © 2022 Your Company. All rights reserved.</p>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: info@yourcompany.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <p>Facebook | Twitter | Instagram</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
