import React from "react";
import "./App.scss";
import NavBar from "./components/NavBar/NavBar";
import Panel from "./components/Panel/Panel";
import { useRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";

function App() {
  const { login, logout, token, userId } = useAuth();

  const routes = useRoutes(false);
  return (
    <div className="App">
      <Router>
        <NavBar isLogged={false} />
        <Panel />
        {routes}
      </Router>
    </div>
  );
}

export default App;
