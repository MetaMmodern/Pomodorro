import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  svgCircle: {
    height: "100%",
    top: "50%",
    left: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%) rotate(-90deg)",
    zIndex: -1,
  },
  shadowCircle: {
    fill: "none",
    stroke: "#f2f2f2",
    strokeDasharray: 440,
    strokeDashoffset: 0,
  },
  timerCircle: {
    fill: "none",
    strokeDasharray: 440,
    strokeLinecap: "round",
    transition: "stroke-dashoffset 0.25s linear",
  },
}));
