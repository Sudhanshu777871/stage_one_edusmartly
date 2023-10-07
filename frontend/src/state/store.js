import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducer";

// craeting the store
const store = createStore(reducers, {}, applyMiddleware(thunk));
// exporting store
export default store;