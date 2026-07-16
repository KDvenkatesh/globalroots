import {
  StellarWalletsKit,
  Networks,
} from "@creit.tech/stellar-wallets-kit";

import { defaultModules } from "@creit.tech/stellar-wallets-kit/modules/utils";

import {
  WalletConnectModule,
  WalletConnectTargetChain,
} from "@creit.tech/stellar-wallets-kit/modules/wallet-connect";

// ==============================
// REOWN PROJECT ID
// ==============================

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

console.log("Reown Project ID:", projectId);

if (!projectId) {
  throw new Error(
    "VITE_REOWN_PROJECT_ID is missing from frontend/.env"
  );
}

// ==============================
// WALLETCONNECT MODULE
// ==============================

const walletConnectModule = new WalletConnectModule({
  projectId,

  metadata: {
    name: "GlobalRoots",

    description:
      "Cross-border trade marketplace powered by Stellar",

    url: window.location.origin,

    icons: [
      `${window.location.origin}/favicon.ico`,
    ],
  },

  allowedChains: [
    WalletConnectTargetChain.TESTNET,
  ],
});

// ==============================
// DEFAULT WALLET MODULES
// Remove default WalletConnect
// because we configured our own.
// ==============================

const modules = defaultModules({
  filterBy: (module) =>
    module.productId !== "wallet_connect",
});

// ==============================
// INITIALIZE STELLAR WALLETS KIT
// ==============================

StellarWalletsKit.init({
  network: Networks.TESTNET,

  modules: [
    ...modules,
    walletConnectModule,
  ],
});

export default StellarWalletsKit;