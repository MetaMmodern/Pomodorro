import React, { Component } from "react";
import PlayButton from "../PlayButton/PlayButton";
import SVGCircle from "../SVGCircle/SVGCircle";

export default class CircleContainer extends Component {
  render() {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PlayButton clickHandler={this.props.HandleStartTimer}>
          Play icon
        </PlayButton>
        <SVGCircle
          viewBox={this.props.viewBox}
          width={this.props.width}
          percents={this.props.percents}
          color={this.props.color}
        />
      </div>
    );
  }
}
