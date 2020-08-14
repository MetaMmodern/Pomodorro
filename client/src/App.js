import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Panel from "./components/Panel/Panel";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./context/auth.context";
import getRoutes from "./routes";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      token: "",
      userId: "",
      username: "",
      isAuth: false,
    };
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data && data.token) {
      this.state = {
        token: data.token,
        userId: data.userId,
        username: data.username,
        isAuth: true,
      };
    }
  }
  login(jwtToken, id, inUsername) {
    this.setState({
      token: jwtToken,
      userId: id,
      username: inUsername,
      isAuth: true,
    });
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: id, token: jwtToken, username: inUsername })
    );
  }
  logout() {
    this.setState({
      token: null,
      userId: null,
      username: null,
      isAuth: false,
    });
    localStorage.removeItem("userData");
  }
  render() {
    return (
      <Router>
        <AuthContext.Provider
          value={{
            login: this.login,
            logout: this.logout,
            ...this.state,
          }}
        >
          <div className="App">
            <Panel />
            <NavBar
              isLogged={this.state.isAuth}
              username={this.state.username}
            />
            {getRoutes(this.state.isAuth)}
          </div>
        </AuthContext.Provider>
      </Router>
    );
  }
}

export default App;
