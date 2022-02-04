import React from "react";
import { Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";

const User = ({ residents, deleteUser, updateUser }) => {
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
      filter: textFilter(),
    },
    {
      dataField: "unit",
      text: "Unit",
      filter: textFilter(),
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
    showExpandColumn: true,
    renderer: (row) => (
      <div>
        <p>{`Delete based on id ${row.user_id}`}</p>
        <Button onClick={deleteUser}> Edit User</Button>
        <Button variant="danger">Delete user</Button>
        <p>!!</p>
      </div>
    ),
  };

  return (
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
      filterPosition="top"
    />
  );
};

export default User;
