import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 60px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <h2>🌍 GlobalRoots</h2>

      <div
        style={{
          display: "flex",
          gap: "25px",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/seller">Seller</Link>
        <Link to="/buyer">Buyer</Link>
      </div>
    </nav>
  );
};

export default Navbar;