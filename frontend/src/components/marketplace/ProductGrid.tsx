import ProductCard from "./ProductCard";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";

const ProductGrid = () => {
  const navigate = useNavigate();

  // Get products from ProductContext
  const { products } = useProducts();

  const handleBuy = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onBuy={handleBuy}
        />
      ))}
    </div>
  );
};

export default ProductGrid;