import React from "react";

import useStyles from "./SettingsPage.style";
export default function SettingsPage() {
  const classes = useStyles();
  return (
    <div className={classes.Settings}>
      <h1>Settings</h1>
    </div>
  );
}
