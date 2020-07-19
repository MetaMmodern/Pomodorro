import React from "react";
import {
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
export default function TaskSelector() {
  const [age, setAge] = React.useState("");
  const classes = useStyles();
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <Select
        value={age}
        onChange={handleChange}
        displayEmpty
        className={classes.selectEmpty}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="">
          <em>No task</em>
        </MenuItem>
        <MenuItem value={10}>Make Header</MenuItem>
        <MenuItem value={20}>Make website</MenuItem>
        <MenuItem value={30}>Finish homework</MenuItem>
      </Select>
      <FormHelperText>Current task</FormHelperText>
    </FormControl>
  );
}
