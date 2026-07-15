import {
  createContext,
  useState,
  ReactNode,
} from "react";

import StellarWalletsKit from "../wallet/walletKit";

interface WalletContextType {
  address: string;
  connected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

export const WalletContext = createContext<WalletContextType>({
  address: "",
  connected: false,
  connectWallet: async () => {},
  disconnectWallet: async () => {},
});

interface Props {
  children: ReactNode;
}

export const WalletProvider = ({ children }: Props) => {
  const [address, setAddress] = useState("");
  const [connected, setConnected] = useState(false);

  // Connect wallet
  const connectWallet = async () => {
  try {
    await StellarWalletsKit.authModal();

    const { address } = await StellarWalletsKit.getAddress();

    if (!address) {
      throw new Error("No wallet address returned");
    }

    setAddress(address);
    setConnected(true);

    console.log("Wallet connected:", address);
  } catch (err) {
    console.error("Wallet connection error:", err);
  }
};

  // Disconnect wallet
  const disconnectWallet = async () => {
    try {
      await StellarWalletsKit.disconnect();

      setAddress("");
      setConnected(false);

      console.log("Wallet disconnected");
    } catch (err) {
      console.error("Wallet disconnect error:", err);

      // Clear React state even if wallet-kit disconnect fails
      setAddress("");
      setConnected(false);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        connected,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};