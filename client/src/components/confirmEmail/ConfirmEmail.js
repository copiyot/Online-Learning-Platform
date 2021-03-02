import React from "react";
import Axios from "axios";

import "./ConfirmEmail.css";
import { BASE_URL } from "../api";

class ConfirmEmail extends React.Component {
  state = { verifyMess: "" };

  componentDidMount() {
    // console.log(this.props.match.params.id);
    this.verifyEmail();
  }

  verifyEmail = async () => {
    try {
      const response = await Axios.get(
        BASE_URL + `user/unsecured/verifyMail/${this.props.match.params.id}`
      );

      this.setState({ verifyMess: response.data.message });
      console.log(response);
    } catch (e) {
      console.log("Failed to create assignment" + e);
    }
  };

  loginOnClickHandler = () => {
    this.props.history.push("/login");
  };

  render() {
    const { verifyMess } = this.state;

    return (
      <div className="home-page">
        <div className="dark-overlay">
          <div className="container">
            <div className="home-page__content">
              <div className="company-moto">{verifyMess}</div>
              <div className="company-vision">
                Please Click on the below button to login into your account
              </div>
              <div
                className="btn btn-primary tutorial-button"
                onClick={this.loginOnClickHandler}
              >
                Login
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmEmail;
