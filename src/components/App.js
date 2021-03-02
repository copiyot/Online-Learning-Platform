import React from "react";
import { Route, Router, Switch } from "react-router-dom";

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

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/teacher/signup" exact component={TeacherSignUp} />
        <Route path="/parent/signup" exact component={ParentSignUp} />
        <Route path="/login" exact component={Login} />
        <Route path="/teacher/invites" exact component={TeacherInvites} />
        <Route path="/child/signup" exact component={ChildSignUp} />
        <Route path="/child/land" exact component={ChildLandingPage} />
        <Route path="/teacher/home" exact component={TeacherLandingPage} />
        <Route path="/parent/home" exact component={ParentLandingPage} />
        <Route path="/child/home" exact component={ChildHomePage} />
        <Route path="/confirm/:id" exact component={ConfirmEmail} />
      </Switch>
    </Router>
  );
};

export default App;
