import React from "react";
import Task from "../Task/Task";
import "./TasksContainer.scss";
import { Grid } from "@material-ui/core";
export default function TasksContainer() {
  return (
    <div className="TasksContainer">
      <Grid
        container
        spacing={1}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
        }}
        justify="flex-start"
      >
        <Task text="long task name" />
        <Task text="long task name" />
        <Task text="very very very long task name" />
        <Task text="long task name" />
        <Task text="long task name" />
        <Task text="long task name" />
        <Task text="long task name" />
        <Task text="short task" />
        <Task text="long task name" />
        <Task text="very very very long task name" />
        <Task text="very very very long task name" />
        <Task text="short task name" />
      </Grid>
    </div>
  );
}
