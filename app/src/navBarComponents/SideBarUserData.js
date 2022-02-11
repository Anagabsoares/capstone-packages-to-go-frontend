import React from "react";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as FiIcons from "react-icons/fi";

const SideBarData = [
  {
    title: "Packages",
    path: "/my-packages",
    icon: <FiIcons.FiPackage />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconsOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Messages",
    path: "/404",
    icon: <MdIcons.MdOutlineMail />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconsOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Support",
    path: "/404",
    icon: <MdIcons.MdOutlineContactSupport />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconsOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Settings",
    path: "/404",
    icon: <FiIcons.FiSettings />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconsOpened: <RiIcons.RiArrowUpSFill />,
  },
];

export default SideBarData;
