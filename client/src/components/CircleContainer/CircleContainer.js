import React from "react";
import SVGCircle from "../SVGCircle/SVGCircle";
import { IconButton } from "@material-ui/core";
import { PlayArrow, Pause } from "@material-ui/icons";
import { connect } from "react-redux";
import { startTimer, pauseTimer } from "../../redux/actions/actions";
import useStyles from "./CircleContainer.style";
function CircleContainer(props) {
  const classes = useStyles();
  const color =
    props.direction === "forward" ? props.color : props.backwardColor;
  return (
    <div className={classes.CircleContainer}>
      {props.stopped ? (
        <IconButton
          aria-label="play arrow"
          style={{ color }}
          onClick={props.startTimer}
        >
          <PlayArrow style={{ fontSize: "5rem" }} />
        </IconButton>
      ) : (
        <IconButton
          aria-label="play arrow"
          style={{ color }}
          onClick={props.pauseTimer}
        >
          <Pause style={{ fontSize: "5rem" }} />
        </IconButton>
      )}

      <SVGCircle
        viewBox={props.viewBox}
        width={props.width}
        percents={props.percents}
        color={color}
      />
    </div>
  );
}

const mapDispatchToProps = {
  startTimer,
  pauseTimer,
};

export default connect(null, mapDispatchToProps)(CircleContainer);
