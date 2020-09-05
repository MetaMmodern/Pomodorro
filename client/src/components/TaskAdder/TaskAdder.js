import React, { useState, useEffect, useRef, useContext } from "react";
import { useHttp } from "../../hooks/http.request";
import { TextField, IconButton } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import useStyles from "./TaskAdder.style";

export default function TaskAdder(props) {
  const classes = useStyles();
  const firstFire = useRef(false);
  const { request } = useHttp();
  const [task, setTask] = useState("");
  const [tasklength, setTasklength] = useState(true);
  useEffect(() => {
    if (firstFire.current) {
      if (!task.trim()) {
        setTasklength(false);
      } else {
        setTasklength(true);
      }
    } else firstFire.current = true;
  }, [task]);
  const handleChange = (e) => {
    e.preventDefault();
    setTask(e.target.value);
  };
  const handleSubmit = async () => {
    if (!task.trim()) {
      setTasklength(false);
      return;
    }

    try {
      const data = await request(
        "/api/tasks/create",
        "POST",
        {
          name: task,
        },
        {}
      );
      if (data.status === 201) {
        setTask("");
        setTasklength(true);

        props.updateTasks();
      }
    } catch (error) {}
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };
  return (
    <div className={classes.TaskAdder}>
      <form action="none">
        {tasklength ? (
          <TextField
            label="Task name"
            value={task}
            onChange={handleChange}
            onKeyPress={handleEnter}
          />
        ) : (
          <TextField
            label="Task name"
            value={task}
            onChange={handleChange}
            onKeyPress={handleEnter}
            error
            helperText="Empty task"
          />
        )}

        <IconButton
          onClick={handleSubmit}
          name="submit_task"
          disabled={!tasklength}
          color="primary"
        >
          <AddCircle fontSize="large" />
        </IconButton>
      </form>
    </div>
  );
}
