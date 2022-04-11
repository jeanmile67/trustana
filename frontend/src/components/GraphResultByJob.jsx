import { useState } from "react";
import _ from "lodash";
import axios from "axios";
import Chart from "react-apexcharts";
import { Card } from "@mui/material";
import ErrorResultList from "./ErrorResultList";

const GraphResultByJob = ({ jobId }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [requestResponse, setRequestResponse] = useState([]);
  const [requestErrorResponse, setRequestErrorResponse] = useState([]);
  const [error, setError] = useState(false);

  if (!error && !isLoaded) {
    axios
      .get(`http://localhost:5000/api/results?jobId=${jobId}`)
      .then(({ data }) => {
        setIsLoaded(true);
        const requestPartition = _.partition(data, { statusCode: 200 });
        const requestOK = requestPartition[0];
        const requestError = requestPartition[1];
        const formatedRequest = _.map(
          requestOK,
          _.partialRight(_.pick, ["duration", "created"])
        );
        setRequestErrorResponse(requestError);
        setRequestResponse(formatedRequest);
      })
      .catch((error) => {
        console.log("error state", error);
        setError(true);
      });
  }

  const chartData = {
    options: {
      chart: {
        id: `duration-bar-${jobId}`,
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

  return (
    <Card>
      {!_.isEmpty(requestResponse) && (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
        />
      )}
      <ErrorResultList errors={requestErrorResponse} />
    </Card>
  );
};

export default GraphResultByJob;
