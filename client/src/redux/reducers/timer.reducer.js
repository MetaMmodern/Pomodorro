import { TICK, START_TIMER, STOP_TIMER } from "../actions/actionTypes";

const initialState = {
  percents: 0,
  timeInMinutes: 1,
  color: "#d81b60",
  width: 15,
  viewBox: [0, 0, 160, 160],
  stopped: true,
};

export default function timer(state = initialState, action) {
  switch (action.type) {
    case START_TIMER:
      return {
        ...state,
        stopped: false,
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
    default:
      return state;
  }
}
