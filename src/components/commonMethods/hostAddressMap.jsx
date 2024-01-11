
export const buildHostAddressMap = (hosts) => {
  let hostAddressMap = {};
  hosts.forEach(host => {
      hostAddressMap[host.uuidHost] = host.addressHost; // Assuming addressHost is the property containing the address
  });
  return hostAddressMap;
};
