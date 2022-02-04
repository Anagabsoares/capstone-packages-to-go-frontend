import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SideBarData from "./SideBarData";
import SubMenu from "./SubMenu";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

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
  z-index: 10;
`;

const SideBarWrap = styled.div`
  width: 100%;
`;

const SideBar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSideBar = () => setSidebar(!sidebar);

  return (
    <>
      <Menu>
        <MenuIcon to="#">
          <FaIcons.FaBars onClick={showSideBar} />
        </MenuIcon>
      </Menu>
      <SideBarNav sidebar={sidebar}>
        <SideBarWrap>
          <MenuIcon to="#">
            <AiIcons.AiOutlineClose onClick={showSideBar} />
          </MenuIcon>
          {SideBarData.map((item, index) => {
            return <SubMenu item={item} key={index}></SubMenu>;
          })}
        </SideBarWrap>
      </SideBarNav>
    </>
  );
};

export default SideBar;
