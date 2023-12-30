import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import {
  Box,
  Heading,
  Input,
  InputLeftElement,
  InputGroup,
  Icon
} from "@chakra-ui/react";
import SearchIcon from "../components/icons/SearchIcon";
//import namesData from "../names.json";
//import namesData from "../1_14_names_enriched.json";
import namesData from "../../src/top_1000_table_data_final.json";

Chart.register(...registerables);

const LineChart = ({ name }) => {
  const [filteredNameData, setFilteredNameData] = useState(null);
  const [filtering, setFiltering] = useState(name); // Use the name prop as the default search value

  useEffect(() => {
    // Load the data for the specified name
    const dataForName = namesData.find((entry) => entry.name === filtering);
    setFilteredNameData(dataForName);

    // Log the name, year, and score data
    //console.log("Name:", filtering);
    //console.log("Year Data:", dataForName?.data.Year);
    //console.log("Score Data:", dataForName?.data.Score);
  }, [filtering, name]);

  const year = filteredNameData?.data.year || [];
  const count = filteredNameData?.data.count || [];

  const chartData = {
    labels: year,
    datasets: [
      {
        label: "", // Empty label to remove legend label
        data: count,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        position: 'bottom',
      },
      y: {
        type: 'linear',
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  return (
    <Line data={chartData} options={options} />
  );
};

export default LineChart;
