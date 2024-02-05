import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MuiAppBar from "@mui/material/AppBar";
// import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Badge, Divider, List, Popover } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchEmployeesById, getEmployeeAvatar } from "../../../utils/http";
import { capitalizeFirstLetter } from "../../../utils/typography";
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
  const userId = useSelector((state) => state.user.userId);

  const location = useLocation();
  let pathname = location.pathname.split("/")[2];

  const { data: personalData } = useQuery({
    queryKey: ["employee", { details: "personal" }],
    queryFn: () => fetchEmployeesById({ id: userId }),
  });

  const { data: userImage, isPending } = useQuery({
    queryKey: ["employee", { key: "avatar" }],
    queryFn: () => getEmployeeAvatar({ id: userId }),
    // staleTime: 0,
  });

  const userName = capitalizeFirstLetter(personalData.firstname);

  if (pathname === "history") {
    pathname = "attendance";
  } else if (pathname === "" || !pathname) {
    pathname = "dashboard";
  }

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
        <div className="tw-w-full tw-flex tw-items-center">
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {capitalizeFirstLetter(pathname)}
          </Typography>

          <div className="tw-flex tw-items-center">
            {/* {!open && <SearchOutlined />} */}
            <Divider type="vertical" />
            <ViewNotification />
            <Divider type="vertical" />
            <span className="tw-text-ssm">{userName}</span>
            <Divider type="vertical" />
            {userImage?.url ? (
              <Avatar src={<img src={userImage.url} alt="avatar" />} />
            ) : (
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
            )}
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
