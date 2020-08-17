import React, { useState } from "react";
import { Paper, Grid } from "@material-ui/core";
import SaveSettingsButton from "../SaveSettingsButton/SaveSettingsButton";

import useStyles from "./AccountSettings.style";
import UsernameSetting from "../UsernameSetting/UsernameSetting";
import PasswordSettings from "../PasswordSetting/PasswordSetting";
const AccountSettings = () => {
  const classes = useStyles();
  const [saving, setSaving] = useState(false);
  const [globalError, setGlobalError] = useState([]);
  const handleSave = () => {
    setSaving(true);
    setGlobalError(["saving..."]);
    setTimeout(() => {
      setSaving(false);
      console.log("saved");
      setGlobalError([]);
    }, 2000);
  };
  return (
    <Paper>
      <form>
        <Grid container spacing={4} className={classes.container}>
          <Grid item xs={12} lg={6} className={classes.changeBlock}>
            <h3>Change username</h3>
            <UsernameSetting classes={classes} />
          </Grid>
          <Grid item xs={12} lg={6} className={classes.changeBlock}>
            <h3>Change password</h3>
            <PasswordSettings classes={classes} />
          </Grid>
          <Grid item xs={12}>
            <SaveSettingsButton
              globalError={globalError}
              onSave={handleSave}
              disabled={Boolean(globalError.length) || saving}
              saving={saving}
            />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AccountSettings;
