import React from "react";
import { Navbar, Container } from "react-bootstrap";
import AuthenticationButton from "./AuthenticationButton";
import AdminNav from "./AdminNav";

const NavBar = () => {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <AdminNav />
        <AuthenticationButton />
      </Container>
    </Navbar>
  );
};

export default NavBar;
