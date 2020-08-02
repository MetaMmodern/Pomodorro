import React, { useState, useContext, useCallback, useEffect } from "react";
import TaskAdder from "../../components/TaskAdder/TaskAdder";
import TasksContainer from "../../components/TasksContainer/TasksContainer";
import "./TasksPage.scss";
import { useHttp } from "../../hooks/http.request";
import { AuthContext } from "../../context/auth.context";
export default function TasksPage() {
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
    <div className="TasksPage">
      <TaskAdder updateTasks={fetchTasks} />
      {loading ? (
        <div>loading...</div>
      ) : (
        <TasksContainer tasks={tasks} updateTasks={fetchTasks} />
      )}
    </div>
  );
}
