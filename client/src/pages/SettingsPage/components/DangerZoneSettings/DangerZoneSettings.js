import React from "react";
import { Paper, Grid } from "@material-ui/core";

const DangerZoneSettings = () => {
  return (
    <Paper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          Delete all progress
        </Grid>
        <Grid item xs={12}>
          Delete all tasks
        </Grid>
        <Grid item xs={12}>
          Delete my account
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DangerZoneSettings;
