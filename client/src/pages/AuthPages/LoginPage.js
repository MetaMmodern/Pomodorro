import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, makeStyles, Paper } from "@material-ui/core";
import { AuthContext } from "../../context/auth.context";
import { useHttp } from "../../hooks/http.request";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  AuthBlock: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  AuthBlock__container: {
    width: "25rem",
    maxWidth: "70%",
    padding: "1rem 2rem",
  },
  AuthBlock__input: { marginBottom: "2rem", width: "100%" },
  AuthBlock__AuthBtn: { marginBottom: "2rem" },
  AuthBlock__Alert: { marginBottom: "2rem" },
  AuthBlock__NoAcc: { fontSize: "0.9rem", textAlign: "right" },
}));

export default function AuthPage() {
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
      login(data.token, data.userId, data.username);
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
        <TextField
          id="current-password"
          label="Password"
          type="password"
          required={true}
          value={state.password}
          className={classes.AuthBlock__input}
          onChange={handleFormChange}
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
