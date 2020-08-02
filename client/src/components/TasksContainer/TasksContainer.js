import React from "react";
import Task from "../Task/Task";
import { Grid } from "@material-ui/core";
import "./TasksContainer.scss";
export default function TasksContainer({ tasks, updateTasks }) {
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
        {tasks.map((task) => {
          return (
            <Task
              text={task[1].name}
              key={task[1]._id}
              id={task[1]._id}
              updateTasks={updateTasks}
            />
          );
        })}
      </Grid>
    </div>
  );
}
