import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { togglePanel } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import { ExitToApp } from "@material-ui/icons";
import { Account } from "../Account/Account";

import useStyles from "./NavBar.style";

function NavBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
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
              <Account username={props.username} />
            </>
          ) : (
            <>
              <Button color="inherit" to={"/login"} component={Link}>
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
