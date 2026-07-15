import { Link } from "react-router-dom";
import { useWallet } from "../../hooks/useWallet";

const Navbar = () => {
  const {
    address,
    connected,
    connectWallet,
    disconnectWallet,
  } = useWallet();

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 60px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2>🌍 GlobalRoots</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
        }}
      >
        <Link to="/">Home</Link>

        <Link to="/seller">
          Seller
        </Link>

        <Link to="/buyer">
          Buyer
        </Link>

        {!connected ? (
          <button
            onClick={connectWallet}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Connect Wallet
          </button>
        ) : (
          <>
            <span
              style={{
                fontWeight: "600",
              }}
            >
              {shortAddress}
            </span>

            <button
              onClick={disconnectWallet}
              style={{
                background: "#dc2626",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Disconnect
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;