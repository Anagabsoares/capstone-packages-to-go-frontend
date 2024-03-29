import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import styled from "styled-components";
import Users from "./Users";

const Header = styled.h1`
  margin-top: 10%;
  margin-bottom: 3%;
  margin-left: 12%;
`;

const Btn = styled(Button)`
  margin-right: 12%;
  margin-left: auto;
  margin-bottom: 3%;
  display: block;
  background-color: #3a0ca3;
  color: white;
  border-color: #3a0ca3;
`;
const Info = styled.p`
  margin-left: 145px;
`;

const UserList = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [residents, setResidents] = useState([]);
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(`${serverUrl}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResidents(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [getAccessTokenSilently]);

  const deleteUser = async (id) => {
    try {
      console.log("clicked");
      const token = await getAccessTokenSilently();
      const response = await axios.delete(`${serverUrl}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("user deleted");
      const newResidents = residents.filter((resid) => resid.user_id !== id);
      setResidents(newResidents);
    } catch (error) {
      console.log(error);
      alert("sorry!! this user could not be deleted");
    }
  };

  const updateUser = async (id, resident) => {
    try {
      console.log("clicked");
      const token = await getAccessTokenSilently();
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        `${serverUrl}/users/${id}`,
        {
          name: resident.name,
          email: resident.email,
          unit: resident.unit,
          phone_number: resident.phone_number,
        },
        headers
      );
      alert("user updated");
    } catch (error) {
      console.log(error);
      alert("sorry!! this user could not be updated");
    }
  };

  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/users/add-users";
    navigate(path);
  };

  return (
    <Container>
      <Header>Users</Header>
      <Btn variant="primary" onClick={routeChange}>
        Create User
      </Btn>
      <OverlayTrigger
        overlay={
          <Tooltip id="tooltip-disabled">
            double click to edit user info
          </Tooltip>
        }
      >
        <span className="d-inline-block">
          <Info style={{ pointerEvents: "none" }}>
            <AiIcons.AiOutlineInfoCircle size={30} />
          </Info>
        </span>
      </OverlayTrigger>
      <Users
        residents={residents}
        deleteUser={deleteUser}
        updateUser={updateUser}
      />
    </Container>
  );
};
export default UserList;
