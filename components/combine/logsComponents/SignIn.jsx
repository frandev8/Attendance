import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  Form,
  Link as RRLink,
  useActionData,
  useSubmit,
} from "react-router-dom";
import { validateLogin } from "../../../utils/signinValidate";

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

export default function SignIn() {
  const [role, setRole] = useState("");
  // const response = useActionData();
  // const submit = useSubmit();

  const submit = useSubmit();

  function handleForm(e) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const formData = {
      username: data.get("username"),
      password: data.get("password"),
      role: role,
    };

    const { error } = validateLogin(formData);
    if (error) {
      console.log(error.details[0].message);
      return;
    }

    console.log(formData);

    submit({ ...formData }, { method: "GET" });
    console.log("I was called!");
  }

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  // if (response && response.error) {
  //   console.log(response.error, "signin");
  // }

  return (
    <>
      <div>
        <Form method="post">
          {/* <Box component="form" noValidate onSubmit={handleForm} sx={{ mt: 1 }}> */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <FormControl fullWidth>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select"
              id="role"
              value={role}
              name="role"
              label="role"
              onChange={handleChange}
            >
              <MenuItem value={"employee"}>user</MenuItem>
              <MenuItem value={"admin"}>admin</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <RRLink to={"register"}>
                {"Don't have an account? Sign Up"}
              </RRLink>
            </Grid>
          </Grid>
          <Copyright sx={{ mt: 5 }} />
          {/* </Box> */}
        </Form>
      </div>
    </>
  );
}

SignIn.propTypes = {
  moveToSignUp: PropTypes.func,
};
