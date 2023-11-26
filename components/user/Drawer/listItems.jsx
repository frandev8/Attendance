import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExploreIcon from "@mui/icons-material/Explore";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
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
    isHistory: false,
    isEmployee: false,
    isSetting: false,
    isLogout: true,
  });

  const { isDashboard, isHistory, isSetting, isLogout } = linkActive;

  const handleLinkActive = (property) => {
    setLinkActive({
      isDashboard: property === "dashboard",
      isHistory: property === "history",
      isSetting: property === "settings",
      isLogout: property === "logout",
    });
  };
  return (
    <React.Fragment>
      <NavLink
        onClick={() => handleLinkActive("dashboard")}
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
        onClick={() => handleLinkActive("history")}
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