import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { getApiFromId } from "../services/apiService";
import { createToastObject } from "./../services/utilityService";

// createSlice = createAction + createReducer
const slice = createSlice({
  name: "subnets",
  initialState: {
    list: [],
    loaded: false,
    currentSubnet: null,
    clientClasses: [],
    currentClass: null,
    updatedSubnets: false,
    errorResponseData: {},
    errorResponseStatus: {},
  },

  reducers: {
    subnetsLoaded: (subnets, action) => {
      console.log("Subnets loaded", action);
      try {
        subnets.list = action.payload.data.keaConfig[0].arguments.Dhcp4.subnet4;
        subnets.clientClasses =
          action.payload.data.keaConfig[0].arguments.Dhcp4["client-classes"];
        subnets.loaded = true;

        if (subnets.currentSubnet && subnets.currentSubnet.subnet) {
          if (subnets.list) {
            subnets.currentSubnet = subnets.list.find(
              (s) => s.subnet === subnets.currentSubnet.subnet
            );
          } else {
            subnets.currentSubnet = {};
          }
        }
        if (subnets.currentClass && subnets.currentClass.name) {
          if (subnets.clientClasses) {
            subnets.currentClass = subnets.clientClasses.find(
              (cc) => cc.name === subnets.currentClass.name
            );
          } else {
            subnets.currentClass = {};
          }
        }
      } catch (e) {
        subnets.list = [];
        subnets.clientClasses = [];
        subnets.loaded = true;
      }
    },

    notLoaded: (subnets, action) => {
      subnets.loaded = true;
    },

    updateStarted: (subnets, action) => {
      subnets.loaded = false;
      // subnets.currentSubnet = null;
      subnets.updatedSubnets = false;
    },

    subnetChanged: (subnets, action) => {
      if (subnets.list) {
        subnets.currentSubnet = subnets.list.find(
          (s) => s.subnet === action.payload.subnet
        );
      } else {
        subnets.currentSubnet = {};
      }
      subnets.errorResponseStatus = {};
      subnets.errorResponseData = {};
    },

    subnetsModified: (subnets, action) => {
      try {
        console.log("Subnets updated-->>>", action);

        if (action.payload.status === "KO") {
          subnets.loaded = true;
        } else {
          const subnet = action.inputData.subnet_list[0];
          subnets.currentSubnet = subnet;
          subnets.updatedSubnets = true;
        }
      } catch (error) {}
    },
    subnetsDeleted: (subnets, action) => {
      subnets.updatedSubnets = true;
    },

    classChanged: (subnets, action) => {
      subnets.currentClass = action.payload.class;
    },

    serverChanged: (subnets, action) => {
      subnets.list = [];
      subnets.loaded = false;
      subnets.currentSubnet = null;
      subnets.clientClasses = [];
      subnets.currentClass = null;
      subnets.updatedSubnets = false;
    },
  },
});

export const {
  subnetsLoaded,
  subnetChanged,
  subnetsModified,
  notLoaded,
  listUpdated,
  updateStarted,
  classChanged,
  serverChanged,
  subnetsDeleted,
} = slice.actions;

export default slice.reducer;

// Toast defenitions.
const TOAST_SUBNETS_LOAD = createToastObject(
  "Subnets loaded",
  "FAST_STATUS",
  "Unable to load subnets"
);

const TOAST_SUBNETS_MODIFY = createToastObject(
  "Subnet Modified",
  "FAST_STATUS",
  "Unable to modify subnet"
);

const TOAST_SUBNETS_DELETE = createToastObject(
  "Delete successful",
  "FAST_STATUS",
  "Unable to delete subnet"
);

// Action Creators

export const loadSubnets = (toastInfo = TOAST_SUBNETS_LOAD) => (
  dispatch,
  getState
) => {
  // ******************************************************************
  // Get Kea config and loads subnets from it.
  // Fast DHCP API Endpoint: /dhcp4/config
  // ******************************************************************

  const api = getApiFromId("API_MGR_GET_KEA_CONFIG");

  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      // data: subnet,
      onSuccess: subnetsLoaded.type,
      onError: notLoaded.type,
      apiType: "DHCPMGR_API",
      toastInfo: toastInfo,
    })
  );
};

export const modifySubnet = (
  api,
  input_json,
  toastInfo = TOAST_SUBNETS_MODIFY
) => (dispatch, getState) => {
  // ********************************************************************
  // Add or Modify a subnet.
  // Fast DHCP API Endpoint: /dhcp4/subnets/add or /dhcp4/subnets/modify
  // ********************************************************************
  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      data: input_json,
      onStart: updateStarted.type,
      onSuccess: subnetsModified.type,
      apiType: "DHCPMGR_API",
      toastInfo: toastInfo,
    })
  );
};

export const deleteSubnet = (
  api,
  input_json,
  toastInfo = TOAST_SUBNETS_DELETE
) => (dispatch, getState) => {
  // ********************************************************************
  // Delete a subnet.
  // Fast DHCP API Endpoint: /dhcp4/subnets/delete
  // ********************************************************************

  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      data: input_json,
      onStart: updateStarted.type,
      onSuccess: subnetsDeleted.type,
      apiType: "DHCPMGR_API",
      toastInfo: toastInfo,
    })
  );
};
// selectors

export const changeSubnet = (subnet) => (dispatch, getState) => {
  // ********************************************************************
  // Dispatches when user change a subnet selection.
  // ********************************************************************
  dispatch({ type: subnetChanged.type, payload: { subnet: subnet } });
};

export const changeClass = (cc) => (dispatch, getState) => {
  // ********************************************************************
  // Dispatches when user change a client class selection.
  // ********************************************************************

  dispatch({ type: classChanged.type, payload: { class: cc } });
};

export const resetSubnet = () => (dispatch, getState) => {
  // ********************************************************************
  // Reset subnet store
  // ********************************************************************
  dispatch({ type: serverChanged.type, payload: {} });
};
