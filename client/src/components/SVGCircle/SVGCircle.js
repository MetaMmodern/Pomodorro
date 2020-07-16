import React, { Component } from "react";
import "./SVGCircle.scss";
export default class SVGCircle extends Component {
  render() {
    return (
      <svg
        viewBox={this.props.viewBox.toString()}
        preserveAspectRatio="xMinYMin meet"
      >
        <circle
          cx="50%"
          cy="50%"
          r="70"
          style={{
            strokeWidth: this.props.width,
          }}
        />
        <circle
          cx="50%"
          cy="50%"
          r="70"
          style={{
            strokeDashoffset: this.props.percents,
            stroke: this.props.color,
            boxShadow: "inset 1px 1px 1px #f2f2f205",
            strokeWidth: this.props.width,
          }}
        />
      </svg>
    );
  }
}
