import React, { useState } from "react";
import { TextField, Select, MenuItem } from "@material-ui/core";

const WorkSettings = () => {
  const [tickSound, setTickSound] = useState("Metronome");
  const [finishSound, setFinishSound] = useState("Ring");
  const handleChangeTick = (e) => {
    setTickSound(e.target.value);
  };
  const handleChangeFinish = (e) => {
    setFinishSound(e.target.value);
  };
  return (
    <>
      <h3>Work settings</h3>
      <ul>
        Default work time:
        <TextField
          id="workTime"
          label="Work time"
          variant="outlined"
          type="number"
        />
        Default rest time:
        <TextField
          id="restTime"
          label="Rest time"
          variant="outlined"
          type="number"
        />
        Tick sound:
        <Select
          labelId="demo-simple-select-label"
          id="tick"
          value={tickSound}
          onChange={handleChangeTick}
        >
          <MenuItem value={"Metronome"}>Metronome</MenuItem>
          <MenuItem value={"Raindrop"}>Raindrop</MenuItem>
          <MenuItem value={"Laser"}>Laser</MenuItem>
        </Select>
        Finish sound:
        <Select
          labelId="demo-simple-select-label"
          id="finish"
          value={finishSound}
          onChange={handleChangeFinish}
        >
          <MenuItem value={"Ring"}>Ring</MenuItem>
          <MenuItem value={"Bong"}>Bong</MenuItem>
          <MenuItem value={"Hey"}>Hey</MenuItem>
        </Select>
      </ul>
      <button>Save</button>
    </>
  );
};

export default WorkSettings;
