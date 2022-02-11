import React from "react";
import { Link } from "react-router-dom";
// import PageNotFound from "../images/NotFound.png";
import styled from "styled-components";

const P = styled.p`
  align-content: center;
  margin: 15%;
  font-size: 50px;
`;
const NotFoundPage = () => {
  return (
    <div>
      {/* <Image src={"PageNotFound"} alt="Not Found" /> */}
      <P style={{ textAlign: "center" }}>404 - OOPS, PAGE NOT FOUND</P>
    </div>
  );
};

export default NotFoundPage;
