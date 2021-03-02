import React, { Component } from "react";
import Axios from "axios";

import "./SendInvite.css";
import { BASE_URL } from "../api";
// import { Link } from "react-router-dom";

class SendInvite extends Component {
  state = { email: "" };

  onInviteEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  onSubmitHandler = async () => {
    const { email } = this.state;

    try {
      let data = {
        email,
        username: localStorage.getItem("username"),
      };
      const response = await Axios.post(
        BASE_URL + "teacher/secured/invitation/send",
        data,
        { headers: { Authorization: "Bearer" + localStorage.getItem("token") } }
      );

      console.log(response.data);
      alert(response.data.message);
      // this.props.history.push("/teacher/home");
      // window.location.reload(true);
    } catch (e) {
      console.log("Invite not sent" + e);
    }
  };

  render() {
    const { email } = this.state;

    return (
      <div>
        <div
          className="modal fade"
          id="inviteStudents"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Invite Students
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="sendInvite">
                    <b>Enter Email Address of the Invitee:</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="sendInvite"
                    placeholder="Enter Email Address"
                    aria-describedby="emailHelp"
                    name="email"
                    value={email}
                    onChange={this.onInviteEmailChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.onSubmitHandler}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SendInvite;
