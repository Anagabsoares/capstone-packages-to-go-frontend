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

const NavBar = ({ socket, currentUser }) => {
  console.log(currentUser);
  return (
    <NavBarDark variant="light" socket={socket} currentUser={currentUser}>
      <NavBox socket={socket} currentUser={currentUser}>
        <AdminNav socket={socket} currentUser={currentUser} />
      </NavBox>
      <AuthenticationButton socket={socket} currentUser={currentUser} />
    </NavBarDark>
  );
};

export default NavBar;
