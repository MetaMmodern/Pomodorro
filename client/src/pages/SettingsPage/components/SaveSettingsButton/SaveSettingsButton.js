import React from "react";
import useStyles from "./SaveSettingsButton.style";
import { Button, Tooltip, CircularProgress } from "@material-ui/core";
import { Save } from "@material-ui/icons";
const SaveSettingsButton = (props) => {
  const classes = useStyles();

  return (
    <Tooltip
      className={classes.saveButton}
      title={Object.values(props.globalError).reduce(
        (accumulator, currentValue) => {
          if (currentValue === null) {
            return accumulator + "";
          }
          return accumulator + "\n" + currentValue;
        },
        ""
      )}
    >
      <span>
        <Button
          color={"primary"}
          disabled={
            Boolean(props.restTimeError || props.workTimeError) ||
            props.disabledOnSave
          }
          variant="outlined"
          startIcon={
            props.disabledOnSave ? <CircularProgress size={22} /> : <Save />
          }
          size="large"
          onClick={props.onSave}
        >
          Save
        </Button>
      </span>
    </Tooltip>
  );
};

export default SaveSettingsButton;
