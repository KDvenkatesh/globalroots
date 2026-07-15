import { Client, networks } from "bindings";

export const contractClient = new Client({
  ...networks.testnet,
  rpcUrl: "https://soroban-testnet.stellar.org",
});