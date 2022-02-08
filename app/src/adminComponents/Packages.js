import React, { useState, useEffect } from "react";
import axios from "axios";
import PackageList from "./PackageTable";
import CreatePackage from "./CreatePackage";
import UserPackages from "./UserPackages";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const ButtonCreate = styled(Button)`
  margin-left: 80%;
  margin-top: 5%;
  display: inline-block;
`;

const Packages = () => {
  const [toggle, setToggle] = useState(false);
  const [toggleSpec, setToggleSpec] = useState(true);
  const [packages, setPackages] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const [errorMessage, setErrorMessage] = useState(false);
  const [specResident, setSpecResident] = useState({
    name: "",
    email: "",
    unit: "",
    phone_number: "",
  });
  const serverUrl = "https://packages-delivery-ai.herokuapp.com";

  useEffect(() => {
    const geAllPackages = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(`${serverUrl}/packages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPackages(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    geAllPackages();
  }, [getAccessTokenSilently]);

  const handleClick = () => {
    setToggle(!toggle);
  };

  // delete a pckage
  const deletePackage = async (id) => {
    try {
      console.log("clicked");
      const token = await getAccessTokenSilently();
      const response = await axios.delete(`${serverUrl}/packages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("user deleted");
      const newPackages = packages.filter((resid) => resid.user_id !== id);
      setPackages([newPackages]);
    } catch (error) {
      console.log(error);
      alert("sorry!! this user could not be deleted");
    }
  };

  const getSpecResident = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(`${serverUrl}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSpecResident(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const markAsDelivered = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.patch(
        `${serverUrl}/packages/${id}/mark-as-delivered`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data === "This package has already been delivered") {
        setErrorMessage(true);
        setTimeout(() => {
          setErrorMessage(false);
        }, 3000);
      } else {
        // COME BACK- hOW TO UPDATE THE STATE - PATCH REQUEST
        window.location.reload();
        alert("Success!!");
      }
    } catch (error) {
      console.log(error);
      alert("sorry!! this package could not be updated");
    }
  };

  const handleSpecificButton = () => {
    setToggleSpec(!toggleSpec);
  };

  return (
    <>
      <ButtonCreate
        onClick={() => {
          handleClick();
        }}
      >
        {!toggle ? "Add new Package" : "hide form"}
      </ButtonCreate>
      {toggle ? (
        <CreatePackage packages={packages} setPackages={setPackages} />
      ) : (
        <></>
      )}

      <ButtonCreate
        onClick={() => {
          handleSpecificButton();
        }}
      >
        check specific users
      </ButtonCreate>

      {toggleSpec ? (
        <UserPackages
          markAsDelivered={markAsDelivered}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          packages={packages}
        />
      ) : (
        <></>
      )}

      <PackageList
        packages={packages}
        setPackages={setPackages}
        specResident={specResident}
        setSpecResident={specResident}
        getSpecResident={getSpecResident}
        getAccessTokenSilently={getAccessTokenSilently}
        markAsDelivered={markAsDelivered}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
};

export default Packages;
