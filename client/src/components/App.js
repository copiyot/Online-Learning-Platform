import React from "react";
import { Route, Router, Switch, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import Home from "./home/Home";
import SignUp from "./singUp/SignUp";
import TeacherSignUp from "./teacherSignUp/TeacherSignUp";
import ParentSignUp from "./parentSignUp/ParentSignUp";
import Login from "./login/Login";
import TeacherInvites from "./teacherInvites/TeacherInvites";
import ChildSignUp from "./childSignUp/ChildSignUp";
import ChildLandingPage from "./childLandingPage/ChildLandingPage";
import TeacherLandingPage from "./teacherLandingPage/TeacherLandingPage";
import ParentLandingPage from "./parentLandingPage/ParentLandingPage";
import ChildHomePage from "./childHomePage/ChildHomePage";
import history from "../history";
import ConfirmEmail from "./confirmEmail/ConfirmEmail";
import ProtectedRoute from "../ProtectedRoute";

const App = (props) => {
  return (
    <BrowserRouter history={history}>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={SignUp} />
        <Route
          // isSignedIn={props.isSignedIn}
          path="/teacher/signup"
          exact
          component={TeacherSignUp}
        />
        <Route
          // isSignedIn={props.isSignedIn}
          path="/parent/signup"
          exact
          component={ParentSignUp}
        />
        <Route path="/login" exact component={Login} />
        <ProtectedRoute
          isSignedIn={props.isSignedIn}
          path="/teacher/invites"
          exact
          component={TeacherInvites}
        />
        <ProtectedRoute
          isSignedIn={props.isSignedIn}
          path="/child/signup"
          exact
          component={ChildSignUp}
        />
        <ProtectedRoute
          isSignedIn={props.isSignedIn}
          path="/child/land"
          exact
          component={ChildLandingPage}
        />
        <ProtectedRoute
          isSignedIn={props.isSignedIn}
          path="/teacher/home"
          exact
          component={TeacherLandingPage}
        />
        <ProtectedRoute
          isSignedIn={props.isSignedIn}
          path="/parent/home"
          exact
          component={ParentLandingPage}
        />
        <ProtectedRoute
          isSignedIn={props.isSignedIn}
          path="/child/home"
          exact
          component={ChildHomePage}
        />
        <Route
          // isSignedIn={props.isSignedIn}
          path="/confirm/:id"
          exact
          component={ConfirmEmail}
        />
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.isSignedIn.data,
  };
};

export default connect(mapStateToProps)(App);
