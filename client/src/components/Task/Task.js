import React from "react";
import { Grid, Paper, makeStyles, IconButton } from "@material-ui/core";
import { Edit, Delete, PlayArrow } from "@material-ui/icons";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useHttp } from "../../hooks/http.request";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
  },
}));
export default function Task(props) {
  const classes = useStyles();
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const deleteTask = async () => {
    try {
      const data = await request(
        `/api/tasks/delete/${props.id}/`,
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      await props.updateTasks();
    } catch (error) {}
  };

  return (
    <Grid item>
      <Paper className={classes.paper} elevation={2}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minWidth: "10rem",
            minHeight: "5rem",
          }}
        >
          <div style={{ marginLeft: "auto" }}>
            <IconButton onClick={props.handleEdit}>
              <Edit />
            </IconButton>
          </div>
          <div
            style={{
              textAlign: "center",
              marginLeft: 48,
              marginRight: 48,
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            {props.text}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <IconButton onClick={deleteTask}>
                <Delete />
              </IconButton>
            </div>
            <div>
              <IconButton onClick={props.handleStart}>
                <PlayArrow />
              </IconButton>
            </div>
          </div>
        </div>
      </Paper>
    </Grid>
  );
}
