import { combineReducers } from "redux";
import sidemenuReducer from "./layouts/sidemenu";
import searchReducer from "./layouts/search";

export default combineReducers({
  sidemenu: sidemenuReducer,
  search: searchReducer,
});
