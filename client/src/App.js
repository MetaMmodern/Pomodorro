import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Panel from "./components/Panel/Panel";
import { useRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/auth.context";

function App() {
  const { login, logout, token, userId, username } = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);
  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuth }}>
      <div className="App">
        <Router>
          <NavBar isLogged={isAuth} username={username} />
          <Panel />
          {routes}
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
