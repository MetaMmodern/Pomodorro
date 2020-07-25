import React from 'react';
import './SVGCircle.scss';
function SVGCircle(props) {
  return (
    <svg
      viewBox={props.viewBox.toString()}
      preserveAspectRatio="xMinYMin meet"
      className="svgCircle"
    >
      <circle
        cx="50%"
        cy="50%"
        r="70"
        style={{
          strokeWidth: props.width,
        }}
      />
      <circle
        cx="50%"
        cy="50%"
        r="70"
        style={{
          strokeDashoffset: props.percents,
          stroke: props.color,
          boxShadow: 'inset 1px 1px 1px #f2f2f205',
          strokeWidth: props.width,
          // transition:
          //   props.timeInMinutes > 1 ? "stroke-dashoffset 0.1s linear" : "none",
        }}
      />
    </svg>
  );
}

export default SVGCircle;
