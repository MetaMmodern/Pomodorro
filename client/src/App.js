import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Panel from "./components/Panel/Panel";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/auth.context";
import RegisterPage from "./pages/AuthPages/RegisterPage";
import TimerPage from "./pages/TimerPage/TimerPage";
import LoginPage from "./pages/AuthPages/LoginPage";
import TasksPage from "./pages/TasksPage/TasksPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";

const authRoutes = [
  <Route path="/" exact key="/" component={TimerPage} />,
  <Route path="/tasks" key="/tasks" component={TasksPage} />,
  <Route path="/settings" key="/settings" component={SettingsPage} />,
];
const nonAuthRoutes = [
  <Route path="/" key="/" exact component={TimerPage} />,
  <Route path="/login" key="/login" component={LoginPage} />,
  <Route path="/register" key="/register" component={RegisterPage} />,
];
function App() {
  const { login, logout, token, userId, username } = useAuth();
  const isAuth = !!token;
  return (
    <Router>
      <AuthContext.Provider value={{ token, userId, login, logout, isAuth }}>
        <div className="App">
          <Panel />
          <NavBar isLogged={isAuth} username={username} />
          <Switch>
            {isAuth ? authRoutes : nonAuthRoutes}
            <Redirect to="/" />
          </Switch>
        </div>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
