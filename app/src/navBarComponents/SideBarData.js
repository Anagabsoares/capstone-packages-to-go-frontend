import React from "react";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";

const SideBarData = [
  {
    title: "DASHBOARD",
    path: "/dash",
    icon: <MdIcons.MdOutlineSpaceDashboard />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconsOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: "Users",
    path: "/users",
    icon: <FaIcons.FaUsers />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconsOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "See All Users",
        path: "/users",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Add User",
        path: "/users/add-users",
        icon: <AiIcons.AiOutlinePlusCircle />,
      },
    ],
  },
  {
    title: "Packages",
    path: "/packages",
    icon: <FiIcons.FiPackage />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconsOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "See Packages History",
        path: "/packages/history",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Requests",
        path: "/packages/requests",
        icon: <AiIcons.AiOutlineWarning />,
      },
    ],
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
