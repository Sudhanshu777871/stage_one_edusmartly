import { combineReducers } from "redux";
import mode from "./mode";

const reducers = combineReducers({
    myMode:mode
})
// exporting the reducers
export default reducers