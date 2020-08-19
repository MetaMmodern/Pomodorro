import React from "react";
import { Grid, TextField } from "@material-ui/core";
const UsernameSetting = ({ classes }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={5} className={classes.BlockTitle}>
        <div>Current username:</div>
      </Grid>
      <Grid item xs={7}>
        <div className={classes.currentUsername}>
          <TextField
            id="currentUsername"
            variant="outlined"
            type="text"
            size="small"
            value={"meta"}
            disabled={true}
            className={classes.input}
          />
        </div>
      </Grid>
      <Grid item xs={5} className={classes.BlockTitle}>
        <div>New username:</div>
      </Grid>
      <Grid item xs={7}>
        <TextField
          id="newUsername"
          variant="outlined"
          type="text"
          size="small"
          autoComplete="off"
          className={classes.input}
        />
      </Grid>
    </Grid>
  );
};

export default UsernameSetting;
