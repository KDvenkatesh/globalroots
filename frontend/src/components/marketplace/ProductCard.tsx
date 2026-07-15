import { Product } from "../../types/product";

interface Props {
  product: Product;
  onBuy: (product: Product) => void;
}

const ProductCard = ({ product, onBuy }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
          {product.category}
        </span>

        <h2 className="text-xl font-bold mt-4">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-2 line-clamp-3">
          {product.description}
        </p>

        <div className="mt-4 space-y-1 text-sm">

          <p>
            🌍 <strong>Country:</strong> {product.country}
          </p>

          <p>
            📦 <strong>Quantity:</strong> {product.quantity} kg
          </p>

          <p>
            💰 <strong>Price:</strong> {product.price} XLM
          </p>

        </div>

        <button
          onClick={() => onBuy(product)}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Buy Product
        </button>

      </div>
    </div>
  );
};

export default ProductCard;