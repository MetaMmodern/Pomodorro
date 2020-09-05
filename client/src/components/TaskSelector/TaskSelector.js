import React, { useState, useEffect, useCallback, useContext } from "react";
import { connect } from "react-redux";
import {
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import { useHttp } from "../../hooks/http.request";
import { AuthContext } from "../../context/auth.context";

import { setConfig } from "../../redux/actions/actions";

import useStyles from "./TaskSelector.style";

function TaskSelector(props) {
  const { userId } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ name: "", id: "" });
  const { request, loading } = useHttp();
  const classes = useStyles();
  const handleChange = ({ name, id }) => {
    const task = tasks.filter((task) => {
      return task[1]._id === id;
    })[0];
    props.setConfig({
      timeInMinutes: task[1].workingTime,
      timeBackInMinutes: task[1].restTime,
    });

    setTask({ name, id });
  };
  const fetchTasks = useCallback(async () => {
    const data = await request("/api/tasks/", "GET", null, {});
    setTasks(Object.entries(data));
  }, [request, setTasks]);
  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [fetchTasks]);
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

  if (!userId) {
    return <></>;
  }
  return loading ? (
    <div>Loading...</div>
  ) : (
    <FormControl className={classes.formControl}>
      <Select
        value={task.name}
        onChange={(_, child) => {
          handleChange({ name: child.props.value, id: child.props.id });
        }}
        displayEmpty
        className={classes.selectEmpty}
        inputProps={{ "aria-label": "Select Task" }}
      >
        <MenuItem value="">
          <em>No task</em>
        </MenuItem>
        {tasks.map(([_, task]) => {
          return (
            <MenuItem
              value={task.name}
              key={task._id}
              id={task._id}
              name={task.name}
            >
              {task.name}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>Current task</FormHelperText>
    </FormControl>
  );
}

const mapDispatchToProps = {
  setConfig,
};

export default connect(null, mapDispatchToProps)(TaskSelector);
