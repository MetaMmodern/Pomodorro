import React from "react";
import { Paper, Grid } from "@material-ui/core";
import SaveSettingsButton from "../SaveSettingsButton/SaveSettingsButton";

const AccountSettings = () => {
  return (
    <Paper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          Change username
        </Grid>
        <Grid item xs={12}>
          Change password
        </Grid>
        <Grid item xs={12}>
          <SaveSettingsButton
            globalError={["globalError"]}
            // restTimeError={restTime.error}
            // workTimeError={workTime.error}
            // onSave={handleSave}
            // disabledOnSave={saving}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AccountSettings;
