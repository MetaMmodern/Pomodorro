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
      <h2 className={classes.settingTitle}>Work settings</h2>
      <WorkSettings />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={8}>
          <h2 className={classes.settingTitle}>Account Settings</h2>
          <AccountSettings />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <h2 className={classes.settingTitle}>Danger Zone</h2>
          <DangerZoneSettings />
        </Grid>
      </Grid>
    </div>
  );
}
