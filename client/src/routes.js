import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import TimerPage from "./pages/TimerPage/TimerPage";
import TasksPage from "./pages/TasksPage/TasksPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import LoginPage from "./pages/AuthPages/LoginPage";
import RegisterPage from "./pages/AuthPages/RegisterPage";

// const TimerPage = lazy(() => import("./pages/TimerPage/TimerPage"));
// const TasksPage = lazy(() => import("./pages/TasksPage/TasksPage"));
// const SettingsPage = lazy(() => import("./pages/SettingsPage/SettingsPage"));
// const LoginPage = lazy(() => import("./pages/AuthPages/LoginPage"));
// const RegisterPage = lazy(() => import("./pages/AuthPages/RegisterPage"));
export function useRoutes(isAuthenticated) {
  if (!isAuthenticated) {
    return (
      <Switch>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Route path="/" exact component={TimerPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Redirect to="/" />
        {/* </Suspense> */}
      </Switch>
    );
  } else {
    return (
      <Switch>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <Route path="/" exact component={TimerPage} />
        <Route path="/tasks" component={TasksPage} />
        <Route path="/settings" component={SettingsPage} />
        <Redirect to="/" />
        {/* </Suspense> */}
      </Switch>
    );
  }
}
