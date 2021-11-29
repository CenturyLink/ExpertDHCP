import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { createToastObject } from "../services/utilityService";

// createSlice = createAction + createReducer
const slice = createSlice({
  name: "rawapi",
  initialState: {
    processing: false,
    status: null,
    output: null,
    currentApi: null,
    currentInput: null,
    currentOutput: null,
  },

  reducers: {
    apiStarted: (rawapi, action) => {
      console.log("apiStarted", action.payload);
      rawapi.processing = true;
      rawapi.status = "started";
    },

    apiSuccess: (rawapi, action) => {
      console.log("apiSuccess", action.payload);
      rawapi.processing = false;

      if (action.payload.status === "OK") {
        rawapi.status = "success";
        rawapi.output = action.payload;
      } else {
        rawapi.status = "failed";
        rawapi.output = action.payload;
      }
    },
    apiFailed: (rawapi, action) => {
      console.log("apiFailed", action.payload);
      rawapi.processing = false;
      rawapi.status = "error";
    },
    apiChanged: (rawapi, action) => {
      if (action.payload.api !== "NO_CHANGE")
        rawapi.currentApi = action.payload.api;
      if (action.payload.input !== "NO_CHANGE")
        rawapi.currentInput = action.payload.input;
      if (action.payload.output !== "NO_CHANGE")
        rawapi.currentOutput = action.payload.output;
    },
  },
});

export const { apiStarted, apiSuccess, apiFailed, apiChanged } = slice.actions;

export default slice.reducer;

// Action Creators

const DEF_TOAST_FIREAPI = createToastObject(
  "API Call Success",
  "FAST_STATUS",
  "API Call Failed"
);

export const fireApi = (
  apiUrl,
  method,
  input,
  toastInfo = DEF_TOAST_FIREAPI
) => (dispatch, getState) => {
  // ******************************************************************
  // API middleware action for all the Raw API calls in MasterDCHP.
  // ******************************************************************
  if (method === "GET") {
    return dispatch(
      apiCallBegan({
        url: apiUrl,
        method: method,
        onStart: apiStarted,
        onSuccess: apiSuccess,
        onError: apiFailed,
        apiType: "DHCPMGR_API",
        toastInfo: toastInfo,
      })
    );
  } else if (method === "POST") {
    return dispatch(
      apiCallBegan({
        url: apiUrl,
        method: method,
        data: input,
        onStart: apiStarted,
        onSuccess: apiSuccess,
        onError: apiFailed,
        apiType: "DHCPMGR_API",
        toastInfo: toastInfo,
      })
    );
  } else {
  }
};

export const changeApi = (api, input, output) => (dispatch, getState) => {
  // ******************************************************************
  // Dispatches this when user choose/ change a raw API option. API
  // details, input and output will be updated.
  // ******************************************************************

  dispatch({
    type: apiChanged.type,
    payload: { api: api, input: input, output: output },
  });
};
