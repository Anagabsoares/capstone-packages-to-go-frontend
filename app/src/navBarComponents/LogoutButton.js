import React from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import styled from "styled-components";

const LogoutBtn = styled(Button)`
  margin-right: 50px;
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
