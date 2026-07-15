import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App";
import "./testWallet";
import ReactDOM from "react-dom/client";
import { WalletProvider } from "./context/WalletContext";
import { ProductProvider } from "./context/ProductContext";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <WalletProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </WalletProvider>
  </React.StrictMode>
);