import axios from "axios";
import React, { useState } from "react";
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

  &:hover {
  }
`;

const Btn = styled(Button)`
  background-color: #3a0ca3;
  border-color: #3a0ca3;
  color: white;
  margin: 0.3%;

  &:focus {
    border-color: #fb5179e;
    background-color: #b5179e;
  }
  &:hover {
    border-color: #b5179e;
    background-color: #b5179e;
  }
  &:active {
    border-color: #b5179e;
    background-color: #b5179e;
  }
`;

const SearchUser = ({
  residents,
  markAsDelivered,
  setErrorMessage,
  errorMessage,
  packages,
}) => {
  // REFACTOR THIS
  const { getAccessTokenSilently } = useAuth0();
  const [pending, setPending] = useState("");
  const [delivered, setDelivered] = useState("");
  const [requested, setRequested] = useState("");
  const [toggleClick, setToggleClick] = useState("");
  const [packs, setPacks] = useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const getPackbyUser = async (user_id) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(
        `${serverUrl}/users/${user_id}/packages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const packs = response.data;
      const pending = packs.filter((pack) => pack.delivery_date === "pending");
      const requested = packs.filter(
        (pack) => pack.delivery_date === "pending" && pack.status === true
      );
      const delivered = packs.filter(
        (pack) => pack.delivery_date !== "pending"
      );
      setDelivered(delivered);
      setRequested(requested);
      setPending(pending);
      setPacks(packs);
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
    if (result === undefined) {
      return;
    } else {
      setSpecResident(user);
      getPackbyUser(result.user_id);
    }
  };

  const onButtonClick = (event) => {
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
              <option key={index} value={resid.name}>
                {resid.unit}
              </option>
            );
          })}
        </datalist>

        <Btn onClick={(e) => onButtonClick(e)} value={"pending"}>
          Pending Packages
        </Btn>
        <Btn onClick={(e) => onButtonClick(e)} value={"delivered"}>
          Delivered
        </Btn>
        <Btn onClick={(e) => onButtonClick(e)} value={"requested"}>
          Requested
        </Btn>
        <Btn onClick={(e) => onButtonClick(e)} value={"all"}>
          All packages
        </Btn>
      </Search>

      {toggleClick === "delivered" && delivered && specResident ? (
        <PackageBoard
          pack={delivered}
          markAsDelivered={markAsDelivered}
          setErrorMessage={setErrorMessage}
          getPackbyUser={getPackbyUser}
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
          getPackbyUser={getPackbyUser}
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
          getPackbyUser={getPackbyUser}
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
          markAsDelivered={markAsDelivered}
          setErrorMessage={setErrorMessage}
          getPackbyUser={getPackbyUser}
          errorMessage={errorMessage}
          packages={packages}
          pack={packs}
        ></PackageBoard>
      ) : (
        <></>
      )}
    </MainContainer>
  );
};

export default SearchUser;
