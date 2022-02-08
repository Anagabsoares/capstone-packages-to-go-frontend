import React from "react";
import {
  Container,
  ListGroup,
  Badge,
  Row,
  Button,
  Col,
  Card,
} from "react-bootstrap";

const PackageBoard = ({ pack, markAsDelivered, packages }) => {
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

                {pack.delivery_date === "pending" ? (
                  <Button
                    size="sm"
                    className="mt-auto font-weight-bold"
                    variant="success"
                    block
                    onClick={() => {
                      markAsDelivered(pack.packages_id);
                    }}
                  >
                    mark as delivered
                  </Button>
                ) : (
                  <></>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PackageBoard;
