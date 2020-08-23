import React, { useState, useContext } from "react";
import { Paper, Grid } from "@material-ui/core";
import SaveSettingsButton from "../SaveSettingsButton/SaveSettingsButton";
import { useHistory } from "react-router-dom";

import useStyles from "./AccountSettings.style";
import UsernameSetting from "../UsernameSetting/UsernameSetting";
import PasswordSetting from "../PasswordSetting/PasswordSetting";
import SubmitDiaolog from "../SubmitDialog/SubmitDiaolog";
import { AuthContext } from "../../../../context/auth.context";
import { useHttp } from "../../../../hooks/http.request";

const AccountSettings = () => {
  const classes = useStyles();
  const history = useHistory();
  const [newUsername, setNewUsername] = useState("");
  const [newPasswd, setNewPasswd] = useState("");
  const [newPasswdConfirm, setNewPasswdConfirm] = useState("");

  const [saving, setSaving] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(false);
  const [submitPasswd, setSubmitPasswd] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { token, logout, setNotification } = useContext(AuthContext);
  const { loading, request } = useHttp();
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const data = await request(
        "/api/settings/update/account",
        "POST",
        { newUsername, newPasswd, submitPasswd },
        { Authorization: `Bearer ${token}` }
      );
      setNotification({
        open: true,
        message: data.message,
      });
      setSaving(false);
      setDialogOpen(false);

      logout();
      history.push("/login");
    } catch (error) {
      console.log(error);
      setSaving(false);
    }
  };
  return (
    <>
      <Paper>
        <Grid
          container
          spacing={4}
          className={classes.container}
          component={"form"}
          autoComplete="off"
        >
          <Grid item xs={12} lg={6} className={classes.changeBlock}>
            <h3>Change username</h3>
            <UsernameSetting
              classes={classes}
              value={newUsername.value}
              setValue={(e) => setNewUsername(e.target.value)}
              error={newUsername.error}
            />
          </Grid>
          <Grid item xs={12} lg={6} className={classes.changeBlock}>
            <h3>Change password</h3>
            <PasswordSetting
              classes={classes}
              newPasswd={newPasswd}
              setNewPasswd={setNewPasswd}
              newPasswdConfirm={newPasswdConfirm}
              setNewPasswdConfirm={setNewPasswdConfirm}
              setSaveDisabled={setSaveDisabled}
            />
          </Grid>
          <Grid item xs={12} className={classes.saveContainer}>
            <SaveSettingsButton
              globalError={[]}
              onSave={handleDialogOpen}
              disabled={saveDisabled}
              saving={saving}
            />
          </Grid>
        </Grid>
      </Paper>
      <SubmitDiaolog
        saving={loading}
        value={submitPasswd}
        changeValue={(e) => setSubmitPasswd(e.target.value)}
        text={
          "You are changing your account settings. Please, confirm your actions by typing your current password below:"
        }
        open={dialogOpen}
        onSubmit={handleSave}
        handleClose={() => {
          setSaving(false);
          setDialogOpen(false);
        }}
      />
    </>
  );
};

export default AccountSettings;
