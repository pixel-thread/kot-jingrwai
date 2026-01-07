import * as Network from "expo-network";

export const isConnectedToNetwork = async () => {
  const network = await Network.getNetworkStateAsync();
  return network.isConnected;
};
