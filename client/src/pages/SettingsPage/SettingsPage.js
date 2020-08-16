import React from "react";

import useStyles from "./SettingsPage.style";
import WorkSettings from "./components/WorkSettings/WorkSettings";
import AccountSettings from "./components/AccountSettings/AccountSettings";

import DangerZoneSettings from "./components/DangerZoneSettings/DangerZoneSettings";

export default function SettingsPage() {
  const classes = useStyles();
  return (
    <div className={classes.Settings}>
      <h2 className={classes.settingTitle}>Work settings</h2>
      <WorkSettings />

      <h2 className={classes.settingTitle}>Account Settings</h2>
      <AccountSettings />

      <h2 className={classes.settingTitle}>Danger Zone</h2>
      <DangerZoneSettings />
    </div>
  );
}
