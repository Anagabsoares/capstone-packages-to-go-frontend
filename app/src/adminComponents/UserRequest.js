import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Alert, Button } from "react-bootstrap";
import styled from "styled-components";
import { AiFillCodeSandboxCircle } from "react-icons/ai";

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
  // const serverUrl = "https://packages-delivery-ai.herokuapp.com";
  const serverUrl = "https://capstone-backend-api.herokuapp.com";

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
        const pack = response.data.forEach((item) => {
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
  }, []);

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

  useEffect(() => {
    let residentList = new Set(packages);
    let users = Array.from(residentList);
    users.forEach((id) => {
      getSpecResident(id);
    });
    userFrequency(packages);
  }, [packages]);

  const COLORS = ["primary", "success", "danger", "alert", "info"];

  return (
    <Cont>
      <h1>Daily Requests</h1>
      {residents ? (
        residents.map((item, index) => {
          return (
            <RequestAlert key={index} variant={COLORS[index % COLORS.length]}>
              <Alert.Heading>
                {item.name} has requested package delivery
              </Alert.Heading>
              <hr />
              <p>TOTAL OF: {frequency[item.user_id]} packages </p>
              <p>UNIT: {item.unit}</p>
              <p>EMAIL: {item.email}</p>
              <p>PHONE NUMBER: {item.phone_number}</p>
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
