import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
// import dummyRows from "./../components/dummyRows";
import { getApiFromId } from "../services/apiService";
import { createToastObject } from "../services/utilityService";

// createSlice = createAction + createReducer
const slice = createSlice({
  name: "dhcpdump",
  initialState: {
    rows: [],
    triggered: false,
    fetching: false,
    loading: false,
    rowCount: 0,
    context: {
      boxes: [],
      pageSize: 7,
      selectedRow: -1,
    },
  },

  reducers: {
    statusCheckStarted: (dhcpdump, action) => {
      dhcpdump.triggered = false;
    },

    statusRecieved: (dhcpdump, action) => {
      dhcpdump.triggered = action.payload.triggered;
    },

    triggered: (dhcpdump, action) => {
      console.log("triggered");
      dhcpdump.triggered = true;
    },
    triggerFailed: (dhcpdump, action) => {
      console.log("trigger failed", action);
      dhcpdump.triggered = false;
    },
    cancelled: (dhcpdump, action) => {
      dhcpdump.triggered = false;
    },

    loadStarted: (dhcpdump, action) => {
      dhcpdump.loading = true;
    },

    loadComplete: (dhcpdump, action) => {
      dhcpdump.loading = false;
    },

    rowCountRecieved: (dhcpdump, action) => {
      // if (action.payload.status) {
      if (typeof action.payload.data === "number") {
        console.log("Rowcount recieved", action.payload);
        dhcpdump.rowCount = action.payload.data;
      }

      dhcpdump.triggered = action.payload.triggered;
      // }
    },

    recievedRows: (dhcpdump, action) => {
      console.log("action.payload", action.payload);
      dhcpdump.rows = action.payload;
      // dhcpdump.rows = dummyRows;
      dhcpdump.loading = false;
    },

    contextChanged: (dhcpdump, action) => {
      dhcpdump.context[action.payload.item] = action.payload.value;
    },
  },
});

export const {
  statusCheckStarted,
  statusRecieved,
  triggered,
  triggerFailed,
  cancelled,
  recievedRows,
  loadStarted,
  loadComplete,
  rowCountRecieved,
  contextChanged,
} = slice.actions;

export default slice.reducer;

// Action Creators

export const getDumpCollectionStatus = () => (dispatch, getState) => {
  // ******************************************************************
  // Checks if dump collection is triggered or not.
  // Fast DHCP API Endpoint: /monitor/status.
  // ******************************************************************

  const api = getApiFromId("API_MON_GET_TRIGGER_STATUS");
  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      dhcpdump: true,
      onStart: statusCheckStarted.type,
      onError: statusCheckStarted.type,
      onSuccess: statusRecieved.type,
      apiType: "DHCPMON_API",
      toastInfo: createToastObject(
        null,
        null,
        "Unable to reach DHCP Monitor",
        "trigger status"
      ),
    })
  );
};

export const trigger = () => (dispatch, getState) => {
  // ******************************************************************
  // Start DHCP dump collection.
  // Fast DHCP API Endpoint: /monitor/trigger.
  // ******************************************************************

  const api = getApiFromId("API_MON_TRIGGER_COLLECTION");
  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      dhcpdump: true,
      onSuccess: triggered.type,
      onError: triggerFailed.type,
      apiType: "DHCPMON_API",
      toastInfo: createToastObject(
        "DHCP dump collection started",
        "FAST_STATUS",
        "Trigger failed",
        "trigger"
      ),
    })
  );
};

export const terminate = () => (dispatch, getState) => {
  // ******************************************************************
  // Stop DHCP dump collection.
  // Fast DHCP API Endpoint: /monitor/terminate.
  // ******************************************************************

  const api = getApiFromId("API_MON_STOP_COLLECTION");
  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      dhcpdump: true,
      onSuccess: cancelled.type,
      apiType: "DHCPMON_API",
      toastInfo: createToastObject(
        "DHCP dump collection stopped",
        "FAST_STATUS",
        "Dump collection stop failed",
        "stop trigger"
      ),
    })
  );
};

export const getRowCount = () => (dispatch, getState) => {
  // ******************************************************************
  // Gets number of packets collected so far.
  // Fast DHCP API Endpoint: /monitor/row_count
  // ******************************************************************

  const api = getApiFromId("API_MON_GET_ROW_COUNT");
  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      dhcpdump: true,
      onSuccess: rowCountRecieved.type,
      apiType: "DHCPMON_API",
      // since we call trigger status and this APIs together, we can ignore the
      // error case.
      toastInfo: createToastObject(null, null, "IGNORE_ERROR", "row count"),
    })
  );
};

export const getRows = (offset, count) => (dispatch, getState) => {
  // ******************************************************************
  // Gets n number of packets from an offset.
  // Fast DHCP API Endpoint: /monitor/row_count
  // ******************************************************************

  const api = getApiFromId("API_MON_GET_ROWS");
  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      data: {
        offset: offset,
        count: count,
      },
      dhcpdump: true,
      onStart: loadStarted.type,
      onError: loadComplete.type,
      onSuccess: recievedRows.type,
      apiType: "DHCPMON_API",
      toastInfo: createToastObject(
        null,
        null,
        "Unable to get dump packets",
        "get rows"
      ),
    })
  );
};

// selectors

export const changeContext = (item, value) => (dispatch, getState) => {
  // ******************************************************************
  // Save and update current context of DHCP dump.
  // ******************************************************************

  dispatch({
    type: contextChanged.type,
    payload: { item: item, value: value },
  });
};
