import React from "react";

import "./Home.css";
import Header from "../header/Header"

const Home = () => {
  return (
    <div className="home-page">
      <div className="dark-overlay">
        <Header/>
        <div className="container">
          <div className="home-page__content">
            <div className="company-moto">Learning Made Easy</div>
            <div className="company-vision">
              OneSchool allows educators and students to continually stay
              engaged
            </div>
            <div className="btn btn-primary tutorial-button">Tutorials</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
