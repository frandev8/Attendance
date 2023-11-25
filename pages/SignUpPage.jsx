import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";

import Grid from "@mui/material/Grid";

import Link from "@mui/material/Link";

import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { json, redirect } from "react-router-dom";

import SignUp from "../components/combine/logsComponents/SignUp";
import { create } from "../utils/SigningIn";
import styles from "./SignUpPage.module.css";

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

export function SignUpPage() {
  // TODO remove, this demo shouldn't need to reset the theme

  const defaultTheme = createTheme();

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
                backgroundImage: `url("../src/assets/images/welcome.jpg")`,
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
                  Dave Multimedia
                </Typography>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>

                <SignUp></SignUp>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </main>
    </>
  );
}

// action function from react-router-doms

export async function action({ request }) {
  const data = await request.formData();

  const role = data.get("role");

  const formData = {
    username: data.get("username"),
    email: data.get("email"),
    password: data.get("password"),
    role: role,
  };

  if (role == "employee") {
    const response = await fetch("http://localhost:3000/employee/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw json({ msg: "Couldn't fetch data" }, { status: 500 });
    }

    return response;
  } else if (role == "admin") {
    const response = await fetch("http://localhost:3000/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw json({ msg: "Couldn't fetch data" }, { status: 500 });
    }

    return response;
  }
}
