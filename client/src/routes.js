import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
const TimerPage = lazy(() => import("./pages/TimerPage/TimerPage"));
const TasksPage = lazy(() => import("./pages/TasksPage/TasksPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage/SettingsPage"));
const AuthPage = lazy(() => import("./pages/AuthPage/AuthPage"));
export function useRoutes(isAuthenticated) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" exact component={TimerPage} />

        {isAuthenticated ? (
          <>
            <Route path="/tasks" component={TasksPage} />
            <Route path="/settings" component={SettingsPage} />
          </>
        ) : (
          <Route path="/auth" component={AuthPage} />
        )}
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
}
