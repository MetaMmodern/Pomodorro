import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Panel from "./components/Panel/Panel";
import Notification from "./components/Notification/Notification";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./context/auth.context";
import getRoutes from "./routes";
import { connect } from "react-redux";
import { setConfig } from "./redux/actions/actions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.setNotification = this.setNotification.bind(this);
    this.state = {
      token: "",
      userId: "",
      username: "",
      isAuth: false,
      notification: {
        open: false,
        message: "",
      },
    };
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data && data.token) {
      this.state = {
        ...this.state,
        token: data.token,
        userId: data.userId,
        username: data.username,
        isAuth: true,
        times: data.times,
      };
      this.props.setConfig(this.state.times);
    }
  }
  login(jwtToken, id, inUsername, times) {
    this.setState({
      ...this.state,
      token: jwtToken,
      userId: id,
      username: inUsername,
      isAuth: true,
      times,
    });
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: id,
        token: jwtToken,
        username: inUsername,
        times,
      })
    );
  }
  logout() {
    this.setState({
      ...this.state,
      token: null,
      userId: null,
      username: null,
      isAuth: false,
    });
    localStorage.removeItem("userData");
  }
  setNotification(notification) {
    this.setState({
      ...this.state,
      notification: { ...notification },
    });
    console.log(this.state);
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

const mapDispatchToProps = {
  setConfig,
};

export default connect(null, mapDispatchToProps)(App);
