import {
  TICK,
  START_TIMER,
  STOP_TIMER,
  PAUSE_TIMER,
  TOGGLE_PANEL,
  LOG_IN,
  LOG_OUT,
} from "./actionTypes";

const worker = new Worker("./workers/timer.worker.js");
export function startTimer() {
  return function (dispatch, getState) {
    dispatch({
      type: START_TIMER,
    });
    switch (getState().timer.currentDirection) {
      case "backward":
        worker.postMessage({
          action: "reverse",
          interval: getState().timer.timeBackInMinutes * 150,
          startValue: getState().timer.percents,
        });
        break;
      default:
        worker.postMessage({
          action: "start",
          interval: getState().timer.timeInMinutes * 150,
          startValue: getState().timer.percents,
        });
        break;
    }

    worker.onmessage = (e) => {
      switch (e.data.response) {
        case "update":
          dispatch({
            type: TICK,
            payload: {
              percents: e.data.nextTime,
              currentDirection: e.data.direction,
            },
          });
          break;
        case "startReverse":
          worker.postMessage({
            action: "reverse",
            interval: getState().timer.timeBackInMinutes * 150,
            startValue: getState().timer.percents,
          });
          break;
        case "stop":
          dispatch({
            type: TICK,
            payload: { percents: e.data.nextTime, currentDirection: "forward" },
          });
          dispatch({
            type: STOP_TIMER,
          });

          break;
        default:
          break;
      }
    };
  };
}

export function manualStopTimer() {
  return (_, getState) => {
    worker.postMessage({
      action: "drop",
      startValue: getState().timer.percents,
    });
  };
}

export function pauseTimer() {
  worker.postMessage({
    action: "pause",
  });
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
    type: LOG_IN,
    payload: { userId, token },
  };
}

export function logout() {
  return {
    type: LOG_OUT,
  };
}
