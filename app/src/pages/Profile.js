import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

const Cont = styled(Container)`
  margin-top: 5%;
  margin-left: 35%;
  width: 120%;
`;

const Image = styled.img`
  width: 250px;
  border-radius: 50%;
  margin-left: 20%;
`;
const CardTitle = styled(Card.Title)`
  &::first-letter {
    text-transform: capitalize;
  }
`;

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [role, setRole] = useState("");

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

  console.log(role);
  return (
    <>
      <Cont fluid>
        <Col md="4">
          <Row>
            <Col md="8">
              <Card>
                <Card.Header>
                  <CardTitle as="h4">{role[0]} Profile</CardTitle>
                  <Card>
                    <div>
                      <Image src={user.picture} alt={user.name} />
                    </div>
                    <hr></hr>
                  </Card>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group>
                      <Form.Control
                        defaultValue={user.name}
                        placeholder="Username"
                        type="text"
                        disabled
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <Form.Control
                        defaultValue={user.email}
                        placeholder="Email"
                        disabled
                      ></Form.Control>
                    </Form.Group>

                    <Form.Group>
                      <label htmlFor="unit">Unit</label>
                      <Form.Control placeholder="Unit"></Form.Control>
                    </Form.Group>

                    <Button
                      className="btn-fill pull-right"
                      type="submit"
                      variant="info"
                    >
                      Update Profile
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Cont>
    </>
  );
};

export default Profile;
