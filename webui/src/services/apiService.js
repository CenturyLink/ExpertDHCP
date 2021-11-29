import { apis, apiGroups } from "../config/config.json";

export function getAxiosOptions() {
  // Returns options required for axios request.
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS, PUT",
      "Access-Control-Expose-Headers": "auth-token",
    },
  };
  return options;
}

export function getRawApis() {
  // returns raw apis configured in config file.
  let rawApis = [];
  try {
    const rawApiIds = apiGroups["rawApis"];
    const allApis = [...apis];
    if (!allApis) return [];
    let item;
    for (let apiId of rawApiIds) {
      item = allApis.find((api) => api.id === apiId);
      rawApis.push(item);
    }
  } catch (error) {
    console.log("Unable to get raw APIs from config file", error);
  }

  return rawApis;
}

export function getApiFromId(id) {
  // return api object from id.
  const allApis = [...apis];
  if (!allApis) return [];

  return allApis.find((api) => api.id === id);
}
