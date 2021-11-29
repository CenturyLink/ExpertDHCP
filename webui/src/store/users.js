import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import { getAllServers } from "../services/serverService";
import { getApiFromId } from "../services/apiService";
import { toast } from "react-toastify";
import {
  GetCsvtData,
  getUsersCsvPath,
  createToastObject,
} from "../services/utilityService";
import {
  jwtSign,
  jwtVerify,
  getSession,
  setSessionToken,
  setFastAuthTokens,
  removeAuthTokens,
  removeSessionToken,
} from "../services/authService";

let bcrypt = require('bcryptjs');

// createSlice = createAction + createReducer
const slice = createSlice({
  name: "users",
  initialState: {
    config: null,
    logingOn: false,
    loginSuccess: false, // Authentication and authorization success.
    authenticated: false, // Master DHCP auth by Mongo/CSV file sucess. This triggers fast auth.
    authorized: false, // Fast DHCP authorization success.
    currentUser: getSession(), // Current MasterDHCP username.
    registered: false,
    authTokens: null,
    tempCreds: "",
    gettingUser: false,
  },

  reducers: {
    loginStarted: (users, action) => {
      // remvove existing session details.
      users.logingOn = true;
      users.loginSuccess = false;
      users.authenticated = false;
      users.authorized = false;
      users.currentUser = null;
    },
    loginSuccess: (users, action) => {
      try {
        const sessionToken = action.payload.data.sessionToken;
        setSessionToken(sessionToken);
        users.authenticated = true;
        users.currentUser = {
          username: action.inputData.username,
          isAdmin: action.inputData.isAdmin,
          sessionToken: sessionToken,
        };
        users.tempCreds = action.inputData.password;
      } catch (error) {
        users.authenticated = false;
        users.tempCreds = "";
      }
    },
    loginSuccessMongo: (users, action) => {
      console.log("Payload, input", action.payload, action.inputData);
      try {
        const sessionToken = action.payload.data.sessionToken;
        setSessionToken(sessionToken);
        users.authenticated = true;
        users.currentUser = {
          username: action.inputData.username,
          isAdmin: action.payload.data.isAdmin,
          sessionToken: action.payload.data.sessionToken,
        };
        users.tempCreds = action.inputData.password;
      } catch (error) {
        users.authenticated = false;
        users.tempCreds = "";
      }
    },
    loginFailed: (users, action) => {
      users.authenticated = false;
      users.loginSuccess = false;
      users.tempCreds = "";
      users.logingOn = false;
    },
    authStarted: (users, action) => {
      users.logingOn = true;
      users.authorized = false;
    },
    authSuccess: (users, action) => {
      const payloadData = action.payload.data;
      users.authTokens = payloadData.authTokens;
      // store the token and user in localStorage
      const success = setFastAuthTokens(users.authTokens, payloadData.username);
      if (success) users.authorized = true;
      else users.authorized = false;
      users.loginSuccess = true;
      users.logingOn = false;
    },
    authFailed: (users, action) => {
      users.authorized = false;
      users.logingOn = false;
    },
    apiKeysUsed: (users, action) => {
      users.loginSuccess = true;
      users.logingOn = false;
    },
    registered: (users, action) => {
      users.registered = true;
    },
    getUserStarted: (users, action) => {
      users.logingOn = true;
      users.loginSuccess = false;
      users.authenticated = false;
      users.authorized = false;
      users.currentUser = null;
      users.gettingUser = true;
    },
    gotUser: (users, action) => {
      users.logingOn = false;
      users.gettingUser = false;
      if (action.payload.status == "KO") {
        removeSessionToken();
        // removeAuthTokens();
        window.location = "/";
      }
      users.currentUser = action.payload.data.data;
      if (users.currentUser) users.loginSuccess = true;
    },
    gotNoUser: (users, action) => {
      users.logingOn = false;
      users.gettingUser = false;
      removeSessionToken();
    //   removeAuthTokens();
      // window.location = "/";
    },

    tokenGetStarted: (users, action) => {
      users.gotAuthToken = false;
    },
    gotToken: (users, action) => {
      users.gotAuthToken = true;
      const authToken = action.payload.data.token;
      console.log("Setting token", authToken);
      localStorage.setItem("auth-token", authToken);
    },
    gotNoToken: (users, action) => {
      users.gotAuthToken = false;
      localStorage.setItem("auth-token", "null");
    },

    resetUser: (users, action) => {
      users.authenticated = false;
      users.loginSuccess = false;
      users.tempCreds = "";
      users.logingOn = false;
    },
    configLoaded: (labs, action) => {
      labs.config = action.payload.config;
    },
  },
});

export const {
  loginStarted,
  loginSuccess,
  loginSuccessMongo,
  loginFailed,
  authStarted,
  authSuccess,
  authFailed,
  registered,
  gotUser,
  gotNoUser,
  getUserStarted,
  resetUser,
  gotToken,
  gotNoToken,
  tokenGetStarted,
  configLoaded,
  apiKeysUsed,
} = slice.actions;

export default slice.reducer;

// Action Creators

export const loginUser = (creds) => async (dispatch, getState) => {
  // ******************************************************************
  // This action will be dispatched upon entering user credentials on
  // login form. This will validate the username and password either
  // in users.csv or in mongodb based on configurations.
  // ******************************************************************

  const tokenApi = getApiFromId("API_MGR_GET_TOKEN");
  const state = getState();
  const url = state.entities.labs.dhcpServerUrl + tokenApi.endpoint;
  const useCsv = state.entities.configs.useCsvAuth;

  if (useCsv) {
    // Need to dispatch loginStarted separatly as we are not going
    // through the middleware.

    console.log("Using CSV file authentication.");

    let notLoggedIn = false;

    dispatch({
      type: loginStarted.type,
      payload: {},
    });
    // get the users data store in public csv folder.
    const csv = await GetCsvtData(getUsersCsvPath());

    try {
      let userFound = false;

      for (let user of csv.data) {
        if (creds["username"] === user[0]) {
          userFound = true;
          const doesPasswordMatch = bcrypt.compareSync(creds["password"] , user[1])
          console.log("PASSWORD MATCH???", doesPasswordMatch)
          if (doesPasswordMatch) {
            console.log("Authenticated using csv file");

            const isAdmin = user[2] === 0 ? false : true;

            // create session token with 30 mins expiry.
            const data = {
              user: user[0],
              isAdmin: isAdmin,
              exp: Math.floor(Date.now() / 1000) + 60 * 30,
            };

            const sessionToken = jwtSign(data);

            // Master session login success. Dispatch loginSuccess with the
            // sessionToken and all.

            dispatch({
              type: loginSuccess.type,
              payload: { data: { sessionToken: sessionToken } },
              inputData: {
                username: user[0],
                password: user[1],
                isAdmin: isAdmin,
              },
            });

            // This api will further call getToken api for all
            // the active servers to retieve auth tokens.
            // const api = getApiFromId("API_GET_AUTH_TOKENS");
          } else {
            notLoggedIn = true;
          }
          break;
        }
      }
      if (!userFound) {
        notLoggedIn = true;
      }
    } catch (error) {
      notLoggedIn = true;
    }

    if (notLoggedIn) {
      toast.error("Incorrect Username or Password");
      dispatch({
        type: loginFailed.type,
        payload: {},
      });
    }
  } else {
    // --------- Authenticate using MONGODB -------------

    // creds contain username and password. But it also requires the
    // fastDHCP server url for requesting the auth token once
    // authenticated.
    creds["url"] = url;

    const api = getApiFromId("API_AUTH_VALIDATE_USER");

    return dispatch(
      apiCallBegan({
        url: api.endpoint,
        method: api.method,
        data: creds,
        onStart: loginStarted.type,
        onSuccess: loginSuccessMongo.type,
        onError: loginFailed.type,
        apiType: "DHCPAUTH_API",
        authApi: true,
        toastInfo: createToastObject(null, "FAST_STATUS", "FAST_STATUS"),
      })
    );
  }
};

export const getAuthTokens = () => (dispatch, getState) => {
  // ******************************************************************
  // Login process won't be complete untill we collect required fast
  // authentication token for this user & server. This action will be
  // dispatched upon successful user authentication. Auth tokens will
  // be collected for each active server and store it in local Storage.
  // ******************************************************************

  const state = getState();
  const labs = state.entities.labs.list;
  const allServers = getAllServers(labs);
  const api = getApiFromId("API_GET_AUTH_TOKENS");

  const user = state.entities.users;

  const tokenApi = getApiFromId("API_MGR_GET_TOKEN");

  // Prepare payload
  const payload = {
    username: user.currentUser.username,
    password: user.tempCreds,
    servers: allServers,
    endpoint: tokenApi.endpoint,
  };

  // This api will further call getToken api for all
  // the active servers to retieve auth tokens.

  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      data: payload,
      onStart: authStarted.type,
      onSuccess: authSuccess.type,
      onError: authFailed.type,
      apiType: "DHCPAUTH_API",
      toastInfo: createToastObject(
        "Login Successful",
        "FAST_STATUS",
        "Login failed"
      ),
    })
  );
};

export const setLoginSuccess = () => (dispatch, getState) => {
  // ******************************************************************
  // Manually sets login success. If API Keys are present for all
  // servers, then getAuthToken is not actually necessary. In such
  // cases we can set the login success. However this concept is not
  // used anywhere. Master DHCP always collect as many auth-tokens as
  // as possible upon successful user authenitication.
  // ******************************************************************
  dispatch({
    type: apiKeysUsed.type,
    // payload: { data: { authTokens: authTokens, username: username } },
    payload: {},
  });
};

export const getUser = (sessionToken) => async (dispatch, getState) => {
  // ******************************************************************
  // This is dispatched when Master finds a valid session-token and.This 
  // will check the user is actually there in the database (or users.csv)
  // and confirm session validity.
  // ******************************************************************

  const state = getState();
  const useCsv = state.entities.configs.useCsvAuth;

  if (useCsv) {
    console.log("-->> checking user exists in csv file.");

    const csv = await GetCsvtData(getUsersCsvPath());

    dispatch({
      type: getUserStarted.type,
      payload: {},
    });

    try {
      let userFound = false;
      let token = jwtVerify(sessionToken.sessionToken);
      let username = token.user;
      let isAdmin = token.inAdmin;

      for (let user of csv.data) {
        if (username === user[0]) {
          console.log("Username found in csv file..");
          userFound = true;
          user = {
            username: username,
            isAdmin: isAdmin,
            sessionToken: sessionToken,
          };

          dispatch({
            type: gotUser.type,
            payload: { data: { data: user }, status: "OK" },
          });

          break;
        }
      }
      if (!userFound) {
        dispatch({
          type: gotNoUser.type,
          payload: {status: "KO"},
        });
      }
    } catch (error) {
      dispatch({
        type: gotNoUser.type,
        payload: {status: "KO"},
      });
    }
  } else {
    console.log("-->> checking user exists in mongo.");

    const api = getApiFromId("API_AUTH_GET_USER_DETAILS");
    return dispatch(
      apiCallBegan({
        url: api.endpoint,
        method: api.method,
        data: sessionToken,
        onStart: getUserStarted.type,
        onSuccess: gotUser.type,
        onError: gotNoUser.type,
        apiType: "DHCPAUTH_API",
        toastInfo: createToastObject(null, null, null),
      })
    );
  }
};

export const registerUser = (user) => (dispatch, getState) => {
  // ******************************************************************
  // Dispatched on a new registration. Register feature is pulled out
  // from Master DHCP and this action is no longer used.
  // ******************************************************************
  const api = getApiFromId("API_AUTH_ADD_USER");
  return dispatch(
    apiCallBegan({
      url: api.endpoint,
      method: api.method,
      data: user,
      toastRespStatus: true,
      onSuccess: registered.type,
      apiType: "DHCPAUTH_API",
      toastInfo: createToastObject(
        "User added",
        "FAST_STATUS",
        "Registration failed"
      ),
    })
  );
};

export const resetUserDetails = () => (dispatch, getState) => {
  // ******************************************************************
  // Dispatched upon logout. Resets the flags.
  // ******************************************************************
  dispatch({ type: resetUser.type, payload: {} });
};

export const getCurrentUser = () => (dispatch, getState) => {
  // ******************************************************************
  // Returns the current user object.
  // ******************************************************************
  const state = getState();
  return state.entities.users ? state.entities.users.currentUser : {};
};
