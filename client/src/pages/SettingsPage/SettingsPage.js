import React, { useState } from "react";

import useStyles from "./SettingsPage.style";
import WorkSettings from "../../components/WorkSettings/WorkSettings";
import AccountSettings from "../../components/AccountSettings/AccountSettings";
export default function SettingsPage() {
  const classes = useStyles();
  return (
    <div className={classes.Settings}>
      <WorkSettings />
      <AccountSettings />
    </div>
  );
}
