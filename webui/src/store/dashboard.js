import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { getApiFromId } from "../services/apiService";
import {
  getTotalLeases,
  vendorLookup,
  createToastObject,
} from "../services/utilityService";

// createSlice = createAction + createReducer
const slice = createSlice({
  name: "dashboard",
  initialState: {
    subnets: [],
    clientClasses: [],
    leases: [],
    subnetLeases: {},
    subnetPools: {},
    subnetPoolLeases: {},
    macVendors: {},
    loaded: false, // true either subnets/leases is loaded
    subnetsLoaded: false,
    subnetLoadSuccess: false,
    leasesLoaded: false,
    leasesLoadSuccess: false,
    processing: false, // to indicate something is in processing.
    macVendorLoading: false,
  },

  reducers: {
    loadStarted: (dashboard, action) => {
      dashboard.processing = true;
      dashboard.loaded = false;
      dashboard.leasesLoaded = false;
      dashboard.subnetsLoaded = false;
      dashboard.subnetLoadSuccess = false;
      dashboard.leasesLoadSuccess = false;
    },

    subnetsLoaded: (dashboard, action) => {
      dashboard.processing = false;
      dashboard.loaded = true;

      try {
        dashboard.subnetsLoaded = true;
        console.log("Subnets loaded", action.payload.data);
        // set subnets from kea config.
        dashboard.subnets =
          action.payload.data.keaConfig[0].arguments.Dhcp4.subnet4;

        // now calculate total number of pools.
        let pools = {};
        for (let subnet of dashboard.subnets) {
          let poolList = [];
          for (let pool of subnet.pools) {
            if (pool.pool) {
              const totalLeases = getTotalLeases(pool.pool);
              poolList.push({ pool: pool.pool, count: totalLeases });
            }
          }
          pools[subnet.id] = poolList;
        }
        dashboard.subnetPools = pools;
        dashboard.clientClasses =
          action.payload.data.keaConfig[0].arguments.Dhcp4["client-classes"];
      } catch (e) {
        console.log("Subnets not loaded");
        dashboard.subnets = [];
        dashboard.clientClasses = [];
        dashboard.subnetsLoaded = true;
        dashboard.loaded = false;
        dashboard.subnetLoadSuccess = true;
      }
    },

    leasesLoaded: (dashboard, action) => {
      dashboard.processing = false;
      dashboard.loaded = true;
      dashboard.leasesLoadSuccess = true;
      console.log("leasesLoaded", action.payload.data.leases);
      try {
        dashboard.leasesLoaded = true;
        dashboard.leases = action.payload.data.leases;
        let subnetLeases = {};
        // Calculate leases allocation per subnets.
        for (let lease of dashboard.leases) {
          let key = lease["subnet-id"];
          if (
            Object.prototype.toString.call(subnetLeases[key]) ===
            "[object Array]"
          ) {
            let temp = [...subnetLeases[key]];
            temp.push(lease);
            subnetLeases[key] = temp;
          } else subnetLeases[key] = [lease];
        }
        dashboard.subnetLeases = subnetLeases;
      } catch (e) {
        dashboard.leases = [];
        dashboard.leasesLoaded = true;
        dashboard.leasesLoadSuccess = false;
      }
    },

    leaseLoadFailed: (dashboard, action) => {
      dashboard.loaded = false;
      dashboard.processing = false;
      dashboard.leasesLoaded = true;
      dashboard.leasesLoadSuccess = false;
    },

    macLookupStarted: (dashboard, action) => {
      dashboard.macVendorLoading = true;
      dashboard.notEvenOneVendor = true;
    },
    macLookupSuccess: (dashboard, action) => {
      dashboard.macVendors = action.payload.data.macVendors;
      dashboard.macVendorLoading = false;
    },
    gotSomeMacVendors: (dashboard, action) => {
      dashboard.macVendors = action.payload;
      dashboard.notEvenOneVendor = false;
    },
    macLookupFailed: (dashboard, action) => {
      dashboard.macVendorLoading = false;
      dashboard.macVendors = {};
    },

    dashboardLoadFailed: (dashboard, action) => {
      dashboard.loaded = false;
      dashboard.processing = false;
      console.log("Dashboard load failed");
      dashboard.subnetsLoaded = true;
    },
    clearDashboard: (dashboard, action) => {
      dashboard.subnets = [];
      dashboard.clientClasses = [];
      dashboard.leases = [];
      dashboard.subnetLeases = {};
      dashboard.subnetPools = {};
      dashboard.macVendors = {};
      dashboard.loaded = false;
      dashboard.subnetsLoaded = false;
      dashboard.leasesLoaded = false;
      dashboard.leasesLoadSuccess = false;
      dashboard.processing = false;
      dashboard.leasesLoadSuccess = false;
    },
  },
});

export const {
  loadStarted,
  subnetsLoaded,
  leasesLoaded,
  dashboardLoadFailed,
  clearDashboard,
  leaseLoadFailed,
  macLookupSuccess,
  macLookupStarted,
  macLookupFailed,
  gotSomeMacVendors,
} = slice.actions;

export default slice.reducer;

// Action Creators

export const loadDashboard = () => (dispatch, getState) => {
  // ******************************************************************
  // Dispatching this will do a get config and prepare all statitics
  // required for dashboard. From Kea Config, It will extract subnets,
  // pools, total leases available, etc. Along with this, get leases
  // API will also be called and calculate leases allocation per subnets.
  // ******************************************************************

  const api = getApiFromId("API_MGR_GET_KEA_CONFIG");
  const leasesApi = getApiFromId("API_MGR_GET_LEASES");

  dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      // data: subnet,
      onStart: loadStarted.type,
      onSuccess: subnetsLoaded.type,
      onError: dashboardLoadFailed.type,
      apiType: "DHCPMGR_API",
      toastInfo: createToastObject(null, "FAST_STATUS", "Config load failed"),
    })
  );

  return dispatch(
    apiCallBegan({
      url: leasesApi.endpoint,
      method: leasesApi.method,
      // data: subnet,
      onStart: loadStarted.type,
      onSuccess: leasesLoaded.type,
      onError: leaseLoadFailed.type,
      apiType: "DHCPMGR_API",
      toastInfo: createToastObject(null, null, "Leases load failed"),
    })
  );
};

export const lookupMAC = (leases) => async (dispatch, getState) => {
  dispatch({
    type: macLookupStarted.type,
    payload: {},
  });

  try {
    const macVendors = await vendorLookup(leases);
    console.log("macVendors-->", macVendors);

    dispatch({
      type: macLookupSuccess.type,
      payload: { data: { macVendors: macVendors } },
    });
  } catch (error) {
    console.log("Error in mac vendor lookup", error.message);
    dispatch({
      type: macLookupFailed.type,
      payload: {},
    });
  }
};

export const lookupMAC2 = (leases) => (dispatch, getState) => {
  // ******************************************************************
  // This will do a lookup for vendor details for all the hardware
  // addresses given in the leases. This will request backend to Provide
  // the data. This is old design and doing the same from frontend
  // is in progress and this will become obsolete.
  // ******************************************************************
  const api = getApiFromId("API_MAC_VENDORS");
  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      data: leases,
      onStart: macLookupStarted.type,
      onSuccess: macLookupSuccess.type,
      onError: macLookupFailed.type,
      apiType: "MAC_LOOKUP_API",
      onSomeResult: gotSomeMacVendors.type,
      toastInfo: createToastObject(null, null, "MAC Lookup failed"),
    })
  );
};

export const clearAll = () => (dispatch, getState) => {
  // ******************************************************
  // Reset all dashboard statitics
  // ******************************************************
  dispatch({ type: clearDashboard.type, payload: {} });
};
