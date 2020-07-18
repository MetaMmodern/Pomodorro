import { TICK, START_TIMER, STOP_TIMER } from "./actionTypes";

let timer = null;
export function startTimer() {
  return function (dispatch, getState) {
    dispatch({
      type: START_TIMER,
    });
    clearInterval(timer);
    timer = setInterval(
      () => dispatch(tick()),
      getState().timer.timeInMinutes * 600
    );
  };
}
let backtimer = null;
function stopTimer(dispatch) {
  clearInterval(timer);
  backtimer = setInterval(() => dispatch(backTick()), 3);
}

function backTick() {
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
}

export function tick() {
  return (dispatch, getState) => {
    const nextTime = getState().timer.percents + 4.4;
    if (nextTime <= 440) {
      dispatch({
        type: TICK,
        payload: nextTime,
      });
    } else {
      clearInterval(timer);
      stopTimer(dispatch);
    }
  };
}
