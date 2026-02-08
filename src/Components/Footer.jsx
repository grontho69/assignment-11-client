import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>BloodConnect</h3>
          <p>
            Connecting blood donors with those in need. Save lives by donating
            blood and supporting our mission to ensure no one suffers due to
            blood shortage.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/donation-requests">Donation Requests</Link>
          <Link to="/search">Search Donors</Link>
          <Link to="/funding">Funding</Link>
        </div>

        <div className="footer-section">
          <h3>Get Started</h3>
          <Link to="/register">Register as Donor</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@bloodconnect.bd</p>
          <p>Phone: +880 1700-000000</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © 2026 BloodConnect. All rights reserved. Built for educational
          purposes.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
