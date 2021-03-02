import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isSignedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isSignedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
