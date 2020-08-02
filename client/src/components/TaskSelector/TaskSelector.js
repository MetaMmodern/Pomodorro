import React, { useState } from "react";
import {
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import { useEffect } from "react";
import { useCallback } from "react";
import { useHttp } from "../../hooks/http.request";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function TaskSelector() {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const { request, loading } = useHttp();
  const classes = useStyles();
  const handleChange = (event) => {
    setTask(event.target.value);
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
  if (!token) {
    return <></>;
  }
  return loading ? (
    <div>Loading...</div>
  ) : (
    <FormControl className={classes.formControl}>
      <Select
        value={task}
        onChange={handleChange}
        displayEmpty
        className={classes.selectEmpty}
        inputProps={{ "aria-label": "Select Task" }}
      >
        <MenuItem value="">
          <em>No task</em>
        </MenuItem>
        {tasks.map(([_, task]) => {
          return (
            <MenuItem value={task.name} key={task["_id"]}>
              {task.name}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>Current task</FormHelperText>
    </FormControl>
  );
}
