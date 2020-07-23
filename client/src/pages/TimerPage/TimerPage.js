import React from "react";
import { Button } from "@material-ui/core";
import TaskSelector from "../../components/TaskSelector/TaskSelector";
import CircleTimer from "../../components/CircleTimer/CircleTimer";
import { connect } from "react-redux";
import { manualStopTimer } from "../../redux/actions/actions";
import "./TimerPage.scss";
function TimerSection(props) {
  return (
    <div className="timerSection">
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
