import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { CssBaseline } from "@mui/material";

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
