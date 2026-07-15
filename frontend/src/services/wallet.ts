import {
  isConnected,
  requestAccess,
  getAddress,
} from "@stellar/freighter-api";

export async function connectWallet(): Promise<string> {
  const connected = await isConnected();

  if (!connected.isConnected) {
    throw new Error("Freighter wallet is not installed.");
  }

  const access = await requestAccess();

  if (access.error) {
    throw new Error(access.error);
  }

  const address = await getAddress();

  if (address.error) {
    throw new Error(address.error);
  }

  return address.address;
}

export async function getWalletAddress(): Promise<string> {
  const address = await getAddress();

  if (address.error) {
    throw new Error(address.error);
  }

  return address.address;
}