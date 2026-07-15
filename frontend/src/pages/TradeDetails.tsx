import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { contractClient } from "../services/contract";
import { useWallet } from "../hooks/useWallet";
import StellarWalletsKit from "../wallet/walletKit";
import type { Trade } from "bindings";

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
  const [actionLoading, setActionLoading] =
    useState<TradeAction | null>(null);

  // ============================
  // LOAD TRADE
  // ============================

  const loadTrade = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const tx = await contractClient.get_trade({
        trade_id: BigInt(id),
      });

      console.log("Trade Data:", tx.result);

      setTrade(tx.result);
    } catch (error) {
      console.error("Load Trade Error:", error);
      setTrade(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrade();
  }, [id]);

  // ============================
  // CONTRACT ACTION
  // ============================

  const executeTradeAction = async (
    action: TradeAction
  ) => {
    if (!id) {
      return;
    }

    if (!connected || !address) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      setActionLoading(action);

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

      console.log("Transaction:", tx);

      const result = await tx.signAndSend();

      console.log(
        "Transaction Result:",
        result
      );

      alert("Transaction successful!");

      await loadTrade();
    } catch (error: any) {
      console.error(
        "Trade Action Error:",
        error
      );

      alert(
        error?.message ||
          "Transaction failed. Please try again."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-xl font-semibold">
          Loading trade...
        </h2>
      </div>
    );
  }

  // ============================
  // NOT FOUND
  // ============================

  if (!trade) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h1 className="text-3xl font-bold text-red-600">
          Trade Not Found
        </h1>

        <p className="text-gray-500 mt-4">
          This trade does not exist on the
          blockchain.
        </p>
      </div>
    );
  }

  const status = trade.status.tag;

  const isBuyer =
    address === trade.buyer;

  const isSeller =
    address === trade.seller;

  const isParticipant =
    isBuyer || isSeller;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* HEADER */}

      <div>
        <h1 className="text-4xl font-bold">
          Trade Details
        </h1>

        <p className="text-gray-500 mt-2">
          Manage the blockchain escrow
          lifecycle.
        </p>
      </div>

      {/* TRADE CARD */}

      <div className="mt-8 bg-white shadow-lg rounded-xl p-8">

        {/* TOP */}

        <div className="flex justify-between items-center gap-4">

          <div>
            <p className="text-gray-500">
              Trade #
              {trade.trade_id.toString()}
            </p>

            <h2 className="text-2xl font-bold mt-1">
              {trade.product_name}
            </h2>
          </div>

          <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-semibold">
            {status}
          </span>

        </div>

        {/* INFORMATION */}

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div>
            <p className="text-gray-500">
              Seller Wallet
            </p>

            <p className="font-semibold break-all mt-1">
              {trade.seller}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Buyer Wallet
            </p>

            <p className="font-semibold break-all mt-1">
              {trade.buyer}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Amount
            </p>

            <p className="text-2xl font-bold mt-1">
              {trade.amount.toString()} XLM
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Your Role
            </p>

            <p className="font-semibold mt-1">
              {isBuyer
                ? "Buyer"
                : isSeller
                  ? "Seller"
                  : "Viewer"}
            </p>
          </div>

        </div>

        {/* ACTIONS */}

        <div className="mt-10">

          {!connected && (
            <p className="text-center text-red-500 mb-4">
              Connect your wallet to perform
              trade actions.
            </p>
          )}

          {/* CREATED */}

          {status === "Created" &&
            isBuyer && (
              <button
                onClick={() =>
                  executeTradeAction("fund")
                }
                disabled={
                  actionLoading !== null
                }
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {actionLoading === "fund"
                  ? "Processing..."
                  : "Fund Escrow"}
              </button>
            )}

          {/* FUNDED */}

          {status === "Funded" &&
            isSeller && (
              <button
                onClick={() =>
                  executeTradeAction("ship")
                }
                disabled={
                  actionLoading !== null
                }
                className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 disabled:opacity-50"
              >
                {actionLoading === "ship"
                  ? "Processing..."
                  : "Mark Product as Shipped"}
              </button>
            )}

          {/* SHIPPED */}

          {status === "Shipped" &&
            isBuyer && (
              <button
                onClick={() =>
                  executeTradeAction(
                    "confirm"
                  )
                }
                disabled={
                  actionLoading !== null
                }
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {actionLoading === "confirm"
                  ? "Processing..."
                  : "Confirm Delivery"}
              </button>
            )}

          {/* DELIVERED */}

          {status === "Delivered" &&
            isBuyer && (
              <button
                onClick={() =>
                  executeTradeAction(
                    "release"
                  )
                }
                disabled={
                  actionLoading !== null
                }
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {actionLoading === "release"
                  ? "Processing..."
                  : "Release Payment"}
              </button>
            )}

          {/* CANCEL */}

          {status === "Created" &&
            isParticipant && (
              <button
                onClick={() =>
                  executeTradeAction(
                    "cancel"
                  )
                }
                disabled={
                  actionLoading !== null
                }
                className="w-full mt-4 border border-red-500 text-red-600 py-3 rounded-lg hover:bg-red-50 disabled:opacity-50"
              >
                {actionLoading === "cancel"
                  ? "Cancelling..."
                  : "Cancel Trade"}
              </button>
            )}

          {/* RELEASED */}

          {status === "Released" && (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg text-center font-semibold">
              Trade completed successfully ✓
            </div>
          )}

          {/* CANCELLED */}

          {status === "Cancelled" && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center font-semibold">
              This trade has been cancelled.
            </div>
          )}

          {/* WAITING STATES */}

          {status === "Funded" &&
            !isSeller && (
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                Waiting for the seller to ship
                the product.
              </div>
            )}

          {status === "Shipped" &&
            !isBuyer && (
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                Waiting for the buyer to confirm
                delivery.
              </div>
            )}

          {status === "Delivered" &&
            !isBuyer && (
              <div className="bg-green-50 p-4 rounded-lg text-center">
                Waiting for the buyer to release
                payment.
              </div>
            )}

        </div>

      </div>

    </div>
  );
};

export default TradeDetails;