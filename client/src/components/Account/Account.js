import React, { useState, useContext } from "react";
import {
  Menu,
  IconButton,
  ListItemText,
  ListItemIcon,
  Divider,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { AccountCircle, Settings, ExitToApp } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

const useStyles = makeStyles({
  username: {
    color: "black",
    opacity: "0.8!important",
    justifyContent: "center",
  },
});
export const Account = (props) => {
  const { logout } = useContext(AuthContext);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(false);
  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <AccountCircle></AccountCircle>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled={true} className={classes.username}>
          <b>{props.username}</b>
        </MenuItem>
        <Divider />
        <MenuItem component={Link} to="/settings" onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <MenuItem button onClick={logout}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </>
  );
};
