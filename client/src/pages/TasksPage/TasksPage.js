import React, { useState, useContext, useCallback, useEffect } from "react";
import TaskAdder from "../../components/TaskAdder/TaskAdder";
import TasksContainer from "../../components/TasksContainer/TasksContainer";
import { useHttp } from "../../hooks/http.request";

import useStyles from "./TasksPage.style";

export default function TasksPage() {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const { loading, request } = useHttp();
  const fetchTasks = useCallback(async () => {
    const data = await request("/api/tasks/", "GET", null, {});
    setTasks(Object.entries(data));
  }, [request]);
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  return (
    <div className={classes.TasksPage}>
      <TaskAdder updateTasks={fetchTasks} />
      {loading ? (
        <div>loading...</div>
      ) : (
        <TasksContainer tasks={tasks} updateTasks={fetchTasks} />
      )}
    </div>
  );
}
