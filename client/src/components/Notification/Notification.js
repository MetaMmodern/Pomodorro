import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Snackbar, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

export class Notification extends Component {
  constructor(props) {
    super(props);
    this.root = document.createElement("div");
    this.root.id = props.id;
    document.body.appendChild(this.root);
  }
  componentWillUnmount() {
    document.body.removeChild(this.root);
  }
  render() {
    return ReactDOM.createPortal(
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={this.props.open}
        autoHideDuration={3000}
        onClose={this.props.handleClose}
        message={this.props.message}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={this.props.handleClose}
            >
              <Close fontSize="small" />
            </IconButton>
          </>
        }
      />,
      this.root
    );
  }
}

export default Notification;
