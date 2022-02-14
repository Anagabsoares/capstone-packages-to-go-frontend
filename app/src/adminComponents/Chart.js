import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import axios from "axios";

import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const ChartContainer = styled(Container)`
  margin-left: -10%;
`;

const Chart = () => {
  const { getAccessTokenSilently } = useAuth0();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [data, setData] = useState([
    { name: "packages", pending: "", delivered: "", requested: "" },
  ]);

  useEffect(() => {
    const getAllPackages = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(`${serverUrl}/packages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        let pending = 0;
        let delivered = 0;
        let requested = 0;
        // add time limit
        response.data.forEach((item) => {
          if (item.delivery_date !== "pending") {
            delivered += 1;
          } else if (item.status && item.delivery_date === "pending") {
            requested += 1;
          } else if (item.delivery_date === "pending") {
            pending += 1;
          } else {
            return;
          }
        });

        setData([
          { delivered: delivered, requested: requested, pending: pending },
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPackages();
  }, [getAccessTokenSilently]);

  return (
    <ChartContainer>
      <BarChart width={600} height={280} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="delivered" fill="#B5179E" />
        <Bar dataKey="requested" fill="#7209B7" />
        <Bar dataKey="pending" fill="#3A0CA3" />
      </BarChart>
    </ChartContainer>
  );
};
export default Chart;
