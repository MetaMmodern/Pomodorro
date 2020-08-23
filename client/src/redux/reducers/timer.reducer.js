import {
  UPDATE_CONFIG,
  TICK,
  START_TIMER,
  STOP_TIMER,
  PAUSE_TIMER,
} from "../actions/actionTypes";

const initialState = {
  percents: 0,
  timeInMinutes: 2,
  timeBackInMinutes: 1,
  color: "#3F51B5",
  backwardColor: "#43a047",
  width: 15,
  viewBox: [0, 0, 160, 160],
  stopped: true,
  paused: false,
  currentDirection: "forward",
};

export default function timer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CONFIG:
      console.log("Update config worked");
      return {
        ...state,
        ...action.payload,
      };
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
        percents: action.payload.percents,
        currentDirection: action.payload.currentDirection,
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
