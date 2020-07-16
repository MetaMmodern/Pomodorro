import React, { Component } from "react";
import "./CircleTimer.scss";
import CircleContainer from "../CircleContainer/CircleContainer";

export default class CircleTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percents: 0,
      timeInMinutes: 0.08,
      color: "green",
      width: 15,
      viewBox: [0, 0, 160, 160],
    };
  }
  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
  }

  timer = () => {
    const newCount =
      440 - (440 * (((440 - this.state.percents) * 100) / 440 - 1)) / 100;
    if (newCount <= 440) {
      this.setState({ percents: newCount });
    } else {
      this.StopTimer();
    }
  };
  backwardTimer = () => {
    const newCount =
      440 - (440 * (((440 - this.state.percents) * 100) / 440 + 1)) / 100;
    if (newCount >= 0) {
      this.setState({ percents: newCount });
    } else {
      this.StopBackwardTimer();
    }
  };
  StopBackwardTimer = () => {
    clearInterval(this.state.backwardIntervalId);
  };
  StartTimer = () => {
    const intervalId = setInterval(this.timer, this.state.timeInMinutes * 600);
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId });
  };
  StopTimer = () => {
    clearInterval(this.state.intervalId);
    const backwardIntervalId = setInterval(this.backwardTimer, 3);
    this.setState({
      ...this.state,
      backwardIntervalId,
    });
  };

  render() {
    return (
      <CircleContainer
        HandleStartTimer={this.StartTimer}
        viewBox={this.state.viewBox}
        width={this.state.width}
        percents={this.state.percents}
        color={this.state.color}
      />
    );
  }
}
