import React from "react";
import { Paper, Grid, Button } from "@material-ui/core";
import useStyles from "./DangerZoneSettings.style";
const DangerZoneSettings = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.fullPaper}>
      <Grid
        container
        spacing={4}
        className={classes.container}
        justify="space-between"
      >
        <Grid item xs={12} sm={4} md={12} className={classes.buttonCell}>
          <Button variant="outlined" color="secondary">
            Delete all progress
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={12} className={classes.buttonCell}>
          <Button variant="outlined" color="secondary">
            Delete all tasks
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={12} className={classes.buttonCell}>
          <Button variant="outlined" color="secondary">
            Delete my account
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DangerZoneSettings;
