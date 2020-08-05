import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { TextField, Button, Paper, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useHttp } from "../../hooks/http.request";

import useStyles from "./RegisterPage.style";

export default function RegisterPage() {
  const history = useHistory();

  const { loading, error, request, clearError } = useHttp();
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmed: "",
    captcha: false,
  });
  const [passwordsEqual, setPasswordsEqual] = useState(true);
  const [passwordLength, setPasswordsLength] = useState(true);
  useEffect(() => {
    if (state.password !== "" || state.passwordConfirmed !== "") {
      if (state.password === state.passwordConfirmed) {
        setPasswordsEqual(true);
      } else {
        setPasswordsEqual(false);
      }
    }
  }, [state.password, state.passwordConfirmed]);
  useEffect(() => {
    if (state.password !== "") {
      if (state.password.length < 6) {
        setPasswordsLength(false);
      } else {
        setPasswordsLength(true);
      }
    }
  }, [state.password]);
  const classes = useStyles();
  const handleFormChange = (e) => {
    switch (e.target.id) {
      case "new-email":
        setState({ ...state, email: e.target.value });
        break;
      case "new-username":
        setState({ ...state, username: e.target.value });
        break;
      case "new-password":
        setState({ ...state, password: e.target.value });
        break;
      case "new-password-confirm":
        setState({ ...state, passwordConfirmed: e.target.value });
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await request("/api/auth/register", "POST", {
        email: state.email,
        password: state.password,
        username: state.username,
      });
      history.push("/login");
    } catch (e) {}
  };
  return (
    <form onSubmit={handleSubmit} className={classes.AuthBlock}>
      <Paper className={classes.AuthBlock__container} elevation={3}>
        <TextField
          id="new-email"
          label="Email"
          type="email"
          htmltype="email"
          required={true}
          className={classes.AuthBlock__input}
          value={state.email}
          onChange={handleFormChange}
        />
        <TextField
          id="new-username"
          label="Username"
          type="username"
          className={classes.AuthBlock__input}
          value={state.username}
          onChange={handleFormChange}
        />

        <TextField
          id="new-password"
          label="Password"
          type="password"
          required={true}
          className={classes.AuthBlock__input}
          value={state.password}
          onChange={handleFormChange}
          error={!passwordLength}
          helperText={!passwordLength && "Password is too short."}
        />
        <TextField
          id="new-password-confirm"
          label="Confirm password"
          type="password"
          required={true}
          className={classes.AuthBlock__input}
          value={state.passwordConfirmed}
          onChange={handleFormChange}
          error={!passwordsEqual}
          helperText={!passwordsEqual && "Password do not match"}
        />

        <div>reCaptcha goes here</div>
        <Button
          variant="contained"
          color="primary"
          className={classes.AuthBlock__AuthBtn}
          type="submit"
          disabled={loading}
        >
          Register
        </Button>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={clearError}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={clearError} severity="error">
            {error}
          </Alert>
        </Snackbar>
        <div className={classes.AuthBlock__NoAcc}>
          Already have an account? <Link to="/login">Log in.</Link>
        </div>
      </Paper>
    </form>
  );
}
