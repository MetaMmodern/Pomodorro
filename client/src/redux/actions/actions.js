import { TICK, START_TIMER, STOP_TIMER, PAUSE_TIMER } from "./actionTypes";

let timer = null;
let backtimer = null;
export function startTimer() {
  return function (dispatch, getState) {
    dispatch({
      type: START_TIMER,
    });
    clearInterval(timer);
    timer = setInterval(
      () => dispatch(tick()),
      getState().timer.timeInMinutes * 150
    );
  };
}

const tick = () => {
  return (dispatch, getState) => {
    const nextTime = getState().timer.percents + 1.1;
    if (nextTime <= 440) {
      dispatch({
        type: TICK,
        payload: nextTime,
      });
    } else {
      stopTimer(dispatch);
      clearInterval(timer);
    }
  };
};

function stopTimer(dispatch) {
  clearInterval(timer);
  backtimer = setInterval(() => dispatch(backTick()), 3);
}

export function manualStopTimer() {
  clearInterval(timer);
  return (dispatch) => {
    backtimer = setInterval(() => dispatch(backTick()), 3);
  };
}

const backTick = () => {
  return (dispatch, getState) => {
    const nextTime = getState().timer.percents - 4.4;
    if (nextTime >= 0) {
      dispatch({
        type: TICK,
        payload: nextTime,
      });
    } else {
      clearInterval(backtimer);
      dispatch({
        type: STOP_TIMER,
      });
    }
  };
};

export function pauseTimer() {
  clearInterval(timer);
  return {
    type: PAUSE_TIMER,
  };
}
