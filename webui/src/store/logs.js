import { createSlice } from "@reduxjs/toolkit";

// createSlice = createAction + createReducer
const slice = createSlice({
  name: "logs",
  initialState: {
    logs: [],
  },

  reducers: {
    operationSuccess: (logs, action) => {
      try {
        const entry = {
          url: action.payload.url,
          method: action.payload.method,
          input: action.payload.input,
          status: action.payload.status
            ? action.payload.status
            : action.payload.error,
          statusValue: action.payload.statusValue
            ? action.payload.statusValue
            : action.payload.status,
          responseData: action.payload.responseData,
        };
        console.log("entry", entry);
        logs.logs.push([new Date().toLocaleString(), entry]);
      } catch (error) {
        console.log("Exception", error);
      }
    },
    operationFailed: (logs, action) => {
      const entry = {
        url: action.payload.url,
        method: action.payload.method,
        input: action.payload.input,
        error: action.payload.error,
        status: "Error",
        statusValue: "unsuccessfull",
        responseData: {},
      };
      console.log("entry", entry);
      logs.logs.push([new Date().toLocaleString(), entry]);
    },
    logsCleared: (logs, action) => {
      logs.logs = [];
    },
  },
});

export const { operationSuccess, operationFailed, logsCleared } = slice.actions;

export default slice.reducer;

// Action Creators

export const logSuccess = (
  url,
  method,
  input,
  status,
  statusValue,
  responseData
) => (dispatch, getState) => {
  // ******************************************************************
  // Dispatches this upon a successfull API operation.
  // ******************************************************************

  if (url.includes("auth") && input) {
    try {
      if ("password" in input) input["password"] = "******";
      // if ("sessionToken" in responseData)
      //   responseData["sessionToken"] = "******";
      if ("sessionToken" in input) input["sessionToken"] = "******";
    } catch (error) {
      console.error("Can't filterout secrets", error);
    }
  }

  if (url !== "/auth/get_auth_tokens") {
    console.log(
      "logSuccess --->>",
      url,
      method,
      input,
      status,
      statusValue,
      responseData
    );
    dispatch({
      type: operationSuccess.type,
      payload: {
        url: url,
        method: method,
        input: input,
        status: status,
        statusValue: statusValue,
        responseData: responseData,
      },
    });
  }
};

export const logFailure = (url, method, input, error) => (
  dispatch,
  getState
) => {
  // ******************************************************************
  // Dispatches this upon a unsuccessfull API operation.
  // ******************************************************************

  if (url.includes("auth")) {
    try {
      if ("password" in input) input["password"] = "******";
    } catch (error) {
      console.error("Can't filterout secrets", error);
    }
  }

  console.log("logFailure --->>", url, method, input, error);

  dispatch({
    type: operationFailed.type,
    payload: { url: url, method: method, input: input, error: error },
  });
};

export const clearLogs = () => (dispatch, getState) => {
  dispatch({
    type: logsCleared.type,
    payload: {},
  });
};
