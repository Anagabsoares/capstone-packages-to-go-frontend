import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { Type } from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
import * as AiIcons from "react-icons/ai";
import styled from "styled-components";

import {
  Button,
  Container,
  OverlayTrigger,
  Tooltip,
  Badge,
  Alert,
} from "react-bootstrap";

const Info = styled.p`
  font-size: 25px;
  margin-bottom: 0%;
`;

const Btn = styled(Button)`
  display: inline-block;
  margin-right: 2%;
  margin-left: 2%;
  size: 10px;
`;

const H1 = styled.h1`
  font-size: 60px;
  margin-top: 0%;
`;

const MainContainer = styled(Container)`
  margin-top: 0%;
  margin-left: 25%;
  width: 60%;
`;
const PackageList = ({
  packages,
  specResident,
  getSpecResident,
  setErrorMessage,
  errorMessage,
  markAsDelivered,
}) => {
  const [clicked, setClick] = useState(false);
  const headerSortingStyle = { backgroundColor: "lightgray" };

  const showErrorMessage = () => {
    return (
      <Alert
        variant="danger"
        onClose={() => setErrorMessage(false)}
        dismissible
      >
        <Alert.Heading>This package has already been delivered</Alert.Heading>
      </Alert>
    );
  };

  // format date - for table
  const formatDate = (cell) => {
    if (cell === "pending") {
      return (
        <Badge bg="primary" text="light">
          pending
        </Badge>
      );
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

  const formatRequestCell = (cell) => {
    if (!cell) {
      return (
        <Badge bg="light" text="dark">
          false
        </Badge>
      );
    } else {
      return (
        <Badge bg="warning" text="dark">
          requested
        </Badge>
      );
    }
  };

  // sort column
  const orderDate = (order, column) => {
    if (!order) return <span>&nbsp;&nbsp;Old/New</span>;
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

  function priceFormatter(column, colIndex) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {column.text}
      </div>
    );
  }

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
      dataField: "status",
      text: "Requested",
      headerFormatter: priceFormatter,
      formatter: formatRequestCell,
      filter: textFilter(),
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
      filter: textFilter(),
    },
    {
      dataField: "service_provider",
      text: "Provider",
      filter: textFilter(),
    },
    {
      dataField: "user_id",
      text: "user-id",
      filter: textFilter(),
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
    getSpecResident(row.user_id);
    if (isExpand === false) {
      isExpand = true;
    } else {
      isExpand = false;
    }
    setClick(false);
  };

  const expandRow = {
    onlyOneExpanding: true,

    renderer: (row) => (
      <>
        <Btn onClick={() => handleDetailButton(row.user_id)}>
          {clicked && !specResident ? "Hide details" : "See user's Details"}
        </Btn>

        {clicked ? (
          <>
            <p>Name:{specResident.name}</p>
            <p>Unit: {specResident.unit}</p>
            <p>Email: {specResident.email}</p>
            <p>Phone: {specResident.phone_number}</p>
          </>
        ) : (
          <></>
        )}
        <Btn
          variant="success"
          onClick={() => {
            markAsDelivered(row.packages_id, row.user_id);
          }}
        >
          ✅ mark as delivered
        </Btn>
      </>
    ),
    onExpand: handleOnExpand,
  };

  return (
    <MainContainer>
      <H1>Packages 📦</H1>
      <OverlayTrigger
        overlay={
          <Tooltip id="tooltip-disabled">
            double click the cell to see detalis about the owner!
          </Tooltip>
        }
      >
        <span className="d-inline-block">
          <Info style={{ pointerEvents: "none" }}>
            <AiIcons.AiOutlineInfoCircle size={30} />
          </Info>
        </span>
      </OverlayTrigger>
      {errorMessage ? showErrorMessage() : <></>}

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
    </MainContainer>
  );
};

export default PackageList;
