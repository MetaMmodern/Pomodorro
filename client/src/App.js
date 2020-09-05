import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Panel from "./components/Panel/Panel";
import Notification from "./components/Notification/Notification";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./context/auth.context";
import getRoutes from "./routes";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.setNotification = this.setNotification.bind(this);
    this.state = {
      userId: "",
      username: "",
      isAuth: false,
      notification: {
        open: false,
        message: "",
      },
    };
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data) {
      this.state = {
        ...this.state,
        userId: data.userId,
        username: data.username,
        isAuth: true,
      };
    }
  }
  login(id, username) {
    this.setState({
      ...this.state,
      userId: id,
      username,
      isAuth: true,
    });
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: id,
        username,
      })
    );
  }
  logout() {
    this.setState({
      ...this.state,
      userId: null,
      username: null,
      isAuth: false,
    });
  }
  setNotification(notification) {
    this.setState({
      ...this.state,
      notification: { ...notification },
    });
  }
  render() {
    return (
      <Router>
        <AuthContext.Provider
          value={{
            login: this.login,
            logout: this.logout,
            setNotification: this.setNotification,
            ...this.state,
          }}
        >
          <main className="App">
            <Panel />
            <NavBar
              isLogged={this.state.isAuth}
              username={this.state.username}
            />
            {getRoutes(this.state.isAuth)}
            {this.state.notification.open ? (
              <Notification
                open={this.state.notification.open}
                message={this.state.notification.message}
                handleClose={() =>
                  this.setNotification({ open: false, text: "" })
                }
              />
            ) : (
              ""
            )}
          </main>
        </AuthContext.Provider>
      </Router>
    );
  }
}

export default App;
