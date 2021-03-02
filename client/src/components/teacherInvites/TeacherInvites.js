import React from "react";

import "./TeacherInvites.css";
import Header from "../header/Header";

const TeacherInvites = () => {
  return (
    <div className="teacher-invites">
      <div className="dark-overlay">
        <Header />
        <div className="container teacher-invites__student">
          <div className="welcome-label">Welcome to OneSchool</div>
          <div className="school-desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum sed
            voluptate praesentium similique debitis corporis neque culpa nam
            modi, eligendi reiciendis perspiciatis qui aut voluptatibus quidem
            expedita numquam dolore consequuntur!
          </div>
          <div className="invite-students">
            Would you like to invite students to your online classroom?
          </div>
          <div className="row share-link">
            <div className="col-6">
              <div className="">
                <button type="submit" className="yes-btn btn btn-primary">
                  Yes, I would like to send invites
                  <i className="fa fa-share" aria-hidden="true"></i>
                </button>
              </div>
              <div className="">
                <button
                  type="submit"
                  className="create-account__btn btn btn-primary"
                >
                  <i class="fa fa-link mr-2" aria-hidden="true"></i>
                  Copy Link
                </button>
              </div>
            </div>
            <div className="col-6">
              <button
                type="submit"
                className="create-account__btn btn btn-primary"
              >
                No- proceed to my account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherInvites;
