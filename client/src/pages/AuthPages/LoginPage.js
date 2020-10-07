import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { TextField, Button, Paper } from "@material-ui/core";
import { AuthContext } from "../../context/auth.context";
import { useHttp } from "../../hooks/http.request";
import { Alert, AlertTitle } from "@material-ui/lab";

import useStyles from "./LoginPage.style";
import PasswordInput from "../../components/PasswordInput/PasswordInput";

export default function LoginPage(props) {
  const history = useHistory();
  const { login } = useContext(AuthContext);
  const [state, setState] = useState({ email: "", password: "" });
  const { request, error } = useHttp();
  const classes = useStyles();
  const handleFormChange = (e) => {
    switch (e.target.id) {
      case "current-email":
        setState({ ...state, email: e.target.value });
        break;
      case "current-password":
        setState({ ...state, password: e.target.value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = await request(
        "/api/auth/login",
        "POST",
        { email: state.email, password: state.password },
        {}
      );
      console.log("got this data:", data);
      login(data.userId, data.username);
      history.push("/");
    } catch (error) {}
  };
  return (
    <form onSubmit={handleSubmit} className={classes.AuthBlock}>
      <Paper className={classes.AuthBlock__container} elevation={3}>
        <TextField
          id="current-email"
          label="Email"
          type="text"
          required={true}
          value={state.email}
          className={classes.AuthBlock__input}
          onChange={handleFormChange}
          autoComplete="true"
        />

        <PasswordInput
          id="current-password"
          label="Password"
          variant="standard"
          size="medium"
          className={classes.AuthBlock__input}
          value={state.password}
          handleValueChange={handleFormChange}
          required={true}
          autoComplete="true"
        />

        {error && (
          <Alert severity="error" className={classes.AuthBlock__Alert}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          color="primary"
          className={classes.AuthBlock__AuthBtn}
          type="submit"
        >
          Log In
        </Button>
        <div className={classes.AuthBlock__NoAcc}>
          Not registered? <Link to="/register">Create an account!</Link>
        </div>
      </Paper>
    </form>
  );
}
