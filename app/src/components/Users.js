import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory from "react-bootstrap-table2-editor";
import styled from "styled-components";

const Table = styled(Container)`
  margin-left: 10%;
  width: 80%;
`;

const ActionButton = styled(Button)`
  margin: 1%;
  display: inline-block;
  align: left;
`;

const User = ({ residents, deleteUser, updateUser }) => {
  const [resident, setResident] = useState({
    name: "",
    unit: "",
    phone_number: "",
    email: "",
  });

  const columns = [
    {
      dataField: "user_id",
      text: "User id",
      hidden: true,
    },
    {
      dataField: "name",
      text: "name",
      sort: true,
      filter: textFilter({}),
    },
    {
      dataField: "unit",
      text: "Unit",
      filter: textFilter({}),
    },
    {
      dataField: "phone_number",
      text: "phone-number",
    },
    {
      dataField: "email",
      text: "email",
    },
  ];

  const defaultSorted = [
    {
      dataField: "name",
      order: "asc",
    },
  ];

  const selectRow = {
    clickToSelect: true,
    clickToExpand: true,
  };

  const expandRow = {
    onlyOneExpanding: true,

    renderer: (row) => (
      <>
        <ActionButton onClick={() => console.log(resident)}>
          Update
        </ActionButton>
        <ActionButton
          variant="danger"
          onClick={() => {
            alert(`Are you sure you want to delete ${row.name}`);
            deleteUser(row.user_id);
          }}
        >
          Delete
        </ActionButton>
      </>
    ),
  };

  // const onTableChange = (type, newState) => {
  //   console.log("changed");
  // };
  return (
    <Table>
      <BootstrapTable
        striped
        hover
        condensed
        keyField={"user_id"}
        defaultSorted={defaultSorted}
        data={residents}
        columns={columns}
        expandRow={expandRow}
        filter={filterFactory()}
        pagination={paginationFactory()}
        cellEdit={cellEditFactory({
          mode: "dbclick",
          blurToSave: true,

          afterSaveCell: (oldValue, newValue, row, column) => {
            setResident({
              name: row.name,
              unit: row.unit,
              phone_number: row.phone_number,
              email: row.email,
            });
            console.log(row);
          },
        })}
        filterPosition="bottom"
      />
    </Table>
  );
};

export default User;
