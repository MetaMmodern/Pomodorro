import React from "react";

import useStyles from "./SettingsPage.style";
import WorkSettings from "./components/WorkSettings/WorkSettings";
import AccountSettings from "./components/AccountSettings/AccountSettings";

import DangerZoneSettings from "./components/DangerZoneSettings/DangerZoneSettings";
import { Grid } from "@material-ui/core";

export default function SettingsPage() {
  const classes = useStyles();
  return (
    <div className={classes.Settings}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2 className={classes.settingTitle}>Work settings</h2>
          <WorkSettings />
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <h2 className={classes.settingTitle}>Account Settings</h2>
          <AccountSettings />
        </Grid>
        <Grid item xs={12} md={3} lg={2}>
          <h2 className={classes.settingTitle}>Danger Zone</h2>
          <DangerZoneSettings />
        </Grid>
      </Grid>
    </div>
  );
}
