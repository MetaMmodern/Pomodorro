import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import PasswordInput from "../../../../components/PasswordInput/PasswordInput";

const PasswordSettings = (props) => {
  const [passwordLength, setPasswordsLength] = useState(true);
  const [passwordsEqual, setPasswordsEqual] = useState(true);

  useEffect(() => {
    if (props.newPasswd !== "" || props.newPasswdConfirm !== "") {
      if (props.newPasswd === props.newPasswdConfirm) {
        setPasswordsEqual(true);
      } else {
        setPasswordsEqual(false);
      }
    }
  }, [props.newPasswd, props.newPasswdConfirm]);

  useEffect(() => {
    if (props.newPasswd !== "") {
      if (props.newPasswd.length < 6) {
        setPasswordsLength(false);
      } else {
        setPasswordsLength(true);
      }
    } else {
      if (props.newPasswdConfirm === "") {
        setPasswordsLength(true);
        setPasswordsEqual(true);
      }
    }
  }, [props.newPasswd, props.newPasswdConfirm]);

  useEffect(() => {
    if (passwordLength && passwordsEqual) {
      props.setSaveDisabled(false);
    } else {
      props.setSaveDisabled(true);
    }
  }, [passwordLength, passwordsEqual, props.setSaveDisabled]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={5} className={props.classes.BlockTitle}>
        <div>New password:</div>
      </Grid>
      <Grid item xs={7}>
        <div>
          <PasswordInput
            value={props.newPasswd}
            handleValueChange={(e) => props.setNewPasswd(e.target.value)}
            error={!passwordLength}
            helperText={!passwordLength ? "6 symbols minimum" : ""}
            variant="outlined"
            size="small"
            autoComplete="off"
            className={props.classes.input}
          />
        </div>
      </Grid>
      <Grid item xs={5} className={props.classes.BlockTitle}>
        <div>Confirm new password:</div>
      </Grid>
      <Grid item xs={7}>
        <PasswordInput
          value={props.newPasswdConfirm}
          handleValueChange={(e) => props.setNewPasswdConfirm(e.target.value)}
          error={!passwordsEqual}
          helperText={!passwordsEqual ? "Password are not equal" : ""}
          variant="outlined"
          type="text"
          size="small"
          autoComplete="off"
          className={props.classes.input}
        />
      </Grid>
    </Grid>
  );
};

export default PasswordSettings;
