import React from "react";
import "./Loading.css";

const loadingImg =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const Loading = () => (
  <div className="spinner">
    <img src={loadingImg} alt="Loading..." className="loading" />
    <div />
  </div>
);

export default Loading;
