import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { useSearchParams } from "react-router-dom";

import Grid from "@mui/material/Grid";

import { getPageBanner } from "@/utils/http";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

// import SignIn from "../../components/combine/logsComponents/SignInForm.jsx";
// import { saveAdminId, saveUserId } from "../../src/store/main.js";
// import {
//   saveAdminId as saveAdminIdOnBrowser,
//   saveUserId as saveUserIdOnBrowser,
//   setAdminLoginToken,
//   setUserLoginToken,
// } from "../../utils/auth.js";

import styles from "./IdentityController.module.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export function IdentityController() {
  // TODO remove, this demo shouldn't need to reset the theme

  const defaultTheme = createTheme();

  const { data, isPending } = useQuery({
    queryKey: ["photo", { key: "cover" }],
    queryFn: () => getPageBanner({ id: "65852eb55f470300be649aaa" }),
    staleTime: 0,
  });

  return (
    <>
      <main className={styles.container}>
        <ThemeProvider theme={defaultTheme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={6}
              sx={{
                backgroundImage: `url("${
                  data ? data.url : "../src/assets/images/welcome.jpg"
                }")`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={6}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Kasapa Media
                </Typography>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>

                <Outlet />
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </main>
    </>
  );
}

// //  signup action

// export async function action({ request, dispatch }) {
//   const data = await request.formData();

//   const serverURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

//   const role = data.get("role");

//   const formData = {
//     username: data.get("username"),
//     password: data.get("password"),
//     role: role,
//   };

//   if (role == "employee") {
//     const response = await fetch(`${serverURL}/employee/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     if (!response.ok) {
//       throw json({ msg: "Couldn't fetch data" }, { status: 500 });
//     }

//     const results = await response.json();

//     // store the token as a cookie
//     setUserLoginToken(results.userToken);

//     // store user id to local host
//     saveUserIdOnBrowser(results.userId);

//     dispatch(saveUserId({ userId: results.userId }));

//     return redirect("/user");
//   } else if (role == "admin") {
//     const response = await fetch(`${serverURL}/admin/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     if (!response.ok) {
//       throw json({ msg: "Couldn't fetch data" }, { status: 500 });
//     }

//     const results = await response.json();

//     // store the token as a cookie
//     setAdminLoginToken(results.adminToken);

//     // store admin id to local host
//     saveAdminIdOnBrowser(results.adminId);

//     dispatch(saveAdminId({ adminId: results.adminId }));

//     return redirect("/admin");
//   }
// }
