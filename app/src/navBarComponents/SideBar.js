import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import SubMenu from "./SubMenu";

const Menu = styled.div`
  color: white;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const MenuIcon = styled(Link)`
  margin-left: 2rem;
  margin-right: 4rem;
  font-siz: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: gray;

  &:hover {
    color: gray;
  }
`;

const SideBarNav = styled.nav`
  background: #333533;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 0;
`;

const SideBarWrap = styled.div`
  width: 100%;
`;

const Cont = styled(Container)`
  margin-top: 2%;
`;

const SideBar = ({ SideBarData }) => {
  const [sidebar, setSidebar] = useState(true);
  const showSideBar = () => setSidebar(true);

  return (
    <>
      <Menu></Menu>
      <SideBarNav sidebar={sidebar}>
        <SideBarWrap>
          <MenuIcon to="#"></MenuIcon>
          {SideBarData.map((item, index) => {
            if (item.title !== "Support") {
              return <SubMenu item={item} key={index}></SubMenu>;
            } else {
              return <></>;
            }
          })}
          <Cont>
            {SideBarData.map((item, index) => {
              if (item.title === "Support") {
                return <SubMenu item={item} key={index}></SubMenu>;
              } else {
                return <></>;
              }
            })}
          </Cont>
        </SideBarWrap>
      </SideBarNav>
    </>
  );
};

export default SideBar;
