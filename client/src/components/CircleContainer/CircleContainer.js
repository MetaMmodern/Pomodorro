import React from "react";
import SVGCircle from "../SVGCircle/SVGCircle";
import { IconButton } from "@material-ui/core";
import { PlayArrow, Pause } from "@material-ui/icons";
function CircleContainer(props) {
  return (
    <div
      style={{
        height: "350px",
        width: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {props.stopped ? (
        <IconButton
          aria-label="play arrow"
          style={{ color: props.color }}
          onClick={props.HandleStartTimer}
        >
          <PlayArrow style={{ fontSize: "5rem" }} />
        </IconButton>
      ) : (
        <IconButton
          aria-label="play arrow"
          style={{ color: props.color }}
          onClick={props.HandleStartTimer}
        >
          <Pause style={{ fontSize: "5rem" }} />
        </IconButton>
      )}

      <SVGCircle
        viewBox={props.viewBox}
        width={props.width}
        percents={props.percents}
        color={props.color}
      />
    </div>
  );
}

export default CircleContainer;
