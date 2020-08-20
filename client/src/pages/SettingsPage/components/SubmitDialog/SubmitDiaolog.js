import React, { useState, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
} from "@material-ui/core";
import PasswordInput from "../../../../components/PasswordInput/PasswordInput";
import { AuthContext } from "../../../../context/auth.context";
import { useHttp } from "../../../../hooks/http.request";

const SubmitDiaolog = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props?.handleClose}
      aria-labelledby="form-dialog-title"
      disableBackdropClick={props.saving}
      disableEscapeKeyDown={props.saving}
    >
      <DialogTitle id="form-dialog-title">Submit your actions</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.text}</DialogContentText>
        <PasswordInput
          value={props.value}
          handleValueChange={props.changeValue}
          error={props.error}
          helperText={props.error ? "Invalid password" : ""}
          autoFocus
          id="passwdsubmit"
          variant="outlined"
          type="text"
          size="medium"
          autocomplete="false"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props?.handleClose}
          color="primary"
          disabled={props.saving}
        >
          Cancel
        </Button>
        <Button
          onClick={props.onSubmit}
          color="primary"
          disabled={props.loading}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubmitDiaolog;
