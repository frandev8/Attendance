import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import "./AdminPage.css";

import { Outlet } from "react-router-dom";
import SideBar from "../../components/admin/Drawer/SideBar";
import TopBar from "../../components/admin/Header/AppBar";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AdminPage() {
  const [open, setOpen] = useState(false);
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  const toggleDrawer = () => {
    if (window.innerWidth <= 600) {
      setIsSideBarVisible(true);
    }

    if (isSideBarVisible && window.innerWidth > 600) {
      setOpen((prev) => !prev);
    }
    if (isSideBarVisible && window.innerWidth < 600) {
      setIsSideBarVisible(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        console.log("called");
        setIsSideBarVisible(true);
      } else {
        setIsSideBarVisible(false);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth > 600) {
      setIsSideBarVisible(true);
    } else {
      setIsSideBarVisible(false);
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopBar toggleDrawer={toggleDrawer} open={open} />
        {isSideBarVisible && (
          <SideBar toggleDrawer={toggleDrawer} open={open} />
        )}

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
        </Box>
      </Box>
    </ThemeProvider>
  );
}
