import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { contractClient } from "../services/contract";
import { useWallet } from "../hooks/useWallet";
import StellarWalletsKit from "../wallet/walletKit";

const CreateTrade = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { address, connected } = useWallet();

  const product = location.state?.product;

  const [tradeId] = useState(() => Date.now());
  const [loading, setLoading] = useState(false);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto mt-20 text-center">
        <h1 className="text-3xl font-bold text-red-600">
          No Product Selected
        </h1>

        <p className="text-gray-500 mt-4">
          Please go back to the marketplace and select a product first.
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

  const handleCreateTrade = async () => {
    if (!connected || !address) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!seller) {
      alert("Seller wallet address is missing.");
      return;
    }

    try {
      setLoading(true);

      console.log("Creating Trade...");
      console.log("Trade ID:", tradeId);
      console.log("Seller:", seller);
      console.log("Buyer:", buyer);

      const tx = await contractClient.create_trade(
        {
          trade_id: BigInt(tradeId),
          seller,
          buyer,
          product_name: productName,
          amount: BigInt(amount),
        },
        {
          publicKey: address,
          signTransaction: StellarWalletsKit.signTransaction,
        }
      );

      console.log("Transaction:", tx);

      const result = await tx.signAndSend();

      console.log("Transaction Result:", result);

      alert("🎉 Trade created successfully!");

      navigate(`/trade/${tradeId}`);
    } catch (err: any) {
      console.error("Create Trade Error:", err);

      alert(
        err?.message ||
          "Failed to create trade. Please check your wallet and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 mb-12 bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-2">
        Create Export Trade
      </h1>

      <p className="text-gray-500 mb-8">
        Review the trade details before creating the blockchain transaction.
      </p>

      <div className="space-y-5">

        {/* Trade ID */}
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

        {/* Product */}
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

        {/* Seller */}
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

        {/* Buyer */}
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

        {/* Amount */}
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

        <button
          onClick={handleCreateTrade}
          disabled={loading || !connected}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Trade..." : "Create Trade"}
        </button>
      </div>
    </div>
  );
};

export default CreateTrade;