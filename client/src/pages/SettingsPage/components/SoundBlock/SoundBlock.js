import React from "react";
import { Select, MenuItem, OutlinedInput, Grid } from "@material-ui/core";

const TickSoundBlock = (props) => {
  return (
    <div className={props.blockClassName}>
      <Grid container>
        <Grid item xs={6} md={4}>
          <div>{props.titleSound} sound:</div>
        </Grid>
        <Grid item xs={6} md={8}>
          <Select
            id={props.titleSound.toLowerCase()}
            input={<OutlinedInput margin="dense" />}
            value={props.value}
            onChange={props.onSoundChange}
          >
            {props.values.map((sound, i) => (
              <MenuItem value={sound} key={i}>
                {sound}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </div>
  );
};

export default TickSoundBlock;
