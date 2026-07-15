import { useParams, useNavigate } from "react-router-dom";
import { products } from "../data/products";

const ProductDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const product = products.find(
        (p) => p.id === Number(id)
    );

    if (!product) {
        return (
            <div className="text-center mt-20 text-2xl">
                Product Not Found
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">

            <div className="grid md:grid-cols-2 gap-10">

                <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-2xl shadow-lg w-full"
                />

                <div>

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        {product.category}
                    </span>

                    <h1 className="text-5xl font-bold mt-5">
                        {product.name}
                    </h1>

                    <p className="text-gray-600 mt-6 leading-8">
                        {product.description}
                    </p>

                    <div className="mt-8 space-y-4">

                        <p>
                            🌍 <strong>Country:</strong> {product.country}
                        </p>

                        <p>
                            📦 <strong>Available:</strong> {product.quantity} kg
                        </p>

                        <p>
                            💰 <strong>Price:</strong> {product.price} XLM
                        </p>

                    </div>

                    <button
                        onClick={() =>
                            navigate("/trade/create", {
                                state: {
                                    product,
                                },
                            })
                        }
                        className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold"
                    >
                        Purchase Product
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;