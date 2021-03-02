import React from "react";

import "./ParentAddChildMessage.css";

class ParentAddChildMessage extends React.Component {
  render() {
    return (
      <div className="parent-add__container">
        <div className="parent-add__child">
          Welcome to online school!Click on family portal to add a childs
          account.
        </div>
      </div>
    );
  }
}

export default ParentAddChildMessage;
