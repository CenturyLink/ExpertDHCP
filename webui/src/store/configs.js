import { createSlice } from "@reduxjs/toolkit";
import { initialized } from "./labs";
import { createServers, makeUrlString } from "../services/serverService";
import { getConfigPath, getApiKeyPath } from "../services/utilityService";
import { localStorageServerId, localStorageLabId } from "../config/config.json";

// createSlice = createAction + createReducer
const slice = createSlice({
  name: "configs",
  initialState: {
    ready: false,
    configReady: false,
    apiKeysReady: false,
    authServerUrl: "",
    useCsvAuth: false,
    apiKeys: {},
    currentServerApiKey: "",
  },

  reducers: {
    configReadStarted: (configs, action) => {
      configs.ready = false;
      configs.useCsvAuth = false;
    },
    configRead: (configs, action) => {
      configs.authServerUrl = action.payload.authServerUrl;
      configs.useCsvAuth = action.payload.useCsvAuth;
      configs.configReady = true;
      if (configs.apiKeysReady) {
        configs.ready = true;
        console.log("Reducer <configRead>: Config & apiKeys files read.");
      }
    },
    apiKeysRead: (configs, action) => {
      configs.apiKeys = action.payload.apiKeys;
      configs.apiKeysReady = true;
      if (configs.configReady) {
        configs.ready = true;
        console.log("Reducer <apiKeysRead>: Config & apiKeys files read.");
      }
    },
    gotCurrentServerApiKey:(configs, action) => {
        configs.currentServerApiKey = action.payload.key;
    }
  },
});

export const { configReadStarted, 
            configRead, apiKeysRead, gotCurrentServerApiKey } = slice.actions;

export default slice.reducer;

// Action Creators
export const loadConfig = () => (dispatch, getState) => {
  // ************************************************************
  // Loads apiKeys.json and config.json files to the redux store.
  // ************************************************************
  dispatch({ type: configReadStarted.type, payload: {} });

  const apiKeysFile = getApiKeyPath();

  fetch(apiKeysFile)
    .then((r) => r.text())
    .then((data) => {
      let apikeys = {};
      try {
        apikeys = JSON.parse(data);
        console.log(`Parsed ${configFile} file as JSON.`, data);
      } catch (error) {
        console.log("Parse the response as JSON, but it’s not JSON ", error);
        console.log(`Contents of ${apiKeysFile} ==>> `, data);
      }

      dispatch({
        type: apiKeysRead.type,
        payload: { apiKeys: apikeys },
      });
    });

  const configFile = getConfigPath();

  fetch(configFile)
    .then((r) => r.text())
    .then((data) => {
      let config = {};
      try {
        config = JSON.parse(data);
        console.log(`Parsed ${configFile} file as JSON.`, data);
      } catch (error) {
        console.log("Parse the response as JSON, but it’s not JSON ", error);
        console.log(`Contents of ${configFile} ==>> `, data);
      }

      dispatch({
        type: configRead.type,
        payload: {
          authServerUrl: config.authServerUrl,
          useCsvAuth: config.useCsvAuthForMaster,
        },
      });
      //labs.list
      const labs = config.labs;
      const defaultLab = config.defaults.lab;
      const defaultServer = config.defaults.server;

      //labs.currentLab
      let currentLab = {};
      let labId;

      if (labs) {
        try {
          labId = localStorage.getItem(localStorageLabId);
          if (!labId) labId = defaultServer.labId;
          currentLab = labs.find((lab) => lab.id === labId);
        } catch (error) {
          currentLab = labs.find((lab) => lab.id === defaultLab);
        }
        try {
          if (!currentLab) currentLab = labs[0];
        } catch (error) {
          console.error("Incorrect Configuration file. ");
        }
      }

      // labs.servers
      const servers = createServers(currentLab);

      // lab.currentServer
      let currentServer = {};
      if (servers) {
        try {
          const dhcpServId = localStorage.getItem(localStorageServerId);
          currentServer = servers.find((serv) => serv.id === dhcpServId);
        } catch (error) {
          currentServer = servers.find((serv) => serv.id === defaultServer);
        }

        try {
          if (!currentServer) {
            currentServer = servers.find(
              (serv) => serv.id === currentLab.servers[0].id
            );
          }
        } catch (error) {
          console.error("Incorrect Configuration file. ");
        }
      }

      //labs.dhcpServerUrl
      const dhcpServerUrl = makeUrlString(currentServer.ip, currentServer.port);
      const dhcpMonitorUrl = makeUrlString(
        currentServer.ip,
        currentServer.dhcpMonitorPort
      );

      dispatch({
        type: initialized.type,
        payload: {
          list: labs,
          currentLab,
          servers,
          currentServer,
          dhcpServerUrl,
          dhcpMonitorUrl,
        },
      });
    });
};

export const getConfig = () => (dispatch, getState) => {
  // ************************************************************
  // Returns the configs in the current redux state.
  // ************************************************************
  const state = getState();
  return state.entities.configs;
};

export const updateCurrentKey = (apiKey) => (dispatch, getState) => {
  dispatch({
      type: gotCurrentServerApiKey.type,
      payload: {
        key: apiKey
      }
  })
}
