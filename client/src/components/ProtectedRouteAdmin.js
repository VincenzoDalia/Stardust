import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookie from "universal-cookie";

function ProtectedRouteAdmin({ component: Component, ...restOfProps }) {

  const cookies = new Cookie();
  const isAuthenticated = cookies.get("cookieRole");
  console.log("Il ruolo dell'utente è: ", isAuthenticated);

    

  return (
    
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated==="admin" ? <Component {...props} /> : <Redirect to="/Home" />
      }
    />
  );
}

export default ProtectedRouteAdmin;