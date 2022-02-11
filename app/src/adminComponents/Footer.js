import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Foot = styled.footer`
  font-size: 100%;
  background-color: white;
  color: #333533;
  position: fixed; /* keep on the bottom */
  bottom: 0;
  padding-top: 15px;
  width: 100%;
  height: 5%;
  text-align: center;
  font-family: Lato, Verdana, sans-serif;
`;

const Footer = (props) => {
  return (
    <Foot>
      <div className="copyright">
        &copy; {1900 + new Date().getYear()},
        <i className="fa fa-heart heart" /> by Ana Gabriele Soares
      </div>
    </Foot>
  );
};

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
