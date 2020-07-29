import React from "react";
import "./CircleTimer.scss";
import CircleContainer from "../CircleContainer/CircleContainer";
import { connect } from "react-redux";
function CircleTimer(props) {
  return (
    <CircleContainer
      viewBox={props.viewBox}
      width={props.width}
      percents={props.percents}
      color={props.color}
      stopped={props.stopped}
      backwardColor={props.backwardColor}
      paused={props.paused}
      direction={props.direction}
    />
  );
}
const mapStateToProps = (state) => ({
  viewBox: state.timer.viewBox,
  width: state.timer.width,
  percents: state.timer.percents,
  color: state.timer.color,
  stopped: state.timer.stopped,
  direction: state.timer.currentDirection,
  backwardColor: state.timer.backwardColor,
  paused: state.timer.paused,
});

export default connect(mapStateToProps)(CircleTimer);
