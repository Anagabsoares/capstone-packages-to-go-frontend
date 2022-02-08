import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PackageBoard from "./PackagesBoard";

import { Container, Button, Form } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const Search = styled(Container)``;

const MainContainer = styled(Form)`
  margin-top: 0%;
  margin-left: 25%;
  width: 60%;
  margin-bottom: 3%;
`;

const UserPackages = ({
  markAsDelivered,
  setErrorMessage,
  errorMessage,
  packages,
}) => {
  const { getAccessTokenSilently } = useAuth0();
  const [residents, setResidents] = useState([]);
  const [pending, setPending] = useState();
  const [delivered, setDelivered] = useState();
  const [requested, setRequested] = useState();
  const [toggleClick, setToggleClick] = useState();
  const [packs, setPacks] = useState("");
  const serverUrl = "https://packages-delivery-ai.herokuapp.com";

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
    console.log(specResident);
  }, []);

  const getPackagesbyUser = async (user_id) => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);
      const response = await axios.get(
        `${serverUrl}/users/${user_id}/packages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const packs = response.data;
      const pending = packages.filter(
        (pack) => pack.delivery_date === "pending"
      );
      const requested = packages.filter(
        (pack) =>
          pack.delivery_date === "pending" && pack.status === "requested"
      );
      const delivered = packages.filter(
        (pack) => pack.delivery_date !== "pending"
      );
      console.log(delivered);
      setDelivered(delivered);
      setRequested(requested);
      setPending(pending);
      setPacks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [specResident, setSpecResident] = useState();

  const getSpecResident = async (user_id) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(`${serverUrl}/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSpecResident(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onNameChange = (event) => {
    const user = residents.filter((resi) => resi.name === event.target.value);
    const result = user[0];
    console.log(user[0]);
    if (result === undefined) {
      return;
    } else {
      setSpecResident(user);
      getPackagesbyUser(result.user_id);
    }
  };

  const onButtonClick = (event) => {
    console.log(event.target.value);
    setToggleClick(event.target.value);
  };

  return (
    <MainContainer>
      <Search>
        <label htmlFor="exampleDataList" className="form-label">
          Resident's Name
        </label>
        <input
          className="form-control"
          list="unitList"
          placeholder="type resident's name ..."
          onChange={onNameChange}
        />
        <datalist id="unitList">
          {residents.map((resid, index) => {
            return (
              <option key={index + 10} value={resid.name}>
                {(resid.name, resid.unit)}
              </option>
            );
          })}
        </datalist>

        <Button onClick={(e) => onButtonClick(e)} value={"pending"}>
          Pending Packages
        </Button>
        <Button onClick={(e) => onButtonClick(e)} value={"delivered"}>
          Delivered
        </Button>
        <Button onClick={(e) => onButtonClick(e)} value={"requested"}>
          Requested
        </Button>
        <Button onClick={(e) => onButtonClick(e)} value={"all"}>
          All packages
        </Button>
      </Search>

      {toggleClick === "delivered" && delivered && specResident ? (
        <PackageBoard
          pack={delivered}
          markAsDelivered={markAsDelivered}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
          packages={packages}
        ></PackageBoard>
      ) : (
        <></>
      )}
      {toggleClick === "pending" && pending && specResident ? (
        <PackageBoard
          pack={pending}
          markAsDelivered={markAsDelivered}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
          packages={packages}
        ></PackageBoard>
      ) : (
        <></>
      )}
      {toggleClick === "requested" && requested && specResident ? (
        <PackageBoard
          pack={requested}
          markAsDelivered={markAsDelivered}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
          packages={packages}
        >
          No requested packages
        </PackageBoard>
      ) : (
        <></>
      )}
      {toggleClick === "all" && packages && specResident ? (
        <PackageBoard
          pack={packages}
          markAsDelivered={markAsDelivered}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
          packages={packages}
        ></PackageBoard>
      ) : (
        <></>
      )}
    </MainContainer>
  );
};

export default UserPackages;
