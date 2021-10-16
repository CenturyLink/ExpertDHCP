import axios from "axios";
import * as actions from "../api";
import { getServerUrl, getMonitorUrl } from "../labs";
import { logSuccess, logFailure } from "../logs";
import { getConfig } from "../configs";
import { getAxiosOptions } from "../../services/apiService";
import { makeUrlString } from "services/serverService";
import { getIPfromUrl } from "../../services/utilityService";

const options = getAxiosOptions();

const api = ({ dispatch }) => (next) => async (action) => {
  // fire API only if it is a apiCallBegan action.
  if (action.type !== actions.apiCallBegan.type) return next(action);
  axios.defaults.timeout = 10000;

  console.log("Action: ", action.type, action.payload);

  const {
    url,
    method,
    data,
    onStart,
    onSuccess,
    onError,
    onInitialize,
    onComplete,
    toastInfo,
    apiType,
    serverDetails,
  } = action.payload;
  // if onStart key is preset in the payload, then dispatch the action came as value.

  if (onStart) dispatch({ type: onStart });

  next(action);

  // Choose appropriate base URL.
  let base = dispatch(getServerUrl());

  // DHCP Monitor APIs. 
  if (apiType == "DHCPMON_API") {
    base = dispatch(getMonitorUrl());
  }

  // Server status check APIs.
  if (apiType == "SERVER_STATUS_CHECK"){
      base = makeUrlString(serverDetails.ip, serverDetails.port)
      axios.defaults.timeout = 2000;
  }

  // Authentication APIs (if not using csv).
  if (apiType == "DHCPAUTH_API") {
    const config = dispatch(getConfig());
    base = config.authServerUrl;
    axios.defaults.timeout = 10000;
  }

  // API to look up mac vendor registry.
  if (apiType == "MAC_LOOKUP_API") {
    const config = dispatch(getConfig());
    base = config.authServerUrl;
    axios.defaults.timeout = 100000;
  }

  console.log("Request URL: ", base, action.type);

  let serverIp = getIPfromUrl(base);

  let macVendors = {};

  let input_data = {};
  if (method === "POST") input_data = { ...data };

  try {
    const response = await axios.request({
      baseURL: base,
      url,
      method,
      data,
      options,
    });

    console.log("API Response: ", response);
    // ---- General ---
    // bydefalt middleware dispatch this action. This let the other middlewares know that the API call was success, you can
    // make decisions accordingly. like logging, notifying,toasting etc.

    if (url.includes("monitor"))
      dispatch(
        logSuccess(
          base + url,
          method,
          input_data,
          "OK",
          "SUCCESS",
          response.data
        )
      );
    else
      dispatch(
        logSuccess(
          base + url,
          method,
          input_data,
          response.data.status,
          response.data.statusValue,
          response.data.data
        )
      );

    const payload = {
      toastInfo: toastInfo,
      status: response.data.status,
      data: response.data.data,
      statusValue: response.data.statusValue,
      apiType: apiType,
    };

    dispatch(actions.apiCallSuccess(payload));
    // --- Specific ---
    // dispatch these actions only if payload of apiCallBegan contains these keys. Actions must be provided as values.
    if (onSuccess)
      dispatch({
        type: onSuccess,
        inputData: data,
        payload: response.data,
        macVendors: macVendors,
        server: serverIp,
      });
    // To display toast message

    // payload should contain an array of actions to dispatch
    if (onInitialize) {
      for (let action of onInitialize)
        dispatch({ type: action, payload: response.data });
    }

    if (onComplete) dispatch({ type: onComplete, payload: response.data });
  } catch (error) {

    let statusVal = error.message;
    if (url.includes("monitor"))
      dispatch(logSuccess(base + url, method, input_data, error.message));
    else dispatch(logFailure(base + url, method, input_data, error.message));

    if (statusVal.includes("timeout of")) statusVal = "Request timed out";

    dispatch(
      actions.apiCallFailed({
        toastInfo: toastInfo,
        status: statusVal,
        statusValue: statusVal,
      })
    );
    // Specific
    if (onError)
      dispatch({
        type: onError,
        payload: error.message,
        server: serverIp,
      });
  }
};

export default api;
