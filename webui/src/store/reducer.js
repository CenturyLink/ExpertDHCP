import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import layoutReducer from "./layouts";

// reducer -> entities -> branches
// ................... -> batches

export default combineReducers({
  entities: entitiesReducer,
  layouts: layoutReducer,
});
