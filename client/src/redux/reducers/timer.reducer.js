import {
  TICK,
  START_TIMER,
  STOP_TIMER,
  PAUSE_TIMER,
} from "../actions/actionTypes";

const initialState = {
  percents: 0,
  timeInMinutes: 0.08333,
  color: "#3F51B5",
  width: 15,
  viewBox: [0, 0, 160, 160],
  stopped: true,
  paused: false,
};

export default function timer(state = initialState, action) {
  switch (action.type) {
    case START_TIMER:
      return {
        ...state,
        stopped: false,
        paused: false,
      };
    case STOP_TIMER:
      return {
        ...state,
        stopped: true,
      };
    case TICK:
      return {
        ...state,
        percents: action.payload,
      };
    case PAUSE_TIMER:
      return {
        ...state,
        paused: true,
        stopped: true,
      };
    default:
      return state;
  }
}
