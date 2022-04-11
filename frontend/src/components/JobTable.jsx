import { useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const JobTable = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);

  if (!error && !isLoaded) {
    console.log("inside error", error);
    axios
      .get("http://localhost:5000/api/jobs")
      .then(({ data }) => {
        setIsLoaded(true);
        setJobs(data);
      })
      .catch((error) => {
        setError(true);
        console.log("error state", error);
      });
  }

  return isLoaded ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>_id</TableCell>
            <TableCell>name</TableCell>
            <TableCell>lastRunAt</TableCell>
            <TableCell>nextRunAt</TableCell>
            <TableCell>repeatInterval</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow
              key={job._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {job._id}
              </TableCell>
              <TableCell>{job.name}</TableCell>
              <TableCell>{job.lastRunAt}</TableCell>
              <TableCell>{job.nextRunAt}</TableCell>
              <TableCell>{job.repeatInterval}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>_id</TableCell>
            <TableCell>name</TableCell>
            <TableCell>lastRunAt</TableCell>
            <TableCell>nextRunAt</TableCell>
            <TableCell>repeatInterval</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              No Data
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobTable;
