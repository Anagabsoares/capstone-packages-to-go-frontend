import axios from "axios";
import React, { useState, useEffect } from "react";
import CreateResident from "./CreateResident";
import Users from "./Users";
import { Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const UserList = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [residents, setResidents] = useState([]);
  const serverUrl = "https://api-packages-delivery.herokuapp.com";

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
  }, []);

  return (
    <Container>
      <h1>Users</h1>

      <Users residents={residents} />
    </Container>
  );
};
export default UserList;
