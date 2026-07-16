import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { contractClient } from "../services/contract";
import { useWallet } from "../hooks/useWallet";
import StellarWalletsKit from "../wallet/walletKit";

type TxStatus =
  | "idle"
  | "pending"
  | "success"
  | "failed";

const CreateTrade = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { address, connected } = useWallet();

  const product = location.state?.product;

  const [tradeId] = useState(() => Date.now());

  const [txStatus, setTxStatus] =
    useState<TxStatus>("idle");

  const [txMessage, setTxMessage] =
    useState("");

  // ==============================
  // NO PRODUCT SELECTED
  // ==============================

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto mt-20 text-center">

        <h1 className="text-3xl font-bold text-red-600">
          No Product Selected
        </h1>

        <p className="text-gray-500 mt-4">
          Please go back to the marketplace and
          select a product first.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Go to Marketplace
        </button>

      </div>
    );
  }

  const seller = product.seller;

  const buyer = address;

  const productName = product.name;

  const amount = product.price.toString();

  // ==============================
  // ERROR HANDLING
  // ==============================

  const handleTransactionError = (
    error: any
  ) => {
    console.error(
      "Create Trade Error:",
      error
    );

    const message =
      error?.message?.toLowerCase?.() ||
      "";

    setTxStatus("failed");

    // ERROR 1:
    // USER REJECTED TRANSACTION

    if (
      message.includes("reject") ||
      message.includes("declined") ||
      message.includes("denied") ||
      error?.code === 4001
    ) {
      setTxMessage(
        "Transaction rejected by the user."
      );

      return;
    }

    // ERROR 2:
    // INSUFFICIENT BALANCE

    if (
      message.includes("insufficient") ||
      message.includes("balance") ||
      message.includes("funds")
    ) {
      setTxMessage(
        "Insufficient wallet balance to complete this transaction."
      );

      return;
    }

    // ERROR 3:
    // WALLET CONNECTION

    if (
      message.includes("wallet") ||
      message.includes("connect")
    ) {
      setTxMessage(
        "Wallet connection error. Please reconnect your wallet."
      );

      return;
    }

    // UNKNOWN ERROR

    setTxMessage(
      error?.message ||
        "Transaction failed. Please try again."
    );
  };

  // ==============================
  // CREATE TRADE
  // ==============================

  const handleCreateTrade = async () => {

    // ERROR 3:
    // WALLET NOT CONNECTED

    if (!connected || !address) {
      setTxStatus("failed");

      setTxMessage(
        "Wallet not connected. Please connect your wallet first."
      );

      return;
    }

    if (!seller) {
      setTxStatus("failed");

      setTxMessage(
        "Seller wallet address is missing."
      );

      return;
    }

    try {

      // TRANSACTION PENDING

      setTxStatus("pending");

      setTxMessage(
        "Transaction pending. Please approve it in your wallet..."
      );

      console.log(
        "Creating Trade..."
      );

      console.log(
        "Trade ID:",
        tradeId
      );

      console.log(
        "Seller:",
        seller
      );

      console.log(
        "Buyer:",
        buyer
      );

      // CREATE CONTRACT TRANSACTION

      const tx =
        await contractClient.create_trade(
          {
            trade_id:
              BigInt(tradeId),

            seller,

            buyer,

            product_name:
              productName,

            amount:
              BigInt(amount),
          },
          {
            publicKey:
              address,

            signTransaction:
              StellarWalletsKit.signTransaction,
          }
        );

      console.log(
        "Transaction:",
        tx
      );

      // SIGN + SEND

      const result =
        await tx.signAndSend();

      console.log(
        "Transaction Result:",
        result
      );

      // TRANSACTION SUCCESS

      setTxStatus("success");

      setTxMessage(
        "Trade created successfully on Stellar Testnet."
      );

      // WAIT SO USER CAN SEE SUCCESS STATUS

      setTimeout(() => {

        navigate(
          `/trade/${tradeId}`
        );

      }, 1200);

    } catch (error: any) {

      handleTransactionError(
        error
      );

    }
  };

  // ==============================
  // UI
  // ==============================

  return (
    <div className="max-w-3xl mx-auto mt-12 mb-12 bg-white rounded-xl shadow-lg p-8">

      <h1 className="text-3xl font-bold mb-2">
        Create Export Trade
      </h1>

      <p className="text-gray-500 mb-8">
        Review the trade details before
        creating the blockchain transaction.
      </p>

      <div className="space-y-5">

        {/* TRANSACTION STATUS */}

        {txStatus !== "idle" && (

          <div
            className={`p-4 rounded-lg text-center font-semibold ${
              txStatus === "pending"

                ? "bg-yellow-100 text-yellow-700"

                : txStatus === "success"

                  ? "bg-green-100 text-green-700"

                  : "bg-red-100 text-red-700"
            }`}
          >

            {txStatus ===
              "pending" &&
              "⏳ PENDING — "}

            {txStatus ===
              "success" &&
              "✅ SUCCESS — "}

            {txStatus ===
              "failed" &&
              "❌ FAILED — "}

            {txMessage}

          </div>

        )}

        {/* TRADE ID */}

        <div>

          <label className="block mb-2 font-semibold">
            Trade ID
          </label>

          <input
            className="w-full border rounded-lg p-3 bg-gray-100"
            value={tradeId}
            readOnly
          />

        </div>

        {/* PRODUCT */}

        <div>

          <label className="block mb-2 font-semibold">
            Product
          </label>

          <input
            className="w-full border rounded-lg p-3 bg-gray-100"
            value={productName}
            readOnly
          />

        </div>

        {/* SELLER */}

        <div>

          <label className="block mb-2 font-semibold">
            Seller Wallet
          </label>

          <input
            className="w-full border rounded-lg p-3 bg-gray-100"
            value={seller}
            readOnly
          />

        </div>

        {/* BUYER */}

        <div>

          <label className="block mb-2 font-semibold">
            Buyer Wallet
          </label>

          <input
            className="w-full border rounded-lg p-3 bg-gray-100"
            value={buyer}
            readOnly
          />

        </div>

        {/* AMOUNT */}

        <div>

          <label className="block mb-2 font-semibold">
            Amount (XLM)
          </label>

          <input
            className="w-full border rounded-lg p-3 bg-gray-100"
            value={amount}
            readOnly
          />

        </div>

        {/* CREATE BUTTON */}

        <button
          onClick={
            handleCreateTrade
          }

          disabled={
            txStatus ===
              "pending" ||
            txStatus ===
              "success"
          }

          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >

          {txStatus ===
          "pending"

            ? "Creating Trade..."

            : txStatus ===
                "success"

              ? "Trade Created ✓"

              : "Create Trade"}

        </button>

      </div>

    </div>
  );
};

export default CreateTrade;