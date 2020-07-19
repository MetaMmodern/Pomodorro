import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import TasksPage from "./pages/TasksPage/TasksPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import TimerPage from "./pages/TimerPage/TimerPage";
import AuthPage from "./pages/AuthPage/AuthPage";

export function useRoutes(isAuthenticated) {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <TimerPage />
        </Route>
        <Route path="/tasks" exact>
          <TasksPage />
        </Route>
        <Route path="/settings" exact>
          <SettingsPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route path="/" exact>
          <TimerPage />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
}
