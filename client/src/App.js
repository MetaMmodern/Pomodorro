import React from "react";
import "./App.scss";
import CircleTimer from "./components/CircleTimer/CircleTimer";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
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

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar
          position="static"
          style={{ background: "transparent", boxShadow: "none" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}></Typography>
            <Button style={{ textTransform: "none" }}>Sign in</Button>
            <Button>Sign up</Button>
          </Toolbar>
        </AppBar>
      </div>

      {/* <Header />
      <ToDoItem /> */}

      <CircleTimer />

      {/* <SideBar />
      <Footer /> */}
    </div>
  );
}

export default App;
