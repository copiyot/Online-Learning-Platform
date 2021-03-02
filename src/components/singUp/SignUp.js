import React from "react";
import { Link } from "react-router-dom";

import "./SignUp.css";
import Header from "../header/Header";

const SignUp = () => {
  return (
    <div className="sign-up__page">
      <div className="dark-overlay">
        <Header />
        <div className="container">
          <div className="row sign-up__content">
            <div className="col-md-6">
              <div className="teacher-label">Teacher</div>
              <div className="teacher-mission">
                Offer personalized and engaging lessons just like in a classroom
                engaged
              </div>
              <Link to="/teacher/signup">
                <div className="btn teacher-button">
                  Sign Up as a Teacher
                  <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </div>
              </Link>
            </div>
            <div className="col-md-6">
              <div className="parent-label">Parent</div>
              <div className="parent-mission">
                Empower your kids with new skills and experiences
              </div>
              <Link to="/parent/signup">
                <div className="btn parent-button">
                  Sign Up as a Parent
                  <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
