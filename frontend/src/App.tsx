import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import Home from "./pages/Home";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import CreateTrade from "./pages/CreateTrade";
import TradeDetails from "./pages/TradeDetails";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";



function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/trade/create" element={<CreateTrade />} />
        <Route path="/trade/:id" element={<TradeDetails />} />
        <Route path="/seller/add-product" element={<AddProduct />} />
        <Route
          path="/seller/edit/:id"
          element={<EditProduct />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;