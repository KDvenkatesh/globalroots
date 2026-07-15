import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

const EditProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { products, updateProduct } = useProducts();

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return (
      <div className="text-center mt-20">
        Product not found
      </div>
    );
  }

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState(product.category);
  const [country, setCountry] = useState(product.country);
  const [price, setPrice] = useState(product.price.toString());
  const [quantity, setQuantity] = useState(
    product.quantity.toString()
  );
  const [image, setImage] = useState(product.image);

  const handleUpdate = () => {
    updateProduct({
      ...product,
      name,
      description,
      category,
      country,
      price: Number(price),
      quantity: Number(quantity),
      image,
    });

    navigate("/seller");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8">

      <h1 className="text-3xl font-bold mb-8">
        Edit Product
      </h1>

      <div className="space-y-5">

        <input
          className="w-full border rounded-lg p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="w-full border rounded-lg p-3"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-3"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-3"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-3"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-3"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Update Product
        </button>

      </div>

    </div>
  );
};

export default EditProduct;