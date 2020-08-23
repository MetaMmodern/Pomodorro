import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PageLoading from "./components/PageLoading/PageLoading";

// import TimerPage from "./pages/TimerPage/TimerPage";
// import TasksPage from "./pages/TasksPage/TasksPage";
// import SettingsPage from "./pages/SettingsPage/SettingsPage";
// import LoginPage from "./pages/AuthPages/LoginPage";
// import RegisterPage from "./pages/AuthPages/RegisterPage";

const TimerPage = lazy(() => import("./pages/TimerPage/TimerPage"));
const TasksPage = lazy(() => import("./pages/TasksPage/TasksPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage/SettingsPage"));
const LoginPage = lazy(() => import("./pages/AuthPages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/AuthPages/RegisterPage"));
export default function getRoutes(isAuth) {
  const authRoutes = [
    <Route path="/tasks" key="/tasks" component={TasksPage} />,
    <Route path="/settings" key="/settings" component={SettingsPage} />,
  ];
  const nonAuthRoutes = [
    <Route path="/login" key="/login" component={LoginPage} />,
    <Route path="/register" key="/register" component={RegisterPage} />,
  ];
  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        <Route path="/" key="/" exact component={TimerPage} />
        {isAuth ? authRoutes : nonAuthRoutes}
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
}
