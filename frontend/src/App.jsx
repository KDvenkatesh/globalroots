import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Layout/Navbar";

import Home from "./pages/Home";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import CreateTrade from "./pages/CreateTrade";
import TradeDetails from "./pages/TradeDetails";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/trade/create" element={<CreateTrade />} />
        <Route path="/trade/:id" element={<TradeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;