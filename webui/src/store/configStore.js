import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleware/api";
import authtoken from "./middleware/authtoken";
import logger from "redux-logger";
import toastmessage from "./middleware/toastmessage";

export default function () {
  const middleware = [...getDefaultMiddleware(), authtoken, api, toastmessage];
  if (
    process.env.NODE_ENV === `development` ||
    process.env.NODE_ENV === `test`
  ) {
    // add redux logger if not in production.
    middleware.push(logger);
  }

  return configureStore({
    reducer,
    middleware: middleware,
  });
}
