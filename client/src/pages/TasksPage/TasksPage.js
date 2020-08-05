import React, { useState, useContext, useCallback, useEffect } from "react";
import TaskAdder from "../../components/TaskAdder/TaskAdder";
import TasksContainer from "../../components/TasksContainer/TasksContainer";
import { useHttp } from "../../hooks/http.request";
import { AuthContext } from "../../context/auth.context";

import useStyles from "./TasksPage.style";

export default function TasksPage(props) {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);
  const fetchTasks = useCallback(async () => {
    const data = await request("/api/tasks/", "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    setTasks(Object.entries(data));
  }, [request, token]);
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
