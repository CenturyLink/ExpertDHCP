import Papa from "papaparse";
import {
  masterConfigPath,
  configFileName,
  apiKeysFileName,
  usersCsvFileName,
  colorPalette,
  dhcpDumpColumnDef,
} from "../config/config.json";
import { colorPalettes, VendorChart } from "../config/colorPalettes.json";
import ieeeMalCsv from "../registry/ieeemal.csv";
import ieeeMamCsv from "../registry/ieeemam.csv";
import ieeeMasCsv from "../registry/ieeemas.csv";

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function splitOf(str, splitChar) {
  try {
    return str.split(splitChar);
  } catch (error) {
    return [];
  }
}

// converts ip address to hexdecimal number
export function iptohex(ip) {
  try {
    const parts = splitOf(ip, ".");
    if (parts.length >= 4) {
      const hexNumber =
        parseInt(parts[0]) * 256 ** 3 +
        parseInt(parts[1]) * 256 ** 2 +
        parseInt(parts[2]) * 256 ** 1 +
        parseInt(parts[3]);
      const hexString = hexNumber;
      return hexString;
    }
  } catch (error) {
    console.log("Exception in iptohex()", error);
  }
}

// Returns total number of leases in a pool.
// pool: example: "10.189.141.100-10.189.141.150".
export function getTotalLeases(pool) {
  try {
    let ips = splitOf(pool, "-");
    let startIp = iptohex(ips[0]);
    let endIp = iptohex(ips[1]);
    let count = 0;
    let temp,
      list = [],
      str;
    for (let i = startIp; i <= endIp; i++) {
      temp = i.toString(16);
      str = "";
      if (temp.length === 7) {
        temp = "0" + temp;
      }

      for (let k = temp.length - 1; k >= 0; k -= 2) {
        str = parseInt(temp[k - 1] + "" + temp[k], 16) + "." + str;
      }
      // document.write(temp + " " + str+ "<br>");
      count += 1;
      list.push(str.substring(0, str.length - 1));
    }
    return count;
  } catch (error) {
    console.log("Exception in getTotalLeases()", error);
  }
}

// parse and return the csv data. csvFile need to be
// present in the public folder.
export async function GetCsvtData(csvFile) {
  const data = Papa.parse(await fetchCsv(csvFile));
  console.log(data);
  return data;
}

export async function getIeeeCsvData() {
  let ieeeMalData = null;
  let ieeeMamData = null;
  let ieeeMasData = null;
  try {
    const ieeeMalData = await getCsvContent(ieeeMalCsv);
    const ieeeMamData = await getCsvContent(ieeeMamCsv);
    const ieeeMasData = await getCsvContent(ieeeMasCsv);
    return { large: ieeeMalData, medium: ieeeMamData, small: ieeeMasData };
  } catch (error) {
    console.log("Error in creating IEEE Registry data for MAC vendors");
    return { large: ieeeMalData, medium: ieeeMamData, small: ieeeMasData };
  }
}

export function getMacPrefix(macAddress, size) {
  try {
    const splitted = splitOf(macAddress, ":");
    const joined = splitted.join("");
    const prefix = joined.slice(0, size).trim();
    return prefix.toUpperCase();
  } catch (error) {
    console.log("Error in getting lookup prefix for MAC address");
    return null;
  }
}

export async function vendorLookup(leases) {
  let vendors = {};
  let prefix, result, vendor;

  const ieeeCsvRegistry = await getIeeeCsvData();
  console.log("IEEE REGISTRY: ", ieeeCsvRegistry);

  for (let lease of leases) {
    const macAddress = lease["hw-address"];
    if (macAddress) {
      // Check the MAC address in the largest registry.
      prefix = getMacPrefix(macAddress, 6);

      result = ieeeCsvRegistry.large.filter((data) => data[1] === prefix);

      if (result.length === 0) {
        // Address not found in large regisry. Look up medium registry.
        prefix = getMacPrefix(macAddress, 7);
        result = ieeeCsvRegistry.medium.filter((data) => data[1] === prefix);
        if (result.length === 0) {
          // Address not found in medium regisry. Look up small registry.
          prefix = getMacPrefix(macAddress, 9);
          result = ieeeCsvRegistry.small.filter((data) => data[1] === prefix);
        }
        if (result.length === 0) vendor = "Unknown";
      } else vendor = result[0][2];
    } else vendor = result[0][2];

    console.log(`${macAddress} => ${vendor}`);

    vendors[macAddress] = vendor;
  }

  return vendors;
}

async function readChunkByChunk(reader, arr) {
  // "done" is a Boolean and value a "Uint8Array"
  await reader.read().then(async ({ done, value }) => {
    // Is there no more data to read?
    if (done) {
      // We have finished sending data
      console.log("DONE!=>", arr);
      return arr;
    }
    const decoder = new TextDecoder("utf-8");
    const csv = await decoder.decode(value);
    // header = true will make object with keys as headers.
    // header = false will make an array and need to access using index.
    let csvObjectList = Papa.parse(csv, { header: false }).data;
    arr.push.apply(arr, csvObjectList);
    return await readChunkByChunk(reader, arr);
  });

  return arr;
}

export async function getCsvContent(csvFile) {
  // fetch the csvFile and get the readable object.
  // then get the content chunk by chunk.
  return await fetch(csvFile).then(async (response) => {
    const reader = response.body.getReader();
    return await readChunkByChunk(reader, []);
  });
}

export async function fetchCsv(csvFile) {
  const response = await fetch(csvFile);
  console.log("response", response);
  if (response.ok) {
    // We will get only the first chunk there. I the csv
    // file is huge, use the getCsvContent Function which
    // reads all the chunks.
    const reader = response.body.getReader();
    const result = await reader.read();
    console.log("result", result);

    const decoder = new TextDecoder("utf-8");
    const csv = await decoder.decode(result.value);
    return csv;
  }
  return null;
}

export function getIPfromUrl(url) {
  // Extract IP address from URL
  let ip = "";
  try {
    ip = url.split("/").length > 2 ? url.split("/")[2].split(":")[0] : "";
  } catch (error) {
    ip = "";
    console.log(
      "Error occured in extracting IP from base address. ",
      error.message
    );
  }
  return ip;
}

export function getConfigPath() {
  return masterConfigPath + "/" + configFileName;
}

export function getApiKeyPath() {
  return masterConfigPath + "/" + apiKeysFileName;
}

export function getUsersCsvPath() {
  return masterConfigPath + "/" + usersCsvFileName;
}

export function getPallete() {
  const palletes = [...colorPalettes];
  if (!palletes) return [];
  return palletes.find((pal) => pal.id === colorPalette);
}

export function getVendorCharColors() {
  return VendorChart;
}

export function getDumpColumnDef() {
  return dhcpDumpColumnDef;
}

export function createToastObject(onOK, onKO, onError, action = "unknown") {
  return {
    onSuccess: {
      doToast: onOK ? true : false,
      onOK: onOK,
      onKO: onKO,
    },
    onError: {
      doToast: onError ? true : false,
      onError: onError,
    },
    action: action,
  };
}
