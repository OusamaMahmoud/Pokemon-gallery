import { Stack, Alert, Typography } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <NavBar />
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Typography variant="h2" gutterBottom>
          Oopps!
        </Typography>
        <Alert severity="error" variant="filled" style={{width:"400px"}}>
          {isRouteErrorResponse(error)
            ? "This page is not exist."
            : "An unexpected error occurred."}
        </Alert>
      </Stack>
    </>
  );
};

export default ErrorPage;
