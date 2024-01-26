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
import { fetchAdminById, getAdminAvatar } from "../../../utils/http";

import { capitalizeFirstLetter } from "../../../utils/typography";

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
  const adminId = useSelector((state) => state.admin.adminId);

  const { data: personalData } = useQuery({
    queryKey: ["admin", { details: "personal" }],
    queryFn: () => fetchAdminById({ id: adminId }),
  });

  const { data: adminImage, isPending } = useQuery({
    queryKey: ["admin", { key: "avatar" }],
    queryFn: () => getAdminAvatar({ id: adminId }),
  });

  const adminName = capitalizeFirstLetter(personalData.firstname);


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
            <span className="tw-text-ssm">{adminName}</span>
            <Divider type="vertical" />
            {adminImage?.url ? (
              <Avatar src={<img src={adminImage.url} alt="avatar" />} />
            ) : (
              <Avatar
                style={{
                  backgroundColor: "#87d068",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {adminName[0]}
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
