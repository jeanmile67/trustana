import { formatTime } from "../utils/time";

const ErrorResultList = ({ errors }) => {
  return errors.map((error) => (
    <li>
      Error for {error.url} at {formatTime(error.created)} with{" "}
      {error.statusCode} ({error.statusText})
    </li>
  ));
};

export default ErrorResultList;
