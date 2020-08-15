import React from "react";
import useStyles from "./SaveSettingsButton.style";
import { Button, Tooltip } from "@material-ui/core";
import { Save } from "@material-ui/icons";
const SaveSettingsButton = ({ globalError, restTimeError, workTimeError }) => {
  const classes = useStyles();
  return (
    <Tooltip
      className={classes.saveButton}
      title={Object.values(globalError).reduce((accumulator, currentValue) => {
        if (currentValue === null) {
          return accumulator + "";
        }
        return accumulator + "\n" + currentValue;
      }, "")}
    >
      <span>
        <Button
          color={"primary"}
          disabled={Boolean(restTimeError || workTimeError)}
          variant="outlined"
          startIcon={<Save />}
          size="large"
        >
          Save
        </Button>
      </span>
    </Tooltip>
  );
};

export default SaveSettingsButton;
