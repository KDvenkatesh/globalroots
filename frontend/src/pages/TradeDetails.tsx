import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { contractClient } from "../services/contract";
import { useWallet } from "../hooks/useWallet";
import StellarWalletsKit from "../wallet/walletKit";
import type { Trade } from "bindings";

type TxStatus = "idle" | "pending" | "success" | "failed";

type TradeAction =
  | "fund"
  | "ship"
  | "confirm"
  | "release"
  | "cancel";

const TradeDetails = () => {
  const { id } = useParams();
  const { address, connected } = useWallet();

  const [trade, setTrade] = useState<Trade | null>(null);
  const [loading, setLoading] = useState(true);

  const [txStatus, setTxStatus] =
    useState<TxStatus>("idle");

  const [txMessage, setTxMessage] = useState("");

  const loadTrade = async (showLoading = false) => {
    if (!id) return;

    try {
      if (showLoading) {
        setLoading(true);
      }

      const tx = await contractClient.get_trade({
        trade_id: BigInt(id),
      });

      setTrade(tx.result);
    } catch (error) {
      console.error("Load Trade Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial blockchain read
  useEffect(() => {
    loadTrade(true);
  }, [id]);

  // Real-time synchronization
  useEffect(() => {
    if (!id) return;

    const interval = setInterval(() => {
      loadTrade(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [id]);

  const handleError = (error: any) => {
    console.error("Transaction Error:", error);

    const message =
      error?.message?.toLowerCase?.() || "";

    setTxStatus("failed");

    // ERROR 1
    if (
      message.includes("reject") ||
      message.includes("declined") ||
      message.includes("denied")
    ) {
      setTxMessage("Transaction rejected by user.");
      return;
    }

    // ERROR 2
    if (
      message.includes("insufficient") ||
      message.includes("balance")
    ) {
      setTxMessage(
        "Insufficient wallet balance for this transaction."
      );
      return;
    }

    // ERROR 3
    if (
      message.includes("wallet") ||
      message.includes("connect")
    ) {
      setTxMessage(
        "Wallet connection error. Please reconnect your wallet."
      );
      return;
    }

    setTxMessage(
      error?.message || "Transaction failed."
    );
  };

  const executeTradeAction = async (
    action: TradeAction
  ) => {
    if (!id) return;

    // ERROR 3
    if (!connected || !address) {
      setTxStatus("failed");
      setTxMessage(
        "Wallet not connected. Please connect your wallet."
      );
      return;
    }

    try {
      setTxStatus("pending");
      setTxMessage(
        "Transaction pending. Please approve it in your wallet..."
      );

      const options = {
        publicKey: address,
        signTransaction:
          StellarWalletsKit.signTransaction,
      };

      let tx;

      switch (action) {
        case "fund":
          tx = await contractClient.fund_trade(
            {
              trade_id: BigInt(id),
            },
            options
          );
          break;

        case "ship":
          tx = await contractClient.ship_trade(
            {
              trade_id: BigInt(id),
            },
            options
          );
          break;

        case "confirm":
          tx =
            await contractClient.confirm_delivery(
              {
                trade_id: BigInt(id),
              },
              options
            );
          break;

        case "release":
          tx =
            await contractClient.release_payment(
              {
                trade_id: BigInt(id),
              },
              options
            );
          break;

        case "cancel":
          tx = await contractClient.cancel_trade(
            {
              trade_id: BigInt(id),
            },
            options
          );
          break;
      }

      const result = await tx.signAndSend();

      console.log(
        "Transaction Result:",
        result
      );

      setTxStatus("success");
      setTxMessage(
        "Transaction completed successfully."
      );

      await loadTrade(false);
    } catch (error: any) {
      handleError(error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-xl font-semibold">
          Loading trade from Stellar...
        </h2>
      </div>
    );
  }

  if (!trade) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold text-red-600">
          Trade Not Found
        </h1>
      </div>
    );
  }

  const status = trade.status.tag;

  const isBuyer =
    address === trade.buyer;

  const isSeller =
    address === trade.seller;

  const isProcessing =
    txStatus === "pending";

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold">
        Trade Details
      </h1>

      <p className="text-gray-500 mt-2">
        Live Stellar smart contract trade tracking
      </p>

      {/* TRANSACTION STATUS */}

      {txStatus !== "idle" && (
        <div
          className={`mt-6 p-4 rounded-xl text-center font-semibold ${
            txStatus === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : txStatus === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {txStatus === "pending" &&
            "⏳ PENDING — "}

          {txStatus === "success" &&
            "✅ SUCCESS — "}

          {txStatus === "failed" &&
            "❌ FAILED — "}

          {txMessage}
        </div>
      )}

      <div className="mt-8 bg-white shadow-lg rounded-xl p-8">

        <div className="flex justify-between items-center">

          <div>
            <p className="text-gray-500">
              Trade #{trade.trade_id.toString()}
            </p>

            <h2 className="text-2xl font-bold mt-1">
              {trade.product_name}
            </h2>
          </div>

          <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">
            {status}
          </span>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div>
            <p className="text-gray-500">
              Seller
            </p>

            <p className="break-all font-semibold">
              {trade.seller}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Buyer
            </p>

            <p className="break-all font-semibold">
              {trade.buyer}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Amount
            </p>

            <p className="text-2xl font-bold">
              {trade.amount.toString()} XLM
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Your Role
            </p>

            <p className="font-bold">
              {isBuyer
                ? "Buyer"
                : isSeller
                  ? "Seller"
                  : "Viewer"}
            </p>
          </div>

        </div>

        <div className="mt-10">

          {status === "Created" &&
            isBuyer && (
              <button
                disabled={isProcessing}
                onClick={() =>
                  executeTradeAction("fund")
                }
                className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:opacity-50"
              >
                Fund Escrow
              </button>
            )}

          {status === "Funded" &&
            isSeller && (
              <button
                disabled={isProcessing}
                onClick={() =>
                  executeTradeAction("ship")
                }
                className="w-full bg-orange-600 text-white py-3 rounded-lg disabled:opacity-50"
              >
                Mark as Shipped
              </button>
            )}

          {status === "Shipped" &&
            isBuyer && (
              <button
                disabled={isProcessing}
                onClick={() =>
                  executeTradeAction(
                    "confirm"
                  )
                }
                className="w-full bg-purple-600 text-white py-3 rounded-lg disabled:opacity-50"
              >
                Confirm Delivery
              </button>
            )}

          {status === "Delivered" &&
            isBuyer && (
              <button
                disabled={isProcessing}
                onClick={() =>
                  executeTradeAction(
                    "release"
                  )
                }
                className="w-full bg-green-600 text-white py-3 rounded-lg disabled:opacity-50"
              >
                Release Payment
              </button>
            )}

          {status === "Created" &&
            (isBuyer || isSeller) && (
              <button
                disabled={isProcessing}
                onClick={() =>
                  executeTradeAction(
                    "cancel"
                  )
                }
                className="w-full mt-4 border border-red-500 text-red-600 py-3 rounded-lg disabled:opacity-50"
              >
                Cancel Trade
              </button>
            )}

          {status === "Released" && (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center font-bold">
              ✅ Trade completed successfully
            </div>
          )}

          {status === "Cancelled" && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center font-bold">
              ❌ Trade cancelled
            </div>
          )}

        </div>

      </div>

      <p className="text-center text-gray-400 text-sm mt-5">
        Blockchain state automatically synchronizes every
        5 seconds
      </p>

    </div>
  );
};

export default TradeDetails;