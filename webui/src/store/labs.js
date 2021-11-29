import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { getApiFromId } from "../services/apiService";
import { createServers, makeUrlString } from "../services/serverService";
import { createToastObject } from "../services/utilityService";
import { localStorageLabId, localStorageServerId } from "../config/config.json";

// createSlice = createAction + createReducer
const slice = createSlice({
  name: "labs",
  initialState: {
    initialized: false,
    list: [],
    currentLab: {},
    servers: [],
    currentServer: {},
    serverStatus: {},
    currentTab: "SUBNETS",
    dhcpServerUrl: "",
    dhcpMonitorUrl: "",
  },

  reducers: {
    startedInit: (labs, action) => {
      labs.initialized = false;
    },
    // this is dispatched from store config. Values in the
    // config.json are tranfered here.
    initialized: (labs, action) => {
      const {
        list,
        currentLab,
        servers,
        currentServer,
        dhcpServerUrl,
        dhcpMonitorUrl,
      } = action.payload;
      labs.list = list;
      labs.currentLab = currentLab;
      labs.servers = servers;
      labs.currentServer = currentServer;
      labs.dhcpServerUrl = dhcpServerUrl;
      labs.dhcpMonitorUrl = dhcpMonitorUrl;
      labs.initialized = true;
    },

    labChanged: (labs, action) => {
      if (labs.list) {
        labs.currentLab = labs.list.find((lb) => lb.id === action.payload.id);
      }
      labs.servers = createServers(labs.currentLab);
    },

    serverChanged: (labs, action) => {
      if (labs.servers) {
        labs.currentServer = labs.servers.find(
          (serv) => serv.id === action.payload.serverId
        );
      }

      labs.dhcpServerUrl = makeUrlString(
        labs.currentServer.ip,
        labs.currentServer.port
      );
      labs.dhcpMonitorUrl = makeUrlString(
        labs.currentServer.ip,
        labs.currentServer.dhcpMonitorPort
      );
    },

    tabChanged: (labs, action) => {
      labs.currentTab = action.payload.tab;
    },
    serverCheckSuccess: (labs, action) => {
      const status = { ...labs.serverStatus };
      status[action.server] = true;
      labs.serverStatus = status
    },
    serverCheckFailed: (labs, action) => {
      const status = { ...labs.serverStatus };
      status[action.server] = false;
      labs.serverStatus = status
    },
  },
});

export const {
  startedInit,
  initialized,
  gotApiKeys,
  configLoaded,
  labsLoaded,
  labChanged,
  serverChanged,
  tabChanged,
  serverCheckSuccess,
  serverCheckFailed,
} = slice.actions;

export default slice.reducer;

// Action Creators
// const url = "/dhcp4";

export const changeLab = (labKey) => (dispatch, getState) => {
  // ******************************************************************
  // Dispatched when user changes the Lab. This sets the currentLab.
  // ******************************************************************
  dispatch({ type: labChanged.type, payload: { id: labKey } });
};

export const changeServer = (serverId, labId) => (dispatch, getState) => {
  // ********************************************************************
  // Changes current server and labs. Updates ids in local storage.
  // ********************************************************************
  dispatch({
    type: serverChanged.type,
    payload: { serverId: serverId },
  });
  dispatch({ type: labChanged.type, payload: { id: labId } });
  localStorage.setItem(localStorageServerId, serverId);
  localStorage.setItem(localStorageLabId, labId);
};

export const changeTab = (tab) => (dispatch, getState) => {
  // ********************************************************************
  // Updates current tab when user switches tabs.
  // ********************************************************************
  dispatch({ type: tabChanged.type, payload: { tab: tab } });
};

export const getServerUrl = () => (dispatch, getState) => {
  // ********************************************************************
  // Return DHCP Server base url.
  // ********************************************************************
  const state = getState();
  return state.entities.labs ? state.entities.labs.dhcpServerUrl : "";
};

export const getMonitorUrl = () => (dispatch, getState) => {
  // ********************************************************************
  // Return DHCP Monitor base url.
  // ********************************************************************
  const state = getState();
  return state.entities.labs ? state.entities.labs.dhcpMonitorUrl : "";
};

export const getCurrentServer = () => (dispatch, getState) => {
  // ********************************************************************
  // Return current server object.
  // ********************************************************************
  const state = getState();
  return state.entities.labs ? state.entities.labs.currentServer : {};
};

export const getLabConfig = () => (dispatch, getState) => {
  // ********************************************************************
  // Return lab object from the store.
  // ********************************************************************
  const state = getState();
  return state.entities.labs;
};

export const getAPIKeys = () => (dispatch, getState) => {
  // ********************************************************************
  // Returns API keys.
  // ********************************************************************
  const state = getState();
  return state.entities.labs ? state.entities.labs.apiKeys : {};
};

// Action Creators

export const getServerStats = (servers) => async (dispatch, getState) => {
  // ********************************************************************
  // This will be dispatched along with loading dashboard. This will
  // return the statuses of all the DHCP servers configured.
  // ********************************************************************
//   const api = getApiFromId("API_CHK_SERVERS");
//   const state = getState();

  const api = getApiFromId("API_MGR_CHK_SERVER");

  for (let server of servers){
      dispatch(
        apiCallBegan({
          url: api.endpoint,
          method: api.method,
          data: {},
          onSuccess: serverCheckSuccess.type,
          onError: serverCheckFailed.type,
          apiType: "SERVER_STATUS_CHECK",
          serverDetails: server,
          toastInfo: createToastObject(null, null, "IGNORE_ERROR"),
        })
      );
  }

  return;
};
