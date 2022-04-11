import { useState } from "react";
import _ from "lodash";
import axios from "axios";
import Chart from "react-apexcharts";
import { Card } from "@mui/material";

const GraphResultByJob = (jobId) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [requestResponse, setRequestResponse] = useState([]);
  const [error, setError] = useState(false);

  if (!error && !isLoaded) {
    console.log("inside error", error);
    axios
      .get("http://localhost:5000/api/results?jobId=6253df686c135c57e9f297c4")
      .then(({ data }) => {
        setIsLoaded(true);
        console.log(data);
        const formatedData = _.map(
          data,
          _.partialRight(_.pick, ["duration", "created"])
        );
        setRequestResponse(formatedData);
      })
      .catch((error) => {
        console.log("error state", error);
        setError(true);
      });
  }

  const chartData = {
    options: {
      chart: {
        id: `duration-bar-`,
      },
      xaxis: {
        type: "datetime",
        categories: _.map(requestResponse, "created"),
      },
    },
    series: [
      {
        name: "duration",
        data: _.map(requestResponse, "duration"),
      },
    ],
  };

  console.log(requestResponse);
  return (
    <Card>
      <Chart options={chartData.options} series={chartData.series} type="bar" />
    </Card>
  );
};

export default GraphResultByJob;
