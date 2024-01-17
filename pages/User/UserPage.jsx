// import { Dashboard } from "@mui/icons-material";

import "./UserPage.css";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import * as React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/user/Drawer/SideBar";
import TopBar from "../../components/user/Header/AppBar";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function UserPage() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopBar toggleDrawer={toggleDrawer} open={open} />
        <SideBar toggleDrawer={toggleDrawer} open={open} />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Outlet />
          {/* <Dashboard /> */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
