import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Router>
    <Auth0Provider
      domain="capstone-package-to-go.us.auth0.com"
      clientId="olHrVA9ljTarhF43w5PLtxHIq4NHnFSe"
      redirectUri={window.location.origin}
      audience="https://packages-to-go.com"
    >
      <App />
    </Auth0Provider>
  </Router>,
  document.getElementById("root")
);
