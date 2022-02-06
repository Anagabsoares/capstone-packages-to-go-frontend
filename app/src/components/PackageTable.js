import axios from "axios";
import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { Type } from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
import styled from "styled-components";

import { Button, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const PackageTable = ({
  getSpecResident,
  packages,
  handleDetailButton,
  markAsDelivered,
  specResident,
  handleOnExpand,
  clicked,
}) => {
  const headerSortingStyle = { backgroundColor: "lightgray" };

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
      // headerSortingStyle,
    },
    {
      dataField: "delivery_date",
      sort: true,
      text: "delivery  date",
      // headerSortingStyle,
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
          <></>
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

export default PackageTable;
