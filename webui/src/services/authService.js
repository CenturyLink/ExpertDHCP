import jwtDecode from "jwt-decode";
import jwt from "jsonwebtoken";

// Constants
const AUTH_TOKENS = "auth-tokens";
const SESSION_TOKEN = "session-token";
const JWT_SECRET = "0nly4MDHCP-ADMIN2c";

// Set user session token in localStorage
export function setSessionToken(token) {
  if (!token) return false;

  try {
    localStorage.setItem(SESSION_TOKEN, token);
    return true;
  } catch (error) {
    return false;
  }
}

// Remove session token stored in localStorage
export function removeSessionToken() {
  try {
    localStorage.removeItem(SESSION_TOKEN);
  } catch (error) {}
}

// Save auth-tokens in local Storage.
export function setFastAuthTokens(authTokens, username) {
  try {
    const tokens = { ...authTokens };
    tokens["username"] = username;
    localStorage.setItem(AUTH_TOKENS, JSON.stringify(tokens));
    console.log("AuthTokens Stored in localStorage");
    return true;
  } catch (error) {
    console.log("Could not store authtokens", error);
    return false;
  }
}

// Remove auth-tokens from local Storage.
export function removeAuthTokens() {
  try {
    localStorage.removeItem(AUTH_TOKENS);
    console.log("%%%%AuthTokens removed from localStorage");
  } catch (error) {}
  return true;
}

// Extract auth-token for a particular server.
export function getAuthTokenForServer(serverId) {
  console.log("getAuthTokenForServer: ", serverId);
  try {
    let retrievedObject = localStorage.getItem(AUTH_TOKENS);

    let authTokens = JSON.parse(retrievedObject);
    console.log("authTokens", authTokens);
    if (serverId in authTokens) {
      return authTokens[serverId];
    }
    return null;
  } catch (error) {
    console.log("No auth-token found for ", serverId);
    return null;
  }
}

// Retrieves session details from localStorage
export function getSession() {
  let user = "";
  let isAdmin = false;
  let jwt = "";
  let invalidSessionToken = false;

  try {
    jwt = localStorage.getItem(SESSION_TOKEN);
    const jwtContent = jwtDecode(jwt);

    const now = new Date().getTime();

    // check expired token or not.
    if (jwtContent.exp < now / 1000) {
      invalidSessionToken = true;
    }
    user = jwtContent.user;
    isAdmin = jwtContent.isAdmin;
  } catch (error) {
    invalidSessionToken = true;
  }

  if (invalidSessionToken) {
    // session in invalid. remove all tokens from local storage.
    console.log("Session token is invalid/not found.");
    removeSessionToken();
    // removeAuthTokens();
    return { token: jwt, username: user, valid: false };
  } else {
    // Session token is valid.
    console.log("Active session token found");
    return { token: jwt, username: user, valid: true };
  }
}

// Check API Key exists for a server.
export function getAPIKey(configs, server, role = "user") {

  let apikey = configs.apiKeys[server.ip]

  apikey = apikey ? apikey:null

  return apikey;

}

//   if (server.ip in apiKeys) {
    // const keys = apiKeys[server.ip];
    // if (role in keys) {
    //   apiKey = keys[role];
    //   console.log("-->> API key present for this server");
    //   try {
    //     const jwtContent = jwtDecode(apiKey);

    //     const now = new Date().getTime();

    //     // check expired token or not.
    //     if (jwtContent.exp < now / 1000) {
    //       console.log("-->> API key expired", jwtContent.exp);
    //       return null;
    //     }
    //   } catch (error) {}
    // }
//   }
//   if (!apiKey) console.log("-->> No API key found for this server");
//   return apiKey;
// }

export function jwtSign(data) {
  return jwt.sign(data, JWT_SECRET);
}

export function jwtVerify(token) {
  let decoded = null;
  console.log("token: ", token);
  try {
    decoded = jwt.verify(token, JWT_SECRET);
    console.log("decoded: ", decoded);
  } catch (error) {
    console.log("Unable to decode token: ", token, error.message);
  }
  return decoded;
}

// get auth Token for a server and user.
export function getAuthToken(server, username) {
  console.log(
    `-->> Getting Auth-Token for server ${server.ip} user: ${username}`
  );

  if (!server) return null;
  try {
    let retrievedObject = localStorage.getItem(AUTH_TOKENS);

    let authTokens = JSON.parse(retrievedObject);
    console.log("authTokens", authTokens);
    if (server.id in authTokens) {
      const token = authTokens[server.id];
      // validate the authtokens are of the same user.
      if (authTokens["username"] === username) {
        return token;
      } else {
        console.log("Auth token found for different user");
        return null;
      }
    }
    console.log("No auth token found for the user.");
    return null;
  } catch (error) {
    console.log("No auth token found for the user.");
    return null;
  }
}
