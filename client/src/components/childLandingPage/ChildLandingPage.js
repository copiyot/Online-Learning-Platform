import React from "react";

import "./ChildLandingPage.css";
import Header from "../header/Header";

const ChildLandingPage = () => {
  return (
    <div className="child-landing__page">
      <div className="dark-overlay">
        <Header />
        <div className="container child-landing">
          <div className="row">
            <div className="welcome-contents col-6">
              <div className="hooray-label">HOORAY!</div>
              <div className="child-welcome__message">
                  Welcome to OneSchool
              </div>
              <div className="great-message">
                  It's great to have you
              </div>
              <div className="start-message">
                  <span className="student-name">Allan</span> can now start enjoyiong the online learning 
              </div>
              <button
                  type="submit"
                  className="create-account__btn child-btn btn btn-primary"
                >
                  Log in to access the classroom 
                </button>
            </div>
            <div className="celebretory-image col-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildLandingPage;
