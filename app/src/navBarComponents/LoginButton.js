import React from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import styled from "styled-components";

const LoginBtn = styled(Button)`
  margin-right: 50px;
`;

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <LoginBtn variant="light" onClick={() => loginWithRedirect()}>
      Log In
    </LoginBtn>
  );
};

export default LoginButton;
