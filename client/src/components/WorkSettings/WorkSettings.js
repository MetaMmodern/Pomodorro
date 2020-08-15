import React, { useState, useEffect } from "react";
import useStyles from "./WorkSettings.style";
import {
  TextField,
  Select,
  MenuItem,
  Grid,
  Paper,
  Button,
  Tooltip,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import { Save } from "@material-ui/icons";
import SaveSettingsButton from "../../components/SaveSettingsButton/SaveSettingsButton";

const WorkSettings = () => {
  const [globalError, setGlobalError] = useState({
    workError: null,
    restError: null,
  });
  const [tickSound, setTickSound] = useState("Metronome");
  const [finishSound, setFinishSound] = useState("Ring");
  const [workTime, setWorkTime] = useState({ value: 20, error: null });
  const [restTime, setRestTime] = useState({ value: 5, error: null });
  const handleChangeTick = (e) => {
    setTickSound(e.target.value);
  };
  const handleChangeFinish = (e) => {
    setFinishSound(e.target.value);
  };
  const handleWorkTimeChange = (e) => {
    if (e.target.value > 35 || e.target.value < 5) {
      setWorkTime({
        value: e.target.value,
        error: "Work time must be between 5 and 35 minutes.",
      });
    } else {
      setWorkTime({ value: e.target.value, error: null });
    }
  };
  const handleRestTimeChange = (e) => {
    if (e.target.value > 20 || e.target.value < 5) {
      setRestTime({
        value: e.target.value,
        error: "Rest time must be between 5 and 20 minutes.",
      });
    } else {
      setRestTime({ value: e.target.value, error: null });
    }
  };
  useEffect(() => {
    const workError = workTime.error;
    const restError = restTime.error;
    setGlobalError({
      workError,
      restError,
    });
  }, [workTime, restTime]);
  const classes = useStyles();
  return (
    <Paper>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <div className={classes.oneBlock}>
            <span>Default work time:</span>
            <TextField
              id="workTime"
              variant="outlined"
              type="number"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">minutes</InputAdornment>
                ),
              }}
              value={workTime.value}
              onChange={handleWorkTimeChange}
              error={Boolean(workTime.error)}
              helperText={workTime.error}
            />
          </div>
          <div className={classes.oneBlock}>
            <span>Default rest time:</span>
            <TextField
              id="restTime"
              variant="outlined"
              type="number"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">minutes</InputAdornment>
                ),
              }}
              value={restTime.value}
              onChange={handleRestTimeChange}
              error={Boolean(restTime.error)}
              helperText={restTime.error}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.oneBlock}>
            <span>Tick sound:</span>
            <Select
              labelId="demo-simple-select-label"
              id="tick"
              input={<OutlinedInput margin="dense" />}
              value={tickSound}
              onChange={handleChangeTick}
            >
              <MenuItem value={"Metronome"}>Metronome</MenuItem>
              <MenuItem value={"Raindrop"}>Raindrop</MenuItem>
              <MenuItem value={"Laser"}>Laser</MenuItem>
            </Select>
          </div>
          <div className={classes.oneBlock}>
            <span>Finish sound:</span>
            <Select
              labelId="demo-simple-select-label"
              id="finish"
              input={<OutlinedInput margin="dense" />}
              value={finishSound}
              onChange={handleChangeFinish}
            >
              <MenuItem value={"Ring"}>Ring</MenuItem>
              <MenuItem value={"Bong"}>Bong</MenuItem>
              <MenuItem value={"Hey"}>Hey</MenuItem>
            </Select>
          </div>
        </Grid>
        <Grid item xs={12} className={classes.saveContainer}>
          <SaveSettingsButton
            globalError={globalError}
            restTimeError={restTime.error}
            workTimeError={workTime.error}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WorkSettings;
