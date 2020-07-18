import React from "react";
import { Button } from "@material-ui/core";
import TaskSelector from "../TaskSelector/TaskSelector";
import CircleTimer from "../CircleTimer/CircleTimer";
import { connect } from "react-redux";
import { manualStopTimer } from "../../redux/actions/actions";
import "./TimerSection.scss";
function TimerSection(props) {
  return (
    <div class="timerSection">
      <div>
        <TaskSelector />
      </div>
      <CircleTimer />
      <div>
        <Button
          onClick={props.manualStopTimer}
          color="primary"
          className="DropTimer"
        >
          Drop timer
        </Button>
      </div>
    </div>
  );
}
const mapDispatchToProps = {
  manualStopTimer,
};
export default connect(null, mapDispatchToProps)(TimerSection);
