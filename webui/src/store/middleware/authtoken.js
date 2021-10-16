import axios from "axios";
import * as actions from "../api";
import jwtDecode from "jwt-decode";
import { getLabConfig } from "../labs";
import { getCurrentUser } from "../users";
import { getConfig } from "../configs";
import {
  getAuthTokenForServer,
  removeSessionToken,
  removeAuthTokens,
  getAPIKey,
} from "../../services/authService";

import { toast } from "react-toastify";

const authtoken = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  let authToken = null;

  if (!action.payload.serverCheckUrl) {
    try {
      const labState = dispatch(getLabConfig());
      const currentUser = dispatch(getCurrentUser());
      const config = dispatch(getConfig());
      const server = labState.currentServer;

      console.log("labState", labState, currentUser, server, config);
    //   let role = "user";
    //   if (currentUser.isAdmin) role = "admin";

      let apiKey = getAPIKey(config, server);

      if (apiKey) {
        console.log("-->> Use API Key for fast authentication");
        authToken = apiKey;
      }

      // Use API Key if provided, else use auth-token recieved
      // from fastdhcp.
      else {
        console.log("-->> Use Auth-Token for fast authentication");
        try {
          authToken = getAuthTokenForServer(server.id);
          const authSession = jwtDecode(authToken);
          const now = new Date().getTime();

          console.log("authToken", authToken, authSession.exp, now);

          if (authSession.exp < now / 1000) {
            console.log("-->> Auth-Token Expired. Relogin and retry");
            toast.info("Auth token expired. Relogin and retry");
            removeSessionToken();
            removeAuthTokens();
            window.location = "/";
          }
        } catch (error) {
          console.log("-->> No Auth Token found for this user");
          // toast.info("No auth token found");
        } finally {
          console.log("Fast Auth Token: ", authToken);
        }
      }
    } catch (error) {
      console.log("Error", error.message);
    }

    // GET Requests requires apikey as params
    if (action.payload.apiType == "SERVER_STATUS_CHECK"){
        console.log("apikey not required for this api")
    }
    else if (action.payload.method == "GET"){
      let params = "?apikey=" + authToken;
      action.payload.url += params;
      console.log("GET Request Updated", action.payload.url)
    }
    else{
        // POST Requests accepts apikeys in payload.
        let pl = action.payload.data;
        pl = {...pl, "apikey": authToken };
        action.payload.data = pl;
        console.log("POST Request Updated", action.payload.data)
    }
    
    // axios.defaults.headers.common["auth-token"] = authToken;
  }

  return next(action);
};

export default authtoken;
