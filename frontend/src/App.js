import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import JobTable from "./components/JobTable";

function App() {
  return (
    <div>
      <Container>
        <Typography variant="h5" gutterBottom sx={{ textAlign: "left" }}>
          Jobs List
        </Typography>
        <JobTable />
      </Container>
    </div>
  );
}

export default App;
