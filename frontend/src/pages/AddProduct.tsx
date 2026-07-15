import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useWallet } from "../hooks/useWallet";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [image, setImage] = useState("");

    const { addProduct } = useProducts();

    const { address } = useWallet();

    const navigate = useNavigate();

    const handleSubmit = () => {

        addProduct({
            id: Date.now(),

            name,

            description,

            category,

            country,

            price: Number(price),

            quantity: Number(quantity),

            image,

            seller: address,
        });

        navigate("/seller");

    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">

            <h1 className="text-3xl font-bold">
                Add Product
            </h1>

            <p className="text-gray-500 mt-2 mb-8">
                List your export product on GlobalRoots.
            </p>

            <div className="space-y-5">

                <input
                    className="w-full border rounded-lg p-3"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    className="w-full border rounded-lg p-3"
                    rows={4}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    className="w-full border rounded-lg p-3"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input
                    className="w-full border rounded-lg p-3"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />

                <input
                    className="w-full border rounded-lg p-3"
                    placeholder="Price (XLM)"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <input
                    className="w-full border rounded-lg p-3"
                    placeholder="Quantity (kg)"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <input
                    className="w-full border rounded-lg p-3"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                    Add Product
                </button>

            </div>

        </div>
    );
};

export default AddProduct;