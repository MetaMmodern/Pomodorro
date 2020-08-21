import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Paper, Grid, Button } from "@material-ui/core";
import useStyles from "./DangerZoneSettings.style";
import SubmitDiaolog from "../SubmitDialog/SubmitDiaolog";
import { AuthContext } from "../../../../context/auth.context";
import { useHttp } from "../../../../hooks/http.request";
const DangerZoneSettings = () => {
  const classes = useStyles();
  const history = useHistory();
  const [action, setAction] = useState(0);
  const [text, setText] = useState("");

  const [submitPasswd, setSubmitPasswd] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogError, setDialogError] = useState(false);
  const [dialogHelperText, setDialogHelperText] = useState("");
  const { token, logout, setNotification } = useContext(AuthContext);
  const { loading, request } = useHttp();
  const handleSave = async () => {
    switch (action) {
      case 0:
        await handleDeleteProgress();
        break;
      case 1:
        await handleDeleteTasks();
        break;
      case 2:
        await handleDeleteAccount();
        break;
      default:
        break;
    }
  };
  const handleDeleteProgress = async () => {
    try {
      setDialogError(false);
      const data = await request(
        "/api/settings/delete/progress",
        "POST",
        { submitPasswd },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setNotification({ open: true, message: data.message });

      setDialogOpen(false);
    } catch (error) {
      setDialogError(true);
      setDialogHelperText(error.message);
    }
  };
  const handleDeleteTasks = async () => {
    try {
      setDialogError(false);
      const data = await request(
        "/api/settings/delete/tasks",
        "POST",
        { submitPasswd },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setNotification({ open: true, message: data.message });

      setDialogOpen(false);
    } catch (error) {
      setDialogError(true);
      setDialogHelperText(error.message);
    }
  };
  const handleDeleteAccount = async () => {
    try {
      setDialogError(false);
      const data = await request(
        "/api/settings/delete/account",
        "POST",
        { submitPasswd },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setNotification({ open: true, message: data.message });

      logout();
      history.push("/login");
    } catch (error) {
      setDialogError(true);
      setDialogHelperText(error.message);
    }
  };
  const deleteProgressClick = () => {
    setText("Deleting progress");
    setDialogOpen(true);
    setAction(0);
  };
  const deleteTasksClick = () => {
    setText("Deleting tasks");
    setDialogOpen(true);
    setAction(1);
  };
  const deleteAccountClick = () => {
    setText("Deleting account");
    setDialogOpen(true);
    setAction(2);
  };

  return (
    <>
      <Paper className={classes.fullPaper}>
        <Grid
          container
          spacing={4}
          className={classes.container}
          justify="space-between"
        >
          <Grid item xs={12} sm={4} md={12} className={classes.buttonCell}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={deleteProgressClick}
              disabled={loading}
            >
              Delete all progress
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={12} className={classes.buttonCell}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={deleteTasksClick}
              disabled={loading}
            >
              Delete all tasks
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={12} className={classes.buttonCell}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={deleteAccountClick}
              disabled={loading}
            >
              Delete my account
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <SubmitDiaolog
        saving={loading}
        value={submitPasswd}
        changeValue={(e) => setSubmitPasswd(e.target.value)}
        text={text}
        open={dialogOpen}
        onSubmit={handleSave}
        handleClose={() => {
          setDialogOpen(false);
        }}
        error={dialogError}
        helperText={dialogHelperText}
      />
    </>
  );
};

export default DangerZoneSettings;
