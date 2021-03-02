import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-sm fixed-top" id="main-nav">
      <div className="container">
        <Link to="/" className="navbar-brand site-brand">
          OneSchool
        </Link>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link sign-in__label">
              Contact Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link sign-up__label">
              Log In
            </Link>
          </li>
          <li className="nav-item btn contact-us__btn">
            <Link to="/signup" className="nav-link">
              SIGN UP
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
