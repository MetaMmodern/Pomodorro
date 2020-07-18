import React from "react";
import "./CircleTimer.scss";
import CircleContainer from "../CircleContainer/CircleContainer";
import { connect } from "react-redux";
import { startTimer } from "../../redux/actions/actions";
function CircleTimer(props) {
  return (
    <CircleContainer
      HandleStartTimer={props.startTimer}
      viewBox={props.viewBox}
      width={props.width}
      percents={props.percents}
      color={props.color}
      stopped={props.stopped}
    />
  );
}
const mapStateToProps = (state) => ({
  viewBox: state.timer.viewBox,
  width: state.timer.width,
  percents: state.timer.percents,
  color: state.timer.color,
  timeInMinutes: state.timer.timeInMinutes,
  stopped: state.timer.stopped,
});

const mapDispatchToProps = {
  startTimer,
};

export default connect(mapStateToProps, mapDispatchToProps)(CircleTimer);
