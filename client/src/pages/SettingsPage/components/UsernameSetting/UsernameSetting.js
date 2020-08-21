import React, { useContext } from "react";
import { Grid, TextField } from "@material-ui/core";
import { AuthContext } from "../../../../context/auth.context";
const UsernameSetting = (props) => {
  const { username } = useContext(AuthContext);
  return (
    <Grid container spacing={3}>
      <Grid item xs={5} className={props.classes.BlockTitle}>
        <div>Current username:</div>
      </Grid>
      <Grid item xs={7}>
        <div className={props.classes.currentUsername}>
          <TextField
            variant="outlined"
            type="text"
            size="small"
            value={username}
            disabled={true}
            className={props.classes.input}
          />
        </div>
      </Grid>
      <Grid item xs={5} className={props.classes.BlockTitle}>
        <div>New username:</div>
      </Grid>
      <Grid item xs={7}>
        <TextField
          variant="outlined"
          value={props.newUsername}
          onChange={props.setValue}
          type="text"
          size="small"
          autoComplete="off"
          className={props.classes.input}
        />
      </Grid>
    </Grid>
  );
};

export default UsernameSetting;
