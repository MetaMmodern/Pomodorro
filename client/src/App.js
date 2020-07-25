import React from "react";
import "./App.scss";
import NavBar from "./components/NavBar/NavBar";
import Panel from "./components/Panel/Panel";
import { useRoutes } from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const isLogged = false;
  const routes = useRoutes(isLogged);
  return (
    <div className="App">
      <Router>
        <NavBar isLogged={isLogged} />
        <Panel />
        {routes}
      </Router>
    </div>
  );
}

export default App;
