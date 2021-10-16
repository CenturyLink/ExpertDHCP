import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { loadConfig } from "./store/configs";
import configureStore from "./store/configStore";
import logger from "./services/logService";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "semantic-ui-css/semantic.min.css";
import "./style.css";

const MODULE_NAME = "Index";

console.log("Environment ==>> ", process.env);

// Disable logger (console.log) by default.
logger.disableLogger();

// Enable logger in development and test.
if (process.env.NODE_ENV === `development` || process.env.NODE_ENV === `test`) {
  logger.enableLogger();
}

// create and configure store. This will initiate redux
// store and configure middlewares. The 4 middlewares
// setup for this are as follows ():
// 1. authtoken middleware - This verifies and choose the appropriate auth-token
//                           or apiKey for fast authentication.
// 2. api middleware - all API calls will be fired through this.
// 3. toastmessage - to show up appropriate toast notification
//                   based on the API response.
// 4. redux logger -  all store operations will be logged.
const store = configureStore();

store.dispatch(loadConfig());

ReactDOM.render(
  // Provider makes Redux store available to any nested
  // components that have been wrapped in the connect().
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
