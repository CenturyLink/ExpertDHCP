import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { getApiFromId } from "../services/apiService";
import { createToastObject } from "../services/utilityService";

// createSlice = createAction + createReducer
const slice = createSlice({
  name: "leases",
  initialState: {
    list: [],
    loaded: false,
    updated: false,
  },

  reducers: {
    loadStarted: (leases, action) => {
      leases.loaded = false;
    },

    leasesLoaded: (leases, action) => {
      leases.list = action.payload.data.leases;
      leases.loaded = true;
    },

    notLoaded: (leases, action) => {
      leases.loaded = true;
    },
    updateStarted: (leases, action) => {
      leases.updated = false;
    },
    updateSuccess: (leases, action) => {
      leases.updated = true;

      console.log("Success", action.payload);
    },
    updateFailed: (leases, action) => {
      leases.updated = false;
      console.log("Failure", action.payload);
    },
    serverChanged: (leases, action) => {
      leases.list = [];
      leases.loaded = false;
      leases.updated = false;
    },
  },
});

export const {
  loadStarted,
  leasesLoaded,
  notLoaded,
  updateStarted,
  updateSuccess,
  updateFailed,
  serverChanged,
} = slice.actions;

export default slice.reducer;

// Action Creators
// const url = "/dhcp4";

const DEF_TOAST_LOAD = createToastObject(
  "Leases loaded",
  "FAST_STATUS",
  "Could not load leases"
);

export const loadLeases = (toastInfo = DEF_TOAST_LOAD) => (
  dispatch,
  getState
) => {
  // ******************************************************************
  // Get all leases.
  // Fast DHCP API Endpoint: /dhcp4/leases
  // ******************************************************************

  const api = getApiFromId("API_MGR_GET_LEASES");
  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      // data: subnet,
      onStart: loadStarted.type,
      onSuccess: leasesLoaded.type,
      onError: notLoaded.type,
      apiType: "DHCPMGR_API",
      toastInfo: toastInfo,
    })
  );
};

export const deleteLease = (input) => (dispatch, getState) => {
  // ******************************************************************
  // Delete a lease with a particular IP.
  // Fast DHCP API Endpoint: /dhcp4/lease/delete
  // ******************************************************************

  const api = getApiFromId("API_MGR_DEL_LEASE");
  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      data: input,
      onStart: updateStarted.type,
      onSuccess: updateSuccess.type,
      onError: updateFailed.type,
      apiType: "DHCPMGR_API",
      toastInfo: createToastObject(
        "Lease deleted",
        "FAST_STATUS",
        "Could not delete leases"
      ),
    })
  );
};

export const addLease = (input) => (dispatch, getState) => {
  // ******************************************************************
  // Add a lease
  // Fast DHCP API Endpoint: /dhcp4/lease/add
  // ******************************************************************
  const api = getApiFromId("API_MGR_ADD_LEASE");
  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      data: input,
      onStart: updateStarted.type,
      onSuccess: updateSuccess.type,
      onError: updateFailed.type,
      apiType: "DHCPMGR_API",
      toastInfo: createToastObject(
        "Lease added",
        "FAST_STATUS",
        "Could not add leases"
      ),
    })
  );
};

export const updateLease = (input) => (dispatch, getState) => {
  // ******************************************************************
  // Modify a lease
  // Fast DHCP API Endpoint: /dhcp4/lease/update
  // ******************************************************************
  const api = getApiFromId("API_MGR_MOD_LEASE");
  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      data: input,
      onStart: updateStarted.type,
      onSuccess: updateSuccess.type,
      onError: updateFailed.type,
      apiType: "DHCPMGR_API",
      toastInfo: createToastObject(
        "Lease updated",
        "FAST_STATUS",
        "Could not update leases"
      ),
    })
  );
};

export const wipe = (input) => (dispatch, getState) => {
  // ******************************************************************
  // Wipe all leases for a subnet.
  // Fast DHCP API Endpoint: /dhcp4/lease/wipe
  // ******************************************************************

  const api = getApiFromId("API_MGR_WIP_LEASE");
  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      data: input,
      onStart: updateStarted.type,
      onSuccess: updateSuccess.type,
      onError: updateFailed.type,
      apiType: "DHCPMGR_API",
      toastInfo: createToastObject(
        "Lease wiped",
        "FAST_STATUS",
        "Could not wipe leases"
      ),
    })
  );
};

export const resetLeases = () => (dispatch, getState) => {
  // ******************************************************************
  // Reset leases store.
  // ******************************************************************
  dispatch({ type: serverChanged.type, payload: {} });
};
