import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { togglePanel } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import { ExitToApp } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
function NavBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={props.togglePanel}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Timer
          </Typography>
          {props.isLogged ? (
            <>
              <div style={{ marginRight: '1rem' }}>mymail@gmail.com</div>
              <IconButton color="inherit">
                <ExitToApp />
              </IconButton>
            </>
          ) : (
            <>
              <Button color="inherit" to={'/auth'} component={Link}>
                Sign in
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapDispatchToProps = {
  togglePanel,
};

export default connect(null, mapDispatchToProps)(NavBar);
