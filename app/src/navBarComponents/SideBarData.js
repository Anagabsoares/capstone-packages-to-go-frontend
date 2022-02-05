import React from "react";
import * as FiIcons from "react-icons/fi";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

const SideBarData = [
  {
    title: "Overview",
    path: "/overview",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconsOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Users",
        path: "/overview/user-list",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Delivery Requests",
        path: "/overview/delivery-requests",
        icon: <FiIcons.FiPackage />,
      },
    ],
  },
  {
    title: "History",
    path: "/packages-history",
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconsOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Packages Delivered",
        path: "/overview/users",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Overview",
        path: "/overview",
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconsOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
          {
            title: "Users",
            path: "/overview/users",
            icon: <IoIcons.IoIosPaper />,
          },
          {
            title: "Delivery Requests",
            path: "/overview/delivery-requests",
            icon: <IoIcons.IoIosPaper />,
          },
          {
            title: "All Packages",
            path: "/overview/delivery-requests",
            icon: <IoIcons.IoIosPaper />,
          },
        ],
      },
    ],
  },
];

export default SideBarData;
