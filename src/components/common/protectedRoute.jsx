import React from "react";
import auth from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const user = auth.getCurrentUser();
  return (
    <Route
      {...rest}
      render={props => {
        if (!user || !user.isAdmin)
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    ></Route>
  );
};

export default ProtectedRoute;
