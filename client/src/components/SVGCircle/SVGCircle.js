import React from "react";

import useStyles from "./SVGCircle.style";
function SVGCircle(props) {
  const classes = useStyles();
  return (
    <svg
      viewBox={props.viewBox.toString()}
      preserveAspectRatio="xMinYMin meet"
      className={classes.svgCircle}
    >
      <circle
        cx="50%"
        cy="50%"
        r="70"
        style={{
          strokeWidth: props.width,
        }}
        className={classes.shadowCircle}
      />
      <circle
        cx="50%"
        cy="50%"
        r="70"
        className={classes.timerCircle}
        style={{
          strokeDashoffset: props.percents,
          stroke: props.color,
          strokeWidth: props.width,
        }}
      />
    </svg>
  );
}

export default SVGCircle;
