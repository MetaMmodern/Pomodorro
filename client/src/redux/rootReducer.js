import { combineReducers } from "redux";
import timer from "./reducers/timer.reducer";
import sidePanel from "./reducers/sidePanel.reducer";
export default combineReducers({ timer, sidePanel });
