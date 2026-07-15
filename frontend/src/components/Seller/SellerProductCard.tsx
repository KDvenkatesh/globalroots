import { Product } from "../../types/product";

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const SellerProductCard = ({
  product,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          {product.category}
        </span>

        <h2 className="text-xl font-bold mt-4">
          {product.name}
        </h2>

        <p className="text-gray-500 mt-2">
          {product.country}
        </p>

        <p className="mt-2 font-semibold">
          {product.price} XLM
        </p>

        <div className="flex gap-3 mt-6">

          <button
            onClick={() => onEdit(product)}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(product)}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
};

export default SellerProductCard;