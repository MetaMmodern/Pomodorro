import React from "react";
import { Button } from "@material-ui/core";
import TaskSelector from "../../components/TaskSelector/TaskSelector";
import CircleTimer from "../../components/CircleTimer/CircleTimer";
import { connect } from "react-redux";
import { manualStopTimer } from "../../redux/actions/actions";
import useStyles from "./TimerPage.style";
function TimerSection(props) {
  const classes = useStyles();
  return (
    <div className={classes.timerSection}>
      <div>
        <TaskSelector />
      </div>
      <CircleTimer className={classes.CircleTimer} />

      <Button
        onClick={props.manualStopTimer}
        color="primary"
        className={classes.DropTimer}
      >
        Drop timer
      </Button>
    </div>
  );
}
const mapDispatchToProps = {
  manualStopTimer,
};
export default connect(null, mapDispatchToProps)(TimerSection);
