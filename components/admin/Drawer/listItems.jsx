import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import SettingsIcon from "@mui/icons-material/Settings";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import * as React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./listItems.css";

export function MainListItems() {
  const [linkActive, setLinkActive] = useState({
    isDashboard: true,
    isConfirm: false,
    isEmployee: false,
    isSetting: false,
    isLogout: true,
    isTimeOff: true,
  });

  const { isDashboard, isConfirm, isEmployee, isSetting, isTimeOff, isLogout } =
    linkActive;

  const handleLinkActive = (property) => {
    setLinkActive({
      isDashboard: property === "dashboard",
      isConfirm: property === "confirm",
      isEmployee: property === "employees",
      isSetting: property === "settings",
      isLogout: property === "logout",
    });
  };
  return (
    <React.Fragment>
      <NavLink
        onClick={() => handleLinkActive("dashboard")}
        to="/admin/"
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
        to="confirm-attendance"
        onClick={() => handleLinkActive("confirm")}
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        <ListItemButton>
          <ListItemIcon>
            <ScheduleSendIcon sx={{ color: isConfirm ? "blue" : "" }} />
          </ListItemIcon>
          <ListItemText primary="Attendance" />
        </ListItemButton>
      </NavLink>
      <NavLink
        to="timeOff"
        onClick={() => handleLinkActive("timeOff")}
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
        onClick={() => handleLinkActive("employees")}
        to="employee-list"
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon sx={{ color: isEmployee ? "blue" : "" }} />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItemButton>
      </NavLink>
      <NavLink
        onClick={() => handleLinkActive("settings")}
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
      <Link to="/">
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
