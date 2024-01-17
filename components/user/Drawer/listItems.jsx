import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ExploreIcon from "@mui/icons-material/Explore";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import * as React from "react";

import { Link, NavLink, useLocation } from "react-router-dom";
import { deleteUserId } from "../../../utils/auth";
import "./listItems.css";

export function MainListItems() {
  const location = useLocation();
  const pathname = location.pathname.split("/")[2];

  const linkActive = {
    isDashboard: !pathname || pathname === "",
    isHistory: pathname === "history",
    isSetting: pathname === "settings",
    isLogout: pathname === "logout",
    isTimeOff: pathname === "timeOff",
  };
  const { isDashboard, isHistory, isSetting, isTimeOff, isLogout } = linkActive;

  const handleLogOut = () => {
    deleteUserId();
  };
  return (
    <React.Fragment>
      <NavLink
        to="/user/"
        className={({ isActive }) =>
          isDashboard || isActive ? "active" : undefined
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon sx={{ color: isDashboard ? "blue" : "" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </NavLink>

      <NavLink
        to="history"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        <ListItemButton>
          <ListItemIcon>
            <ExploreIcon sx={{ color: isHistory ? "blue" : "" }} />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItemButton>
      </NavLink>
      <NavLink
        to="timeOff"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        <ListItemButton>
          <ListItemIcon>
            <EventBusyIcon sx={{ color: isTimeOff ? "blue" : "" }} />
          </ListItemIcon>
          <ListItemText primary="Leave" />
        </ListItemButton>
      </NavLink>
      <NavLink
        to="settings"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon sx={{ color: isSetting ? "blue" : "" }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </NavLink>
      <Link to="/" onClick={handleLogOut}>
        <ListItemButton>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
}

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
