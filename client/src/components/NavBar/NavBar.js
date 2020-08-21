import React, { useEffect, useState } from "react";
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
import { Link, withRouter } from "react-router-dom";
import { Account } from "../Account/Account";

import useStyles from "./NavBar.style";

function NavBar(props) {
  const [title, setTitle] = useState("Timer");
  const classes = useStyles();
  useEffect(() => {
    switch (props.location.pathname.slice(1)) {
      case "":
        setTitle("Timer");
        break;
      case "tasks":
        setTitle("Tasks");
        break;
      case "settings":
        setTitle("Settings");
        break;
      case "login":
        setTitle("Login");
        break;
      case "register":
        setTitle("Registration");
        break;
      default:
        setTitle("Timer");

        break;
    }
  }, [props.location.pathname]);
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
            {title}
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

export default connect(null, mapDispatchToProps)(withRouter(NavBar));
