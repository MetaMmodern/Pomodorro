import React, { useState } from "react";
import { Menu, IconButton } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

export const Account = (props) => {
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
      ></Menu>
    </>
  );
};
