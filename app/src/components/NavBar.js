import React from "react";
import { Navbar, Container } from "react-bootstrap";
import AuthenticationButton from "./AuthenticationButton";
import AdminNav from "./AdminNav";
import styled from "styled-components";

const NavBox = styled(Container)`
  height: 3rem;
`;

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light">
      <NavBox>
        <AdminNav />
        <AuthenticationButton />
      </NavBox>
    </Navbar>
  );
};

export default NavBar;
