import React, { Component } from "react";

export default class PlayButton extends Component {
  render() {
    return <button onClick={this.props.clickHandler}>Play Button New</button>;
  }
}
