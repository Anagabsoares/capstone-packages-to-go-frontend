import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const FormContainer = styled(Form)`
  width: 30%;
  padding-top: 5%;
  justify-content: center;
  margin-left: 30%;
`;

const TextHeader = styled.h1`
  size: 16px;
`;

const FormText = styled(Form.Text)`
  color: red;
  weight: bold;
`;

const Btn = styled(Button)`
  margin-left: 0px;
  margin-bottom: 10%;
  color: #3a0ca3;
`;

const ButtonSubmit = styled(Button)`
  background-color: #3a0ca3;
  color: white;
  border-color: #3a0ca3;
`;

const CreateResident = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [success, setSuccess] = useState(false);
  const [newResidentData, setNewResidentData] = useState({
    name: "",
    unit: "",
    email: "",
    phone_number: "",
  });
  const [errors, setErrorMessage] = useState({});

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const addResident = async ({ name, phone_number, email, unit }) => {
    try {
      const token = await getAccessTokenSilently();
      await axios.post(
        `${serverUrl}/users`,
        {
          name: name,
          phone_number: phone_number,
          email: email,
          unit: unit,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const onNameChange = (event) => {
    setNewResidentData({
      ...newResidentData,
      name: event.target.value,
    });
  };

  const onEmailChange = (event) => {
    setNewResidentData({
      ...newResidentData,
      email: event.target.value,
    });
  };

  const onUnitChange = (event) => {
    setNewResidentData({
      ...newResidentData,
      unit: event.target.value,
    });
  };

  const onPhoneChange = (event) => {
    setNewResidentData({
      ...newResidentData,
      phone_number: event.target.value,
    });
  };

  const validadeInput = () => {
    if (
      newResidentData.name.length < 3 ||
      !newResidentData.email ||
      !newResidentData.unit ||
      !newResidentData.phone_number
    ) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!validadeInput()) {
      setErrorMessage({ error: "Fields cannot be empty" });
      return;
    }
    addResident(newResidentData);
    setNewResidentData({
      ...newResidentData,
      name: "",
      unit: "",
      email: "",
      phone_number: "",
    });

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);

    setErrorMessage({ error: "" });
  };

  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/users";
    navigate(path);
  };

  return (
    <FormContainer className="add-user-form" onSubmit={onSubmit}>
      <Btn variant="link" onClick={routeChange}>
        Back to Users
      </Btn>
      <TextHeader> Add User </TextHeader>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          onChange={onNameChange}
          value={newResidentData.name}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={onEmailChange}
          value={newResidentData.email}
        />
      </Form.Group>
      <Form.Group className="mb-3 phone-unit">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="(000) 000-0000"
          onChange={onPhoneChange}
          value={newResidentData.phone_number}
        />
      </Form.Group>
      <Form.Group className="mb-3 phone-unit">
        <Form.Label>Unit</Form.Label>
        <Form.Control
          type="text"
          placeholder="####"
          onChange={onUnitChange}
          value={newResidentData.unit}
        />
        {errors ? <FormText>{errors.error}</FormText> : <></>}
        {success ? (
          <Alert variant="success"> User successfully created</Alert>
        ) : (
          <></>
        )}
      </Form.Group>

      <ButtonSubmit variant="primary" type="submit">
        Add User
      </ButtonSubmit>
    </FormContainer>
  );
};

export default CreateResident;
