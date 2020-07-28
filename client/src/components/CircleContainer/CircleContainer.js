import React from 'react';
import SVGCircle from '../SVGCircle/SVGCircle';
import { IconButton } from '@material-ui/core';
import { PlayArrow, Pause } from '@material-ui/icons';
import { connect } from 'react-redux';
import { startTimer, pauseTimer } from '../../redux/actions/actions';

function CircleContainer(props) {
  return (
    <div
      style={{
        height: '350px',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {props.stopped ? (
        <IconButton
          aria-label="play arrow"
          style={{ color: props.color }}
          onClick={props.startTimer}
        >
          <PlayArrow style={{ fontSize: '5rem' }} />
        </IconButton>
      ) : (
        <IconButton
          aria-label="play arrow"
          style={{ color: props.color }}
          onClick={props.pauseTimer}
        >
          <Pause style={{ fontSize: '5rem' }} />
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

const mapDispatchToProps = {
  startTimer,
  pauseTimer,
};

export default connect(null, mapDispatchToProps)(CircleContainer);
