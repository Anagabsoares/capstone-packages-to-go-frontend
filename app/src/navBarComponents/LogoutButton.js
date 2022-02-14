import React from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import styled from "styled-components";

const LogoutBtn = styled(Button)`
  margin-bottom: 0;
  margin-top: 5px;
  width: 100%;
`;

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <LogoutBtn
      variant="light"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Log Out
    </LogoutBtn>
  );
};

export default LogoutButton;
