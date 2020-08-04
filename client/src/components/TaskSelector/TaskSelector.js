import React, { useState } from "react";
import {
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import { useEffect } from "react";
import { useCallback } from "react";
import { useHttp } from "../../hooks/http.request";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import useStyles from "./TaskSelector.style";
export default function TaskSelector(props) {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ name: "", id: "" });
  const { request, loading } = useHttp();
  const classes = useStyles();
  const handleChange = ({ name, id }) => {
    setTask({ name, id });
  };
  const fetchTasks = useCallback(async () => {
    const data = await request("/api/tasks/", "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    setTasks(Object.entries(data));
  }, [request, setTasks, token]);
  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [fetchTasks, token]);
  useEffect(() => {
    if (
      props.selectedTask !== undefined &&
      props.selectedTask.id !== undefined
    ) {
      setTask({
        name: props.selectedTask.currentTask,
        id: props.selectedTask.id,
      });
    }
  }, [props.selectedTask]);

  if (!token) {
    return <></>;
  }
  return loading ? (
    <div>Loading...</div>
  ) : (
    <FormControl className={classes.formControl}>
      <Select
        value={task.name}
        onChange={(e) =>
          handleChange({ name: e.target.value, id: e.target.id })
        }
        displayEmpty
        className={classes.selectEmpty}
        inputProps={{ "aria-label": "Select Task" }}
      >
        <MenuItem value="">
          <em>No task</em>
        </MenuItem>
        {tasks.map(([_, task]) => {
          return (
            <MenuItem value={task.name} key={task["_id"]} id={task["_id"]}>
              {task.name}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>Current task</FormHelperText>
    </FormControl>
  );
}
