import { useProducts } from "../hooks/useProducts";
import SellerProductCard from "../components/seller/SellerProductCard";
import { Product } from "../types/product";
import { useWallet } from "../hooks/useWallet";
import { useNavigate } from "react-router-dom";


const SellerDashboard = () => {
  const navigate = useNavigate();

  const { address, connected } = useWallet();

  const { products } = useProducts();

  const { deleteProduct } = useProducts();

  console.log(address);
  console.log(connected);

  const myProducts = products.filter(
    (product) => product.seller === address
  );

  const handleEdit = (product: Product) => {
    navigate(`/seller/edit/${product.id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold">
        Seller Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Manage your export products.
      </p>

      <div className="grid grid-cols-3 gap-6 mt-10">

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Products</h3>

          <p className="text-4xl font-bold mt-2">
            {myProducts.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Pending Trades</h3>

          <p className="text-4xl font-bold mt-2">
            0
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">Revenue</h3>

          <p className="text-4xl font-bold mt-2">
            0 XLM
          </p>
        </div>

      </div>

      <div className="flex justify-between items-center mt-12">

        <h2 className="text-3xl font-bold">
          My Products
        </h2>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          onClick={() => navigate("/seller/add-product")}
        >
          + Add Product
        </button>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">

        {myProducts.map((product) => (
          <SellerProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={(product) => deleteProduct(product.id)}
          />
        ))}

      </div>

    </div>
  );
};

export default SellerDashboard;