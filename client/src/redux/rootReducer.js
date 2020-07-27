import { combineReducers } from "redux";
import timer from "./reducers/timer.reducer";
import sidePanel from "./reducers/sidePanel.reducer";
import auth from "./reducers/auth.reducer";
export default combineReducers({ timer, sidePanel, auth });
