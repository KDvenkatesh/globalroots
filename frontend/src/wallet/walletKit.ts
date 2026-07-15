import {
  StellarWalletsKit,
  Networks,
} from "@creit.tech/stellar-wallets-kit";

import { defaultModules } from "@creit.tech/stellar-wallets-kit/modules/utils";

import {
  WalletConnectModule,
  WalletConnectTargetChain,
} from "@creit.tech/stellar-wallets-kit/modules/wallet-connect";

const walletConnectModule = new WalletConnectModule({
  projectId: import.meta.env.VITE_REOWN_PROJECT_ID,

  metadata: {
    name: "GlobalRoots",
    description: "Cross-border trade marketplace powered by Stellar",
    url: window.location.origin,
    icons: [`${window.location.origin}/favicon.ico`],
  },

  allowedChains: [WalletConnectTargetChain.TESTNET],
});

StellarWalletsKit.init({
  network: Networks.TESTNET,
  modules: [
    ...defaultModules(),
    walletConnectModule,
  ],
});

export default StellarWalletsKit;