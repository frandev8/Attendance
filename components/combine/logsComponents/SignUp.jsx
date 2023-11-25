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
  redirect,
  useActionData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import { validateSignup } from "../../../utils/signinValidate";

function SignUp() {
  const [role, setRole] = useState("");
  const response = useActionData();
  const navigate = useNavigate();
  // const submit = useSubmit();

  const submit = useSubmit();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formData = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPass: data.get("confirm_password"),
      role: role,
    };

    const { error } = validateSignup(formData);

    if (error) {
      console.log(error.details[0].message);
      return;
    }

    console.log({
      username: data.get("username"),
      password: data.get("password"),
      email: data.get("email"),
      role: role,
    });

    submit({ ...formData }, { method: "POST" });
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  if (response && response.error) {
    console.log(response.error, "sign up");
  } else if (response?.msg) {
    // alert(response.msg);
    navigate("/");
  }
  return (
    <>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>

      <form method="post" onSubmit={handleSubmit}>
        {/* <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}> */}
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="email"
          name="email"
          autoComplete="email"
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
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirm_password"
          label="Confirm Password"
          type="confirm_password"
          id="confirm_password"
          autoComplete="current-password"
        />

        <FormControl fullWidth>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select"
            id="role"
            value={role}
            label="role"
            onChange={handleChange}
          >
            <MenuItem value={"employee"}>User</MenuItem>
            <MenuItem value={"admin"}>Admin</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs>
            {/* <Link href="#" variant="body2">
              Forgot password?
            </Link> */}
          </Grid>
          <Grid item>
            <RRLink to={"/"}>{"Already have an account? Sign In"}</RRLink>
          </Grid>
        </Grid>
        {/* </Box> */}
      </form>
    </>
  );
}

SignUp.propTypes = {
  moveToSignIn: PropTypes.func,
};
export default SignUp;
