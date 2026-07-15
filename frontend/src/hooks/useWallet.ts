import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";

import { ProductContext } from "../context/ProductContext";

export const useProducts = () => useContext(ProductContext);

export const useWallet = () => {
  return useContext(WalletContext);
};