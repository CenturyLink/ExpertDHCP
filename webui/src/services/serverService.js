// import config from "../config/dhcpServers.json";

// export function getLabs() {
//   return config.labs;
// }

export function makeUrlString(ip, port) {
  return "http://" + ip + ":" + port;
}

export function createServers(lab) {
  let servers = [];
  for (let server of lab.servers) {
    try {
      servers.push({
        labId: lab.id,
        location: lab ? lab.location : "",
        id: server.id,
        ip: server.ip,
        port: server.dhcpManagerPort,
        dhcpMonitorPort: server.dhcpMonitorPort,
        title: server.title,
      });
    } catch (error) {}
  }

  return servers;
}

export function getLabServers(labs, labIds) {
  if (!labs) return [];
  const servers = [];
  for (let labId in labIds) {
    const lab = labs.find((l) => l.id === labId);
    if (lab) {
      servers.concat(lab.servers);
    }
  }
  return servers;
}

export function getCurrentServers(currentLab) {
  return currentLab.servers;
}

export const getAllServers = (labs) => {
  let servers = [];

  for (let lab of labs) {
    for (let server of lab.servers) {
      servers.push({
        labId: lab.id,
        location: lab ? lab.location : "",
        id: server.id,
        ip: server.ip,
        port: server.dhcpManagerPort,
        dhcpMonitorPort: server.dhcpMonitorPort,
        title: server.title,
      });
    }
  }
  return servers;
};
