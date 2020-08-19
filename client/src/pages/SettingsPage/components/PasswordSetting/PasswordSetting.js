import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import PasswordInput from "../../../../components/PasswordInput/PasswordInput";

const PasswordSettings = ({ classes }) => {
  const [passwd, setPasswd] = useState("");
  const [confirmPasswd, setConfirmPasswd] = useState("");
  return (
    <Grid container spacing={3}>
      <Grid item xs={5} className={classes.BlockTitle}>
        <div>New password:</div>
      </Grid>
      <Grid item xs={7}>
        <div>
          <PasswordInput
            value={passwd}
            id="newpswd"
            variant="outlined"
            size="small"
            autoComplete="false"
            className={classes.input}
          />
        </div>
      </Grid>
      <Grid item xs={5} className={classes.BlockTitle}>
        <div>Confirm new password:</div>
      </Grid>
      <Grid item xs={7}>
        <PasswordInput
          id="newpswdconfirm"
          variant="outlined"
          type="text"
          size="small"
          autocomplete="false"
          className={classes.input}
        />
      </Grid>
    </Grid>
  );
};

export default PasswordSettings;
