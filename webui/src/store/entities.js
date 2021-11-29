import { combineReducers } from "redux";
import configReducer from "./configs";
import subnetReducer from "./subnets";
import dhcpdumpReducer from "./dhcpdump";
import userReducer from "./users";
import leasesReducer from "./leases";
import rawapiReducer from "./rawapi";
import dashboardReducer from "./dashboard";
import clientclassesReducer from "./clientclasses";
import labReducer from "./labs";
import logReducer from "./logs";

export default combineReducers({
  configs: configReducer,
  dashboard: dashboardReducer,
  labs: labReducer,
  subnets: subnetReducer,
  dhcpdump: dhcpdumpReducer,
  users: userReducer,
  leases: leasesReducer,
  rawapi: rawapiReducer,
  clientclasses: clientclassesReducer,
  logs: logReducer,
});
