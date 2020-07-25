import React from 'react';
import { TextField, Button, makeStyles, FormControl, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  AuthBlock: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AuthBlock__container: {
    width: '70%',
    height: '500px',
    marginTop: '7rem',
    padding: '1rem 2rem',
  },
  AuthBlock__email: { marginBottom: '2rem' },
  AuthBlock__password: { marginBottom: '2rem' },
  AuthBlock__AuthBtn: { marginLeft: 'auto', marginRight: '1rem' },
}));

export default function AuthPage() {
  const classes = useStyles();
  return (
    <div className={classes.AuthBlock}>
      <FormControl className={classes.AuthBlock__container}>
        <Paper>
          <TextField
            id="standard-basic"
            label="Email"
            type="email"
            className={classes.AuthBlock__email}
          />
          <TextField
            id="standard-basic"
            label="Password"
            type="password"
            className={classes.AuthBlock__password}
          />
          <Button variant="contained" color="primary" className={classes.AuthBlock__AuthBtn}>
            Log In
          </Button>
        </Paper>
      </FormControl>
    </div>
  );
}
