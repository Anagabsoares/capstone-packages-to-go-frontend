import React, { useState } from "react";
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

const Btn = styled(Button)`
  background-color: #005f73;
  border-color: #005f73;
`;

const PackageBoard = ({ pack, markAsDelivered, packages, getPackbyUser }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (id, user_id) => {
    markAsDelivered(id);
    getPackbyUser(user_id);
    setIsClicked(false);
  };
  return (
    <Container>
      <Row>
        {pack.map((pack, index) => (
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
                    delivered:
                    {pack.delivery_date !== "pending" ? (
                      <> {pack.delivery_date}</>
                    ) : (
                      <Badge bg="danger">pending</Badge>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    description: {pack.description}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
              {pack.delivery_date === "pending" && !isClicked ? (
                <Btn
                  size="sm"
                  className="mt-auto font-weight-bold"
                  variant="success"
                  block
                  onClick={() => {
                    handleClick(pack.packages_id, pack.user_id);
                  }}
                >
                  mark as delivered
                </Btn>
              ) : (
                <Badge bg="primary" disabled>
                  delivered
                </Badge>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PackageBoard;
