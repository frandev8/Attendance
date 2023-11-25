import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import React from "react";

import styles from "./AccountSettings.module.css";
function AccountSettings() {
  return (
    <div>
      <div>
        <Box sx={{ my: 3, mx: 2 }}>
          <div>
            <span>Your Profile Picture</span>
            <div>Edit your profile</div>
          </div>
        </Box>
        <Divider variant="middle" />
        <Box sx={{ m: 2 }}>
          <div className={styles.container}>
            <div className={styles.form_group}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className={styles.form_control}
                id="username"
                name="username"
              />
            </div>
            <div className={styles.form_control}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className={styles.form_control}
                id="email"
                name="email"
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="tel"
                className={styles.form_control}
                id="phone_number"
                name="phone_number"
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="full_name">Full Name</label>
              <input
                type="text"
                className={styles.form_control}
                id="full_name"
                name="full_name"
              />
            </div>
          </div>
        </Box>
      </div>
      <div className="">
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary">
            Update
          </Button>
          <Button color="secondary">Reset</Button>
        </Stack>
      </div>
    </div>
  );
}

export default AccountSettings;
