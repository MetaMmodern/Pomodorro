import React from "react";
import TaskAdder from "../../components/TaskAdder/TaskAdder";
import "./TasksPage.scss";
import TasksContainer from "../../components/TasksContainer/TasksContainer";
export default function TasksPage() {
  return (
    <div className="TasksPage">
      <TaskAdder />
      <TasksContainer />
    </div>
  );
}
