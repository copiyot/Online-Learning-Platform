import React, { useState } from "react";
import Axios from "axios";
import qs from "qs";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Login.css";
import Header from "../header/Header";
import { BASE_URL, clientSecret, clientId } from "../api";
import { setIsSignedIn } from "../../actions";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const revokeToken = async () => {
    let token = localStorage.getItem("token");

    let data = {
      tokenId: token,
    };

    await Axios.post(BASE_URL + "token/revoke", data);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setDisabled(true);

    let json = {
      username: email,
      password: password,
      grant_type: "password",
      client_id: clientId,
    };
    await Axios({
      url: BASE_URL + "oauth/token",
      method: "post",
      scope: "write",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: clientId,
        password: clientSecret,
      },
      data: qs.stringify(json),
    })
      .then((response) => {
        console.log(JSON.stringify(response.data));
        var currentTime = new Date().getTime() / 1000;
        var expiryTime = currentTime + response.data.expires_in;
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("expiresIn", expiryTime);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("schoolCode", response.data.school_code);
        localStorage.setItem("firstName", response.data.firstName);
        localStorage.setItem("lastName", response.data.lastName);
        localStorage.setItem("parentId", response.data.parentId);
        localStorage.setItem("studentId", response.data.studentId);
        localStorage.setItem("teacherId", response.data.teacherId);
        localStorage.setItem("email_verified", response.data.email_verified);
        props.setIsSignedIn(true);
        if (response.data.email_verified) {
          if (response.data.role[0] === 2) {
            props.history.push("/parent/home");
          } else if (response.data.role[0] === 3) {
            props.history.push("/teacher/home");
          } else if (response.data.role[0] === 1) {
            props.history.push("/child/home");
          }
        } else {
          alert(
            "Please cick on the link that has just been sent to your email account to verify your email and continue the registration process."
          );

          revokeToken();
        }
        /*if (response) {
          setDisabled(false);
        } */
      })
      .then(() => new Promise((resolve) => setTimeout(resolve, 5000)))
      .catch((error) => {
        // console.log("error msg:" + error);
        alert("Either Username or password is not correct!!");
      });
    setDisabled(false);
  };

  return (
    <div className="login">
      <div className="dark-overlay">
        <Header />
        <div className="container login-container">
          <div className="card login-holder">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Email Address</label>
                  <input
                    onChange={onEmailChange}
                    value={email}
                    type="email"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Email Address or Username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    onChange={onPasswordChange}
                    value={password}
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>
                <button
                  onClick={onSubmitHandler}
                  type="submit"
                  className="log-in__button btn btn-primary"
                  disabled={disabled}
                >
                  Log In
                </button>
                <div className="to-login">
                  I'm new here.{" "}
                  <Link to="/signup">
                    <b className="terms-service">Create an Account</b>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { setIsSignedIn })(Login);
