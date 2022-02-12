import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import PackagesCards from "./PackagesCards";
import styled from "styled-components";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";

const Header = styled.h1`
  font-size: 50px;
`;

const Cont = styled(Container)`
  margin-left: 30%;
  margin-top: 3%;
`;

const DashButton = styled(Button)`
  background-color: #3a0ca3;
  color: white;
  border-color: #3a0ca3;
`;

const ResidentPackages = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [resident, setResident] = useState(null);
  const [userId, setUserId] = useState(null);
  const [toggle, setToggle] = useState("");
  const [packages, setPackages] = useState({
    pending: [],
    requested: [],
    notRequested: [],
    allPackages: [],
    delivered: [],
  });

  // const serverUrl = "https://packages-delivery-ai.herokuapp.com";
  const serverUrl = "https://capstone-backend-api.herokuapp.com";
  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(`${serverUrl}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const users = response.data;
        const res = users.filter((us) => us.email === user.email);
        setResident(res);
        setUserId(res[0]["user_id"]);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [user, getAccessTokenSilently]);

  useEffect(() => {
    const getPackagesbyUser = async (user_id) => {
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
        const notRequested = response.data.filter(
          (pack) => pack.delivery_date === "pending" && pack.status === false
        );
        const requested = response.data.filter(
          (pack) => pack.delivery_date === "pending" && pack.status === true
        );
        const allPending = response.data.filter(
          (pack) => pack.delivery_date === "pending"
        );
        const delivered = response.data.filter(
          (pack) => pack.delivery_date !== "pending"
        );
        setPackages({
          pending: allPending,
          requested: requested,
          notRequested: notRequested,
          delivered: delivered,
          allPackages: response.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getPackagesbyUser(userId);
  }, [userId, getAccessTokenSilently]);

  const updatePackStatus = async (package_id) => {
    try {
      const token = await getAccessTokenSilently();
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.patch(
        `${serverUrl}/packages/${package_id}/status`,
        {
          status: true,
        },
        headers
      );
    } catch (error) {
      console.log(error);
      alert("sorry!! this user could not be updated");
    }
  };

  const requestAll = (notRequested) => {
    const pack = notRequested.forEach((item) => {
      updatePackStatus(item.packages_id);
    });
    setPackages({ ...packages, notRequested: [] });
    alert("success");
  };

  const onButtonClick = (event) => {
    setToggle(event.target.value);
  };

  return (
    <Cont>
      <div className="content">
        <Header>Package Status</Header>
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="rounded">
              <Card.Body>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <AiIcons.AiOutlineWarning size={40} />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <DashButton
                      onClick={(e) => {
                        onButtonClick(e);
                      }}
                      value="new"
                    >
                      NEW PACKAGES
                    </DashButton>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg="3" md="6" sm="6">
            <Card className="rounded">
              <Card.Body>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <AiIcons.AiOutlineClockCircle size={40} />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <DashButton
                      onClick={(e) => {
                        onButtonClick(e);
                      }}
                      value="pending"
                    >
                      PENDING DELIVERY
                    </DashButton>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="rounded">
              <Card.Body>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <MdIcons.MdOutlineDownloadDone size={40} />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <DashButton
                      onClick={(e) => {
                        onButtonClick(e);
                      }}
                      value="delivered"
                    >
                      DELIVERED
                    </DashButton>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="9">
            <Card>
              <Card.Header>
                <Card.Title tag="h5">Your {toggle} packages: </Card.Title>
                {toggle === "new" && packages.notRequested.length !== 0 ? (
                  <>
                    <DashButton
                      onClick={() => {
                        requestAll(packages.notRequested);
                      }}
                    >
                      {" "}
                      Request Delivery
                    </DashButton>
                  </>
                ) : (
                  <></>
                )}
              </Card.Header>
              <Card.Body>
                {toggle === "new" ? (
                  <>
                    <PackagesCards
                      packages={packages.notRequested}
                      toggle={toggle}
                    />
                  </>
                ) : (
                  <></>
                )}
                {toggle === "delivered" ? (
                  <PackagesCards
                    packages={packages.delivered}
                    toggle={toggle}
                  />
                ) : (
                  <></>
                )}
                {toggle === "pending" ? (
                  <PackagesCards packages={packages.pending} toggle={toggle} />
                ) : (
                  <></>
                )}
              </Card.Body>
              <Card.Text></Card.Text>
            </Card>
          </Col>
        </Row>
      </div>
    </Cont>
  );
};

export default ResidentPackages;
