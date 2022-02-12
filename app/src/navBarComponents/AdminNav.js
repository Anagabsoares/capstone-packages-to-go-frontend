import React, { useState, useEffect } from "react";
import { Nav, Navbar, Badge } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import * as MdIcons from "react-icons/md";
import SideBarData from "./SideBarData";
import SideBarUserData from "./SideBarUserData";
import styled from "styled-components";
import SideBar from "./SideBar";

const Counter = styled.span`
  color: #b5179e;
  display: flex;
  cursor: pointer;
  position: absolute;
  top: 15px;
  margin-left: 10px;
  font-size: 13px;
`;
const BadgeCounter = styled(Badge)`
  background-color: #b5179e;
`;
const BellIcon = styled(FaIcons.FaBell)`
  position: relative;
  size: 30px;
`;

const NavBrand = styled(Navbar.Brand)`
  margin-left: 0%:
  position: absolute;
  z-index: 1;
`;

const AdminNav = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [role, setRole] = useState("");

  const [userLogged, setUserLogged] = useState("");
  const [counter, setCounter] = useState("");

  useEffect(() => {
    const check_role = async () => {
      if (isAuthenticated) {
        try {
          let value = await user["https://netlify-integration.com/roles"];
          setRole(value);
          setUserLogged(user.email);
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
        <SideBar SideBarData={SideBarData} />
        <NavBrand href="/">Packages To Go </NavBrand>

        <Nav className="me-auto">
          <Nav.Link href="/profile">
            <CgIcons.CgProfile size={25} />
          </Nav.Link>

          <Nav.Link href="/packages">
            <MdIcons.MdOutlineEmail size={25} />
            <Counter className="counter">
              <Badge pill bg="danger">
                2
              </Badge>
            </Counter>
          </Nav.Link>

          <Nav.Link href="/packages">
            <BellIcon size={25} />
            <Counter className="counter">
              <Badge pill bg="danger">
                2
              </Badge>
            </Counter>
          </Nav.Link>
        </Nav>
      </>
    );
  } else if (isAuthenticated && role[0] === "resident") {
    return (
      <>
        <SideBar SideBarData={SideBarUserData} />
        <Navbar.Brand href="/view-packages">Packages To Go </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/profile">
            <CgIcons.CgProfile size={25} />
          </Nav.Link>

          <Nav.Link href="/packages">
            <BellIcon size={25} />
            <Counter className="counter">
              <BadgeCounter pill bg="danger">
                2
              </BadgeCounter>
            </Counter>
          </Nav.Link>
        </Nav>
      </>
    );
  } else {
    return (
      <>
        <Navbar.Brand href="#">Packages To Go </Navbar.Brand>
      </>
    );
  }
};

export default AdminNav;
