import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MuiAppBar from "@mui/material/AppBar";
// import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Avatar, Badge, Divider, List, Popover } from "antd";
import PropTypes from "prop-types";
import React from "react";
import ViewNotification from "../Notification/ViewNotification";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function TopBar({ toggleDrawer, open }) {
  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "8px",
          backgroundColor: "green",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "16px",
            maxWidth: "50px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Dashboard
        </Typography>

        <div className="flex items-center">
          {/* {!open && <SearchOutlined />} */}
          <Divider type="vertical" />
          <ViewNotification />
          <Divider type="vertical" />
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  toggleDrawer: PropTypes.func,
  open: PropTypes.bool,
};
export default TopBar;
