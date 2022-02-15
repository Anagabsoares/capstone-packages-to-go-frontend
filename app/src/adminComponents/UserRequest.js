import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Alert } from "react-bootstrap";
import styled from "styled-components";

const Cont = styled(Container)`
  margin-left: 30%;
`;

const RequestAlert = styled(Alert)`
  margin-top: 5%;
  width: 60%;
`;

const UserRequest = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [residents, setResidents] = useState([]);
  const [frequency, setFrequency] = useState({});
  const [packages, setPackages] = useState([]);

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const getAllPackages = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(`${serverUrl}/packages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        let res = [];
        response.data.forEach((item) => {
          if (item.delivery_date === "pending" && item.status) {
            res.push(item.user_id);
          }
        });

        setPackages(res);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPackages();
  }, [getAccessTokenSilently, serverUrl]);

  const userFrequency = (arr) => {
    const map = {};
    arr.forEach((item) => {
      if (map[item]) {
        map[item]++;
      } else {
        map[item] = 1;
      }
    });
    setFrequency(map);
  };

  useEffect(() => {
    const getSpecResident = async (id) => {
      try {
        const token = await getAccessTokenSilently();
        const res = await axios.get(`${serverUrl}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResidents([res.data]);
      } catch (error) {
        console.log(error);
      }
    };
    let residentList = new Set(packages);
    let users = Array.from(residentList);
    users.forEach((id) => {
      getSpecResident(id);
    });
    userFrequency(packages);
  }, [packages, getAccessTokenSilently, serverUrl]);

  return (
    <Cont>
      <h1>Daily Requests</h1>
      {residents ? (
        residents.map((item, index) => {
          return (
            <RequestAlert key={index} variant={"info"}>
              <Alert.Heading>
                {item.name} has requested package delivery
              </Alert.Heading>
              <hr />
              <li>TOTAL OF: {frequency[item.user_id]} packages </li>
              <li>UNIT: {item.unit}</li>
              <li>EMAIL: {item.email}</li>
              <li>PHONE NUMBER: {item.phone_number}</li>
            </RequestAlert>
          );
        })
      ) : (
        <></>
      )}
    </Cont>
  );
};

export default UserRequest;
