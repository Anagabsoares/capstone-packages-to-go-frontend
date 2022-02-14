import React from "react";
import { Navbar, Container } from "react-bootstrap";
import LoginButton from "./LoginButton";
import AdminNav from "./AdminNav";
import { useAuth0 } from "@auth0/auth0-react";
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
  const { isAuthenticated } = useAuth0();
  return (
    <NavBarDark variant="light">
      <NavBox>
        <AdminNav />
      </NavBox>
      {!isAuthenticated ? <LoginButton /> : <></>}
    </NavBarDark>
  );
};

export default NavBar;
