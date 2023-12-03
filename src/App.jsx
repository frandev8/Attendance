import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Attendance from "../components/admin/Attendance/Attendance";
import Dashboard from "../components/admin/Dashboard/Dashboard.jsx";
import EmployeeListPage from "../components/admin/Employee/EmployeeList";
import TrackerPage from "../components/admin/Insight/Tracker";
import SettingsPage from "../components/admin/settings/Settings";
import TimeOff from "../components/admin/TimeOff/TimeOff";
import ErrorPage from "../components/combine/Error/ErrorPage";
import AttendanceHistory from "../components/user/Attendance/History";
import UserDashboard from "../components/user/Dashboard/Dashboard";
import UserSettingsPage from "../components/user/settings/Settings";
import {
  default as AdminTimeOffPage,
  default as TimeOffPage,
} from "../components/user/TimeOff/TimeOff";
import { AdminEmailVerifyPage } from "../pages/AdminEmailVerifyPage";
import AdminPage from "../pages/AdminPage";
import AppWrapper from "../pages/AppWrapper";
import { action as loginAction, SignInPage } from "../pages/SignInPage";
import { action as signupAction, SignUpPage } from "../pages/SignUpPage";
import {
  action as confirmPageAction,
  UserEmailVerifyPage,
} from "../pages/UserEmailVerifyPage";
import UserPage from "../pages/UserPage";
import { queryClient } from "../utils/http";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SignInPage />,
        action: loginAction,
      },
      {
        path: "register",
        element: <SignUpPage />,
        action: signupAction,
      },
      {
        path: "user/verify/:id/:token",
        element: <UserEmailVerifyPage />,
      },
      {
        path: "admin/verify/:id/:token",
        element: <AdminEmailVerifyPage />,
      },
      {
        path: "user",
        element: <UserPage />,
        children: [
          { index: true, element: <UserDashboard /> },
          { path: "history", element: <AttendanceHistory /> },
          { path: "settings", element: <UserSettingsPage /> },
          { path: "timeOff", element: <TimeOffPage /> },
        ],
      },
      {
        path: "admin",
        element: <AdminPage />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "confirm-attendance", element: <Attendance /> },
          { path: "timeOff", element: <TimeOff /> },
          { path: "tracker", element: <TrackerPage /> },
          { path: "employee-list", element: <EmployeeListPage /> },
          { path: "settings", element: <SettingsPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
