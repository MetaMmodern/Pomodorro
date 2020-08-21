import React, { useState, useEffect, useContext } from "react";
import SaveSettingsButton from "../SaveSettingsButton/SaveSettingsButton";
import TimeBlock from "../TimeBlock/TimeBlock";
import SoundBlock from "../SoundBlock/SoundBlock";

import { Grid, Paper } from "@material-ui/core";

import useStyles from "./WorkSettings.style";
import { useHttp } from "../../../../hooks/http.request";
import { AuthContext } from "../../../../context/auth.context";
import Notification from "../../../../components/Notification/Notification";

const WorkSettings = () => {
  const classes = useStyles();
  const { loading, request } = useHttp();
  const { token, setNotification } = useContext(AuthContext);

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

  const handleSave = async () => {
    try {
      setGlobalError(["Saving..."]);
      console.log(token);
      const data = await request(
        "/api/settings/update/work",
        "POST",
        {
          workTime: workTime.value,
          restTime: restTime.value,
          tickSound,
          finishSound,
        },
        { Authorization: `Bearer ${token}` }
      );
      setGlobalError([]);
      setNotification({
        open: true,
        message: data.message,
      });
    } catch (error) {}
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
            disabled={Boolean(restTime.error || workTime.error) || loading}
            saving={loading}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WorkSettings;
