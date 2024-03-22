import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookie from "universal-cookie";

function ProtectedRoutePrenotazione({ component: Component, ...restOfProps }) {

  const cookies = new Cookie();
  const inPrenotazione = cookies.get("cookiePrenotazione");
  console.log("Il ruolo dell'utente è: ", inPrenotazione);

    

  return (
    
    <Route
      {...restOfProps}
      render={(props) =>
        inPrenotazione ? <Component {...props} /> : <Redirect to="/Prenota" />
      }
    />
  );
}

export default ProtectedRoutePrenotazione;