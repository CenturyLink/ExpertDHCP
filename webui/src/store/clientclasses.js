import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { getApiFromId } from "../services/apiService";
import { createToastObject } from "../services/utilityService";

// createSlice = createAction + createReducer
const slice = createSlice({
  name: "clientclasses",
  initialState: {
    list: [],
    loaded: false,
    updated: false,
    clientclass: null,
  },

  reducers: {
    updateStarted: (clientclasses, action) => {
      clientclasses.updated = false;
    },
    updateSuccess: (clientclasses, action) => {
      clientclasses.updated = true;

      console.log("Success", action.payload);
    },
    updateFailed: (clientclasses, action) => {
      clientclasses.updated = false;
      console.log("Failure", action.payload);
    },
  },
});

export const { updateStarted, updateSuccess, updateFailed } = slice.actions;

export default slice.reducer;

// Action Creators

const TOAST_CLASS_ADD = createToastObject(
  "Client Class added",
  "Could not add classes",
  "Client class load failed"
);

const TOAST_CLASS_MODIFY = createToastObject(
  "Client Class modified",
  "Could not modfiy classes",
  "Client class modify failed"
);

const TOAST_CLASS_DELETE = createToastObject(
  "Client Class deleted",
  "Could not delete class",
  "Client class delete failed"
);

export const deleteClass = (input, toastInfo = TOAST_CLASS_DELETE) => (
  dispatch,
  getState
) => {
  const api = getApiFromId("API_MGR_DEL_CLASS");
  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      data: input,
      onStart: updateStarted.type,
      onSuccess: updateSuccess.type,
      onError: updateFailed.type,
      apiType: "DHCPMGR_API",
      toastInfo: toastInfo,
    })
  );
};

export const addClientClass = (input, toastInfo = TOAST_CLASS_ADD) => (
  dispatch,
  getState
) => {
  const api = getApiFromId("API_MGR_ADD_CLASS");
  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      data: input,
      onStart: updateStarted.type,
      onSuccess: updateSuccess.type,
      onError: updateFailed.type,
      apiType: "DHCPMGR_API",
      toastInfo: toastInfo,
    })
  );
};

export const modifyClientClass = (input, toastInfo = TOAST_CLASS_MODIFY) => (
  dispatch,
  getState
) => {
  const api = getApiFromId("API_MGR_MOD_CLASS");
  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      data: input,
      onStart: updateStarted.type,
      onSuccess: updateSuccess.type,
      onError: updateFailed.type,
      apiType: "DHCPMGR_API",
      toastInfo: toastInfo,
    })
  );
};
