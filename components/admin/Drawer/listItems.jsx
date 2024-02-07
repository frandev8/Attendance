import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import SettingsIcon from "@mui/icons-material/Settings";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import * as React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { deleteAdminId, deleteAdminLoginToken } from "../../../utils/auth";

import "./listItems.css";

export function MainListItems() {
  const location = useLocation();
  const pathname = location.pathname.split("/")[2];

  const linkActive = {
    isDashboard: !pathname || pathname === "",
    isConfirm: pathname === "attendance",
    isSetting: pathname === "settings",
    isTimeOff: pathname === "timeOff",
    isLogout: pathname === "logout",
  };
  const { isDashboard, isConfirm, isEmployee, isSetting, isTimeOff, isLogout } =
    linkActive;

  const handleLogOut = () => {
    deleteAdminId();
    deleteAdminLoginToken();
  };

  return (
    <React.Fragment>
      <NavLink
        to="/admin/"
        className={({ isActive }) =>
          isDashboard || isActive ? "active" : undefined
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon sx={{ color: isDashboard ? "#5295E3" : "" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </NavLink>
      <NavLink
        to="attendance"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        <ListItemButton>
          <ListItemIcon>
            <ScheduleSendIcon sx={{ color: isConfirm ? "#5295E3" : "" }} />
          </ListItemIcon>
          <ListItemText primary="Attendance" />
        </ListItemButton>
      </NavLink>
      <NavLink
        to="timeOff"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        <ListItemButton>
          <ListItemIcon>
            <EventBusyIcon sx={{ color: isTimeOff ? "#5295E3" : "" }} />
          </ListItemIcon>
          <ListItemText primary="Leave" />
        </ListItemButton>
      </NavLink>
      <NavLink
        to="employee-list"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon sx={{ color: isEmployee ? "#5295E3" : "" }} />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItemButton>
      </NavLink>
      <NavLink
        to="settings"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon sx={{ color: isSetting ? "#5295E3" : "" }} />
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
