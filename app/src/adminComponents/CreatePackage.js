import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

// get all delivery requests

const PackageForm = styled(Form)`
  margin-top: 0%;
  margin-left: 10%;
  width: 80%;
`;

const SubmitButton = styled(Button)`
  margin-top: 2%;
  background-color: #3a0ca3;
  color: white;
  border-color: #3a0ca3;
`;

const CreatePackage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [packages, setPackages] = useState();
  const [residents, setResidents] = useState([]);
  const [newPackage, setNewPackage] = useState({
    user_id: "",
    service_provider: "",
    description: "",
  });

  // const serverUrl = "https://packages-delivery-ai.herokuapp.com";
  const serverUrl = "https://capstone-backend-api.herokuapp.com";

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

  const getAllPackages = async () => {
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
  const getSpecResident = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(`${serverUrl}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [message, setMessage] = useState({ error: "", success: false });

  const addPackage = async ({ user_id, service_provider, description }) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.post(
        `${serverUrl}/users/${user_id}/packages`,
        {
          user_id: user_id,
          service_provider: service_provider,
          description: description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPackages([res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const sendPostNotification = async (user_id) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.post(
        `${serverUrl}/users/${user_id}/notifications`,
        {
          user_id: user_id,
          entity_type: 1,
          description: `${new Date().toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}`,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onNameChange = (event) => {
    const user = residents.filter((resi) => resi.unit === event.target.value);
    const result = user[0];
    if (result === undefined) {
      return;
    } else {
      setNewPackage({
        ...newPackage,
        user_id: user[0]["user_id"],
      });
    }
  };

  const onProviderChange = (event) => {
    setNewPackage({
      ...newPackage,
      service_provider: event.target.value,
    });
  };

  const onDescriptionChange = (event) => {
    setNewPackage({
      ...newPackage,
      description: event.target.value,
    });
  };

  const validadeInput = () => {
    if (
      newPackage.user_id === "" ||
      newPackage.description === "" ||
      newPackage.service_provider === ""
    ) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = (event, type) => {
    event.preventDefault();

    if (!validadeInput()) {
      setMessage({ ...message, error: "Fields cannot be empty" });
      setTimeout(() => setMessage({ ...message, success: false }), 3000);
      return;
    }

    addPackage(newPackage);
    sendPostNotification(newPackage.user_id);

    setNewPackage({
      ...newPackage,
      user_id: "",
      service_provider: "",
      description: "",
    });
    setMessage({ error: "", success: true });
    setTimeout(() => {
      setMessage({ ...message, success: false });
    }, 3000);
  };

  const providerOptions = ["FEDEX", "AMAZON", "USP", "UPS", "OTHER"];
  const descriptionOptions = [
    "REGULAR",
    "PERISHABLE",
    "DAMAGED/BROKEN or TORN",
  ];
  return (
    <>
      <PackageForm
        className="mb-3"
        onSubmit={(e) => onSubmit(e, "added a new package")}
      >
        <label htmlFor="exampleDataList" className="form-label">
          Resident's Name or unit
        </label>
        <input
          className="form-control"
          list="unitList"
          placeholder="type to search ..."
          onChange={onNameChange}
        />
        <datalist id="unitList">
          {residents.map((resid, index) => {
            return (
              <option key={index + 10} value={resid.unit}>
                {resid.name}
              </option>
            );
          })}
        </datalist>
        <Form.Select aria-label="service_provider" onChange={onProviderChange}>
          <option>Service Provider</option>
          {providerOptions.map((desc, ind) => {
            return (
              <option key={ind} value={desc}>
                {desc}
              </option>
            );
          })}
        </Form.Select>
        <Form.Select aria-label="description" onChange={onDescriptionChange}>
          <option>Description</option>
          {descriptionOptions.map((desc, ind) => {
            return (
              <option key={ind} value={desc}>
                {desc}
              </option>
            );
          })}
        </Form.Select>
        {message.error ? (
          <Alert variant="danger">{message.error}</Alert>
        ) : (
          <></>
        )}
        {message.success ? (
          <Alert variant="success">Package successfully added</Alert>
        ) : (
          <></>
        )}
        <SubmitButton type="submit">add package</SubmitButton>
      </PackageForm>
    </>
  );
};

export default CreatePackage;
