import React from "react";
import { Grid, Paper, IconButton } from "@material-ui/core";
import { Edit, Delete, PlayArrow } from "@material-ui/icons";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { useHttp } from "../../hooks/http.request";

import useStyles from "./Task.style";

export default function Task(props) {
  const classes = useStyles();
  const { request } = useHttp();

  const deleteTask = async () => {
    try {
      await request(`/api/tasks/delete/${props.id}/`, "GET", null, {});
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
              <Link
                to={{
                  pathname: "/",
                  taskProp: {
                    currentTask: props.text,
                    id: props.id,
                    time: props.time,
                  },
                }}
              >
                <IconButton>
                  <PlayArrow />
                </IconButton>
              </Link>
            </div>
          </div>
        </div>
      </Paper>
    </Grid>
  );
}
