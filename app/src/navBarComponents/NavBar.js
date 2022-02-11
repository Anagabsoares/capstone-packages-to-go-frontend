import React from "react";
import { Navbar, Container } from "react-bootstrap";
import AuthenticationButton from "./AuthenticationButton";
import AdminNav from "./AdminNav";
import styled from "styled-components";

const NavBox = styled(Container)`
  margin-left: 15%;
  height: 3rem;
  @media (max-width: 790px) {
    margin-left: 40%;
    background-color: #blue;
  }
`;

const NavBarDark = styled(Navbar)``;

const NavBar = () => {
  return (
    <NavBarDark variant="light">
      <NavBox>
        <AdminNav />
      </NavBox>
      <AuthenticationButton />
    </NavBarDark>
  );
};

export default NavBar;
