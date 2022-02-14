import React from "react";
import Chart from "./Chart";
import * as FiIcons from "react-icons/fi";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import CreatePackage from "./CreatePackage";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";

const GlobalContainer = styled.body`
  margin-top: 2%;
  margin-left: 15%;
  margin-right: 1%;
  background-color: #e5e5e5;
`;

const DashButton = styled(Button)`
  background-color: #3a0ca3;
  color: white;
  border-color: #3a0ca3;
`;

const DashCard = styled(Card)`
  margin-bottom: 5%;
  height: 100%;
`;

const Column = styled(Col)`
  margin-top: -7%;
`;

const Dashboard = () => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    const value = event.target.value;
    let path;
    if (value === "redirect-new-user") {
      path = "/users/add-users";
      navigate(path);
    } else if (value === "redirect-see-users") {
      path = "/users";
      navigate(path);
    } else if (value === "redirect-see-packages") {
      path = "/packages";
      navigate(path);
    } else if (value === "redirect-see-request") {
      path = "/packages/requests";
      navigate(path);
    }
  };

  return (
    <GlobalContainer>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <DashCard className="rounded">
              <Card.Body>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <FiIcons.FiUserPlus size={40} />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <Card.Title tag="p">Add User</Card.Title>
                    <DashButton
                      value={"redirect-new-user"}
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    >
                      Add new user
                    </DashButton>
                  </Col>
                </Row>
              </Card.Body>
            </DashCard>
          </Col>

          <Col lg="3" md="6" sm="6">
            <DashCard className="rounded">
              <Card.Body>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <FiIcons.FiUsers size={40} />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <Card.Title tag="p">Users</Card.Title>
                    <DashButton
                      value={"redirect-see-users"}
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    >
                      see all users
                    </DashButton>
                  </Col>
                </Row>
              </Card.Body>
            </DashCard>
          </Col>
          <Col lg="3" md="6" sm="6">
            <DashCard className="rounded">
              <Card.Body>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <FiIcons.FiPackage size={40} />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <Card.Title tag="p">Packages</Card.Title>
                    <DashButton
                      value={"redirect-see-packages"}
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    >
                      see packages
                    </DashButton>
                  </Col>
                </Row>
              </Card.Body>
            </DashCard>
          </Col>
          <Col lg="3" md="6" sm="6">
            <DashCard className="rounded">
              <Card.Body>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <HiIcons.HiViewGrid size={40} />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <Card.Title tag="p">Requests</Card.Title>
                    <DashButton
                      value={"redirect-see-request"}
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    >
                      see requests
                    </DashButton>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Text></Card.Text>
            </DashCard>
          </Col>
        </Row>
        <Row>
          <Col md="15">
            <Card>
              <Card.Header></Card.Header>
              <Card.Body></Card.Body>
              <Card.Text>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" />
                </div>
              </Card.Text>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="7">
            <DashCard>
              <Card.Header>
                <Card.Title tag="h5">
                  <HiIcons.HiOutlinePlusSm size={40} />
                  ADD PACKAGE
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <CreatePackage></CreatePackage>
              </Card.Body>
              <Card.Text></Card.Text>
            </DashCard>
          </Col>
          <Col md="5">
            <DashCard className="card-chart">
              <Card.Text>
                <Card.Header>
                  <Card.Title tag="h5">
                    <AiIcons.AiOutlineBarChart size={40} />
                    PACKAGES OVERVIEW
                  </Card.Title>
                </Card.Header>
                <p> Last 60 days</p>
              </Card.Text>
              <Card.Body>
                <Chart></Chart>
              </Card.Body>
              <Card.Text></Card.Text>
            </DashCard>
          </Col>
          <Column md="7">
            <DashCard>
              <Card.Header>
                <Card.Title tag="h5"></Card.Title>
              </Card.Header>
              <Card.Body></Card.Body>
              <Card.Text></Card.Text>
            </DashCard>
          </Column>
        </Row>
      </div>
    </GlobalContainer>
  );
};

export default Dashboard;
