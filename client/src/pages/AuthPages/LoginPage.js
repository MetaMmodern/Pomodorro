import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, makeStyles, Paper } from "@material-ui/core";

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
  AuthBlock__NoAcc: { fontSize: "0.9rem", textAlign: "right" },
}));

export default function AuthPage() {
  const [state, setState] = useState({ email: "", password: "" });
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
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className={classes.AuthBlock}>
      <Paper className={classes.AuthBlock__container} elevation={3}>
        <TextField
          id="current-email"
          label="Email"
          type="email"
          required={true}
          value={state.email}
          className={classes.AuthBlock__input}
          onChange={handleFormChange}
        />
        <TextField
          id="current-password"
          label="Password"
          type="password"
          required={true}
          value={state.password}
          className={classes.AuthBlock__input}
          onChange={handleFormChange}
        />
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
