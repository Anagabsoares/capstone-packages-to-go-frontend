import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [currentUser, setCurrentUser] = useState(null);
  const [counter, setCounter] = useState([]);
  const serverUrl = process.env.REACT_APP_SERVER_URL;

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

  useEffect(() => {
    if (user) {
      const getUser = async () => {
        try {
          const token = await getAccessTokenSilently();
          const response = await axios.get(`${serverUrl}/users`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const users = response.data;
          console.log();
          const res = users.filter((us) => us.email === user.email);
          setCurrentUser(res[0]);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, [user, getAccessTokenSilently]);

  useEffect(() => {
    if (currentUser) {
      const getNotifications = async (user_id) => {
        try {
          const token = await getAccessTokenSilently();
          const response = await axios.get(
            `${serverUrl}/users/${user_id}/notifications-not-read`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCounter(response.data.length);
        } catch (error) {
          console.log(error);
        }
      };
      getNotifications(currentUser.user_id);
    }
  }, [currentUser, getAccessTokenSilently]);

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
                {counter}
              </Badge>
            </Counter>
          </Nav.Link>

          <Nav.Link href="/packages">
            <BellIcon size={25} />
            <Counter className="counter">
              <Badge pill bg="danger">
                {counter}
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
          <Nav.Link href="/notifications">
            <BellIcon size={25} />
            <Counter className="counter">
              {counter !== 0 ? (
                <BadgeCounter pill bg="danger">
                  {counter}
                </BadgeCounter>
              ) : (
                <></>
              )}
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
