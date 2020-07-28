import {
  TICK,
  START_TIMER,
  STOP_TIMER,
  PAUSE_TIMER,
  TOGGLE_PANEL,
  LOG_IN,
  LOG_OUT,
} from "./actionTypes";

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
      dispatch({
        type: TICK,
        payload: 440,
      });
      stopTimer(dispatch);
      clearInterval(timer);
    }
  };
};

function stopTimer(dispatch) {
  clearInterval(timer);
  backtimer = setInterval(() => dispatch(backTick()), 8);
}

export function manualStopTimer() {
  clearInterval(timer);
  return (dispatch) => {
    backtimer = setInterval(() => dispatch(backTick()), 8);
  };
}

const backTick = () => {
  return (dispatch, getState) => {
    const nextTime = getState().timer.percents - 17.6;
    if (nextTime >= 0) {
      dispatch({
        type: TICK,
        payload: nextTime,
      });
    } else {
      dispatch({
        type: TICK,
        payload: 0,
      });
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

// Side Panel
export function togglePanel(event) {
  return {
    type: TOGGLE_PANEL,
    event,
  };
}

// Auth

export function login(userId, token) {
  return {
    type: LOG_OUT,
    payload: { userId, token },
  };
}

export function logout() {
  return {
    type: LOG_OUT,
  };
}
