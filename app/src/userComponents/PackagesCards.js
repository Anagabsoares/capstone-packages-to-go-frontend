import React from "react";
import styled from "styled-components";
import {
  Container,
  ListGroup,
  Badge,
  Row,
  Button,
  Col,
  Card,
} from "react-bootstrap";

const Cont = styled(Container)`
  margin-top: 3%;
`;

const DashButton = styled(Button)`
  background-color: pink;
  color: white;
  border-color: #b5179e;
`;

const PackagesCards = ({ packages, toggle }) => {
  return (
    <Cont>
      <Row>
        {packages.map((pack, index) => (
          <Col xs={3} className="mb=5" key={index}>
            <Card className="h-100 shadow-sm bg-white rounded">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex mb-2 justify-content-between">
                  <Card.Title className="mb-0 font-weight-bold">
                    📦 {pack.service_provider}
                  </Card.Title>
                </div>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    {pack.status ? (
                      <Badge>requested</Badge>
                    ) : (
                      <>not requested</>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Arrival date:</b> {pack.arrived_at}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>delivered:</b>
                    {pack.delivery_date !== "pending" ? (
                      <> {pack.delivery_date}</>
                    ) : (
                      <Badge bg="danger">pending</Badge>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>description</b> {pack.description}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {packages.length === 0 && toggle === "new" ? (
        <DashButton variant="danger" disabled>
          No package to request delivery
        </DashButton>
      ) : (
        <></>
      )}
    </Cont>
  );
};

export default PackagesCards;
