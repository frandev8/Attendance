import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Attendance from "../components/admin/Attendance/Attendance";
import Dashboard from "../components/admin/Dashboard/Dashboard.jsx";
import EmployeeListPage from "../components/admin/Employee/EmployeeList";
import TrackerPage from "../components/admin/Insight/Tracker";
import AdminSettingsPage, {
  loader as adminSettingLoader,
} from "../components/admin/settings/Settings";
import TimeOff from "../components/admin/TimeOff/TimeOff";
import ErrorPage from "../components/combine/Error/ErrorPage";
import SignIn from "../components/combine/logsComponents/SignInForm.jsx";

import { Navigate } from "react-router-dom";
import AttendanceHistory from "../components/user/Attendance/History";
import UserDashboard from "../components/user/Dashboard/Dashboard";
import UserSettingsPage, {
  loader as userSettingLoader,
} from "../components/user/settings/Settings";
import TimeOffPage from "../components/user/TimeOff/TimeOff";
import AdminPage from "../pages/Admin/AdminPage.jsx";

import { useSelector } from "react-redux";
import { IdentityController } from "../pages/Auth/IdentityController.jsx";
import SignUpController from "../pages/Auth/SignUpController.jsx";
import AdminEmailVerification from "../pages/Email/AdminEmailVerifyPage.jsx";
import UserEmailVerification from "../pages/Email/UserEmailVerifyPage.jsx";
import { SuccessAccountActivation } from "../pages/Results/SuccessfulActivation";

import UserPage from "../pages/User/UserPage.jsx";
import {
  checkAdminLoginTokenLoader,
  checkUserLoginTokenLoader,
} from "../utils/auth.js";
import { queryClient } from "../utils/http";
// action: ({ params, request }) => {
//   loginAction({ request, params, dispatch });
// },

function App() {
  const userId = useSelector((state) => state.user.userId);
  const adminId = useSelector((state) => state.admin.adminId);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/auth" />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/auth/",
      element: <IdentityController />,
      // action: ({ request }) => loginAction({ request, dispatch }),
      children: [
        {
          index: true,
          element: <SignIn />,
        },
        {
          path: "register",
          element: <SignUpController />,
        },
        {
          path: "register/user/verify/:id/:token",
          element: <UserEmailVerification />,
          // element: <>Hello world</>,
        },
        {
          path: "register/user/verify/success/:id/:token",
          element: <SuccessAccountActivation />,
          // element: <>Hello world</>,
        },
        {
          path: "register/admin/verify/:id/:token",
          element: <AdminEmailVerification />,
        },
        {
          path: "register/admin/verify/success/:id/:token",
          element: <SuccessAccountActivation />,
          // element: <>Hello world</>,
        },
      ],
    },
    {
      path: "user",
      element: <UserPage />,
      loader: () => {
        checkUserLoginTokenLoader();
        return userSettingLoader({ id: userId });
      },
      children: [
        {
          index: true,
          element: <UserDashboard />,
          loader: checkUserLoginTokenLoader,
        },
        {
          path: "history",
          element: <AttendanceHistory />,
          loader: checkUserLoginTokenLoader,
        },
        {
          path: "settings",
          element: <UserSettingsPage />,
          loader: () => {
            checkUserLoginTokenLoader();
            return userSettingLoader({ id: userId });
          },
        },
        {
          path: "timeOff",
          element: <TimeOffPage />,
          loader: checkUserLoginTokenLoader,
        },
      ],
    },
    {
      path: "admin",
      element: <AdminPage />,
      loader: () => {
        checkAdminLoginTokenLoader();
        return adminSettingLoader({ id: adminId });
      },

      children: [
        {
          index: true,
          element: <Dashboard />,
          loader: checkAdminLoginTokenLoader,
        },
        {
          path: "attendance",
          element: <Attendance />,
          loader: checkAdminLoginTokenLoader,
        },
        {
          path: "timeOff",
          element: <TimeOff />,
          loader: checkAdminLoginTokenLoader,
        },
        {
          path: "tracker",
          element: <TrackerPage />,
          loader: checkAdminLoginTokenLoader,
        },
        {
          path: "employee-list",
          element: <EmployeeListPage />,
          loader: checkAdminLoginTokenLoader,
        },
        {
          path: "settings",
          element: <AdminSettingsPage />,
          loader: () => {
            checkAdminLoginTokenLoader();
            return adminSettingLoader({ id: adminId });
          },
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
