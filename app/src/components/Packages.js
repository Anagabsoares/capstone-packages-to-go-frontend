import axios from "axios";
import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { Type } from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
import styled from "styled-components";

import { Button, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const Info = styled.p`
  font-size: 25px;
  margin-bottom: 0%;
`;

const CreatePackage = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [clicked, setClick] = useState(false);
  const [packages, setPackages] = useState([]);
  const [specResident, setSpecResident] = useState({
    name: "",
    email: "",
    unit: "",
    phone_number: "",
  });
  const headerSortingStyle = { backgroundColor: "lightgray" };
  const serverUrl = "https://api-packages-delivery.herokuapp.com";

  // GET all PACKAGES
  useEffect(() => {
    const geAllPackages = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(`${serverUrl}/packages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPackages(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    geAllPackages();
  }, [getAccessTokenSilently]);

  // get package by id
  const getSpecResident = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get(`${serverUrl}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSpecResident(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // mark package as delivered
  const markAsDelivered = async (id) => {
    console.log(user);
    try {
      const token = await getAccessTokenSilently();
      const res = await axios.patch(
        `${serverUrl}/packages/${id}/mark-as-delivered`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data === "This package has already been delivered") {
        alert("This package has already been delivered");
      } else {
        alert("Success");
      }

      console.log(res);
      // setPackages(res.data);
      alert("user updated");
    } catch (error) {
      console.log(error);
      alert("sorry!! this package could not be updated");
    }
  };

  // delete a pckage
  const deletePackage = async (id) => {
    try {
      console.log("clicked");
      const token = await getAccessTokenSilently();
      const response = await axios.delete(`${serverUrl}/packages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("user deleted");
      const newPackages = packages.filter((resid) => resid.user_id !== id);
      setPackages(newPackages);
    } catch (error) {
      console.log(error);
      alert("sorry!! this user could not be deleted");
    }
  };

  // format date - for table
  const formatDate = (cell) => {
    if (cell === "pending") {
      return "pending";
    }
    let dateObj = cell;
    if (typeof cell !== "object") {
      dateObj = new Date(cell);
    }
    return `${("0" + dateObj.getUTCDate()).slice(-2)}/${(
      "0" +
      (dateObj.getUTCMonth() + 1)
    ).slice(-2)}/${dateObj.getUTCFullYear()}`;
  };

  // sort column
  const orderDate = (order, column) => {
    if (!order) return <span>&nbsp;&nbsp;Desc/Asc</span>;
    else if (order === "asc")
      return (
        <span>
          &nbsp;&nbsp;New/<font color="red">Old</font>
        </span>
      );
    else if (order === "desc")
      return (
        <span>
          &nbsp;&nbsp;<font color="red">New</font>/Old
        </span>
      );
    return null;
  };
  // stracture for table
  const columns = [
    {
      dataField: "packages_id",
      text: "Package id",
      hidden: true,
    },
    {
      dataField: "arrived_at",
      text: "Arrival date",
      sort: true,
      formatter: formatDate,
      editor: {
        type: Type.DATE,
      },
      sortCaret: orderDate,
      headerSortingStyle,
    },
    {
      dataField: "delivery_date",
      sort: true,
      text: "delivery  date",
      headerSortingStyle,
      formatter: formatDate,
      editor: {
        type: Type.DATE,
      },
      filter: textFilter({}),
    },
    {
      dataField: "service_provider",
      text: "Provider",
      filter: textFilter({}),
    },
    {
      dataField: "user_id",
      text: "user-id",
      filter: textFilter({}),
    },
  ];

  const defaultSorted = [
    {
      dataField: "name",
      order: "asc",
    },
  ];

  //handle buttons events
  const handleDetailButton = (user_id) => {
    getSpecResident(user_id);
    setClick(!clicked);
  };

  // handle table events

  const handleOnExpand = (row, isExpand, rowId, e) => {
    if (isExpand === false) {
      isExpand = true;
    } else {
      isExpand = false;
      setSpecResident("");
    }
    setClick(false);
  };

  const expandRow = {
    onlyOneExpanding: true,

    renderer: (row) => (
      <>
        <Button onClick={() => handleDetailButton(row.user_id)}>
          {clicked && !specResident ? "Hide details" : "See Details"}
        </Button>

        {clicked ? (
          <>
            <p>Name:{specResident.name}</p>
            <p>Unit: {specResident.unit}</p>
            <p>Requested Delivery: {!specResident.status ? "False" : "True"}</p>
          </>
        ) : (
          console.log(specResident)
        )}
        <Button
          onClick={() => {
            markAsDelivered(row.packages_id);
          }}
        >
          ✅ Delivered
        </Button>
      </>
    ),
    onExpand: handleOnExpand,
  };

  return (
    <Container>
      <OverlayTrigger
        overlay={
          <Tooltip id="tooltip-disabled">
            double click the cell to see detalis about the owner!
          </Tooltip>
        }
      >
        <span className="d-inline-block">
          <Info style={{ pointerEvents: "none" }}>ℹ️</Info>
        </span>
      </OverlayTrigger>

      <BootstrapTable
        striped
        hover
        condensed
        bordered={false}
        keyField={"packages_id"}
        defaultSorted={defaultSorted}
        data={packages}
        columns={columns}
        expandRow={expandRow}
        filter={filterFactory()}
        pagination={paginationFactory()}
        filterPosition="bottom"
      />
    </Container>
  );
};

export default CreatePackage;
