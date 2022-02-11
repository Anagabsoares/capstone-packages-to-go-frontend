import React from "react";
import { Container } from "react-bootstrap";
import img from "../images/cap-logo.png";
import styled from "styled-components";

const ImageContainer = styled(Container)`
  margin-top: 10%;
  margin-left: 25%;
`;
const Img = styled.img`
  align-content: center;
`;
const Initial = () => {
  return (
    <ImageContainer>
      <Img src={img} alt="cap-logo" height="800" width="800" />
    </ImageContainer>
  );
};

export default Initial;
