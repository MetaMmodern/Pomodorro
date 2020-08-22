import React from "react";
import Task from "../Task/Task";
import { Grid } from "@material-ui/core";
import useStyles from "./TasksContainer.style";
export default function TasksContainer({ tasks, updateTasks }) {
  const classes = useStyles();
  return (
    <div className={classes.TasksContainer}>
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
          console.log(task);
          return (
            <Task
              text={task[1].name}
              key={task[1]._id}
              id={task[1]._id}
              time={{
                workTime: task[1].workingTime,
                restTime: task[1].restTime,
              }}
              updateTasks={updateTasks}
            />
          );
        })}
      </Grid>
    </div>
  );
}
