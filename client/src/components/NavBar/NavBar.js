import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { togglePanel } from "../../redux/actions/actions";
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
          <Button color="inherit">Sign in</Button>
          <Button color="inherit">Sign up</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapDispatchToProps = {
  togglePanel,
};

export default connect(null, mapDispatchToProps)(NavBar);
