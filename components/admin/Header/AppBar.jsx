import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Divider, List, Popover } from "antd";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { getAdminAvatar } from "../../../utils/http";

import { capitalizeFirstLetter } from "../../../utils/typography";

import React from "react";

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
  const loaderData = useLoaderData();

  const adminId = useSelector((state) => state.admin.adminId);

  const { data: userImage, isPending } = useQuery({
    queryKey: ["employee", { key: "avatar" }],
    queryFn: () => getAdminAvatar({ id: adminId }),
    // staleTime: 0,
  });

  const userName = capitalizeFirstLetter(loaderData.firstname);

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "14px",
          backgroundColor: "green",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            maxWidth: "50px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <div className="tw-w-full tw-flex tw-border-2 tw-border-black tw-items-center">
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>

          <div className="tw-flex tw-items-center">
            <Divider type="vertical" />
            <span className="tw-text-ssm">{userName}</span>
            <Divider type="vertical" />
            <Avatar
              style={{
                backgroundColor: "#87d068",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {userName[0]}
            </Avatar>
          </div>
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
