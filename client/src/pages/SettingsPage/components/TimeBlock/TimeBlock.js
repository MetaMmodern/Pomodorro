import React from "react";
import { InputAdornment, TextField, Grid } from "@material-ui/core";

const TimeBlock = (props) => {
  return (
    <div className={props.blockClassName}>
      <Grid container>
        <Grid item xs={7} sm={5} md={4} className={props.titleClassName}>
          <span>Default {props.timeType} time:</span>
        </Grid>
        <Grid item xs={5} sm={7} md={8}>
          <TextField
            id="workTime"
            variant="outlined"
            type="number"
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end">min</InputAdornment>,
            }}
            value={props.timeValue.value}
            onChange={props.onValueChange}
            error={Boolean(props.timeValue.error)}
            helperText={props.timeValue.error}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default TimeBlock;
