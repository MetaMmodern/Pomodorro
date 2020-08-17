import React, { useState, useEffect } from "react";
import SaveSettingsButton from "../SaveSettingsButton/SaveSettingsButton";
import TimeBlock from "../TimeBlock/TimeBlock";
import SoundBlock from "../SoundBlock/SoundBlock";

import { Grid, Paper } from "@material-ui/core";

import useStyles from "./WorkSettings.style";

const WorkSettings = () => {
  const classes = useStyles();

  const [globalError, setGlobalError] = useState({
    workError: null,
    restError: null,
  });

  const [tickSound, setTickSound] = useState("Metronome");
  const [finishSound, setFinishSound] = useState("Ring");

  const [workTime, setWorkTime] = useState({ value: 20, error: null });
  const [restTime, setRestTime] = useState({ value: 5, error: null });

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

  const [saving, setSaving] = useState(false);
  const handleSave = () => {
    setGlobalError(["Saving..."]);
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setGlobalError([]);
      console.log("saved");
    }, 2000);
  };
  return (
    <Paper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TimeBlock
            blockClassName={classes.oneBlock}
            titleClassName={classes.BlockTitle}
            timeValue={workTime}
            timeType={"work"}
            onValueChange={handleWorkTimeChange}
          />
          <TimeBlock
            blockClassName={classes.oneBlock}
            titleClassName={classes.BlockTitle}
            timeValue={restTime}
            timeType={"rest"}
            onValueChange={handleRestTimeChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SoundBlock
            blockClassName={classes.oneBlock}
            value={tickSound}
            onSoundChange={(e) => {
              setTickSound(e.target.value);
            }}
            titleSound={"Tick"}
            values={["Metronome", "Clock", "Laser", "Raindrop"]}
          />
          <SoundBlock
            blockClassName={classes.oneBlock}
            value={finishSound}
            onSoundChange={(e) => {
              setFinishSound(e.target.value);
            }}
            titleSound={"Finish"}
            values={["Ring", "Bong", "Hey!"]}
          />
        </Grid>
        <Grid item xs={12} className={classes.saveContainer}>
          <SaveSettingsButton
            globalError={globalError}
            onSave={handleSave}
            disabled={Boolean(restTime.error || workTime.error) || saving}
            saving={saving}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WorkSettings;
