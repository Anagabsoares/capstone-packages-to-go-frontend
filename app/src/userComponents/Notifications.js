import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Grow from "@mui/material/Grow";
import { Link } from "react-router-dom";
import { Toast, Button, Container } from "react-bootstrap";
import * as FcIcons from "react-icons/fc";
import styled from "styled-components";

const ToastCard = styled(Toast)`
  width: 700px;
  margin: 1%;
  margin-left: 25%;
`;

const ClearButton = styled(Button)`
  margin-left: 73%;
  background-color: #b5179e;
  border-color: #b5179e;
`;

const RedirectLink = styled(Link)`
  color: #b5179e;
`;

const Notifications = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    if (user) {
      const getUser = async () => {
        try {
          const token = await getAccessTokenSilently();
          const response = await axios.get(`${serverUrl}/users`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const users = response.data;
          console.log();
          const res = users.filter((us) => us.email === user.email);
          setCurrentUser(res[0]);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, [user, getAccessTokenSilently]);

  useEffect(() => {
    if (currentUser) {
      const getNotifications = async (user_id) => {
        try {
          const token = await getAccessTokenSilently();
          const response = await axios.get(
            `${serverUrl}/users/${user_id}/notifications-not-read`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setNotifications(response.data.reverse());
        } catch (error) {
          console.log(error);
        }
      };
      getNotifications(currentUser.user_id);
    }
  }, [currentUser, getAccessTokenSilently]);

  const markAsRead = async (id) => {
    console.log(id);
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.patch(
        `${serverUrl}/users/${id}/mark-all-as-read`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };

  const [show, setShow] = useState(true);

  const handleClearButton = (id) => {
    setTimeout(() => {
      setShow(false);
    }, 500);
    markAsRead(id);
    setTimeout(() => {
      window.location.reload();
    }, 30);
  };

  return (
    <>
      <Container>
        {!show || notifications.length === 0 ? (
          <ToastCard>
            <Toast.Header closeButton={false}>
              You don't have new notifications!
            </Toast.Header>
          </ToastCard>
        ) : (
          <ClearButton onClick={() => handleClearButton(currentUser.user_id)}>
            clear
          </ClearButton>
        )}

        {notifications && show ? (
          notifications.map((notification, index) => {
            if (notification.entity_type === 1) {
              return (
                <>
                  <Grow
                    in={show}
                    style={{ transformOrigin: "0 0 0" }}
                    {...(show ? { timeout: 1000 } : {})}
                  >
                    <ToastCard show={true}>
                      <Toast.Header closeButton={false}>
                        <FcIcons.FcInfo size={25} />
                        <strong className="me-auto"> NEW PACKAGE</strong>
                        <small className="text-muted">
                          {notification.description}
                        </small>
                      </Toast.Header>
                      <Toast.Body>
                        <p>Hooray! you just got a new package</p>
                        <RedirectLink to="/my-packages">
                          see details and request it to be delivered!
                        </RedirectLink>
                      </Toast.Body>
                    </ToastCard>
                  </Grow>
                </>
              );
            } else {
              return (
                <>
                  <Grow
                    in={show}
                    style={{ transformOrigin: "0 0 0" }}
                    {...(show ? { timeout: 1000 } : {})}
                  >
                    <ToastCard>
                      <Toast.Header closeButton={false}>
                        <FcIcons.FcOk size={25} />
                        <strong className="me-auto"> DELIVERED</strong>
                        <small className="text-muted">
                          {notification.description}
                        </small>
                      </Toast.Header>
                      <Toast.Body>
                        We just delivered your packages at your door!
                      </Toast.Body>
                    </ToastCard>
                  </Grow>
                </>
              );
            }
          })
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default Notifications;
