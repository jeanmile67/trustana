import { useState } from "react";
import axios from "axios";
import { formatTime } from "../utils/time";

const ErrorResultList = ({ jobId }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorList, seterrorList] = useState([]);
  const [error, setError] = useState(false);

  if (!error && !isLoaded) {
    axios
      .get(`http://localhost:5000/api/results/errorsByJob?jobId=${jobId}`)
      .then(({ data }) => {
        setIsLoaded(true);
        seterrorList(data);
      })
      .catch((error) => {
        console.log("error state", error);
        setError(true);
      });
  }

  return (
    errorList &&
    errorList.map((error) => (
      <li>
        Error for job #{error.agendaJobId} at {formatTime(error.created)} with{" "}
        {error.error})
      </li>
    ))
  );
};

export default ErrorResultList;
