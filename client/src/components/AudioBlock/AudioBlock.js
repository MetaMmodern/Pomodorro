import React, { createRef } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

class AudioBlock extends React.Component {
  constructor(props) {
    super();
    this.audioRef = createRef();
    this.state = {
      playing: false,
    };
  }
  componentDidMount() {
    if (this.props.paused || this.props.stopped) {
      this.audioRef.current.pause();
      this.audioRef.current.currentTime = 0;
    } else {
      this.audioRef.current.play();
    }
  }
  componentDidUpdate() {
    if (this.props.paused || this.props.stopped) {
      this.audioRef.current.pause();
      this.audioRef.current.currentTime = 0;
    } else {
      this.audioRef.current.play();
    }
  }
  render() {
    return ReactDOM.createPortal(
      <audio loop ref={this.audioRef}>
        <source src="./assets/audio/tick.mp3" type={"audio/mpeg"} />
      </audio>,
      document.getElementById("audio-root")
    );
  }
}

const mapStateToProps = (state) => ({
  stopped: state.timer.stopped,
  direction: state.timer.currentDirection,
  paused: state.timer.paused,
});

export default connect(mapStateToProps)(AudioBlock);
