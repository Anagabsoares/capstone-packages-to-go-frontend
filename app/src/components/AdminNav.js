import React, { useState, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import SideBar from "./SideBar";

const AdminNav = () => {
  const { user, isAuthenticated } = useAuth0();
  const [role, setRole] = useState("");

  useEffect(() => {
    const check_role = async () => {
      if (isAuthenticated) {
        try {
          let value = await user["https://netlify-integration.com/roles"];
          setRole(value);
        } catch (e) {
          console.error(e);
        }
      }
    };
    check_role();
  }, [user, isAuthenticated]);

  if (isAuthenticated && role[0] === "admin") {
    return (
      <>
        <SideBar />
        <Navbar.Brand href="/">Packages To Go </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/packages">Packages</Nav.Link>
        </Nav>
      </>
    );
  } else if (isAuthenticated && role[0] === "resident") {
    return (
      <>
        <SideBar />
        <Navbar.Brand href="/">Packages To Go </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/profile">User</Nav.Link>
          <Nav.Link href="/about">About USER </Nav.Link>
          <Nav.Link href="/packages">Packages USER </Nav.Link>
        </Nav>
      </>
    );
  } else {
    return (
      <>
        <Navbar.Brand href="/">Packages To Go </Navbar.Brand>
      </>
    );
  }
};

export default AdminNav;
