import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../../components/productCard";
import Loading from "../../components/loading";
import toast from "react-hot-toast";
import { useProductSearch } from "../../components/productSearch"; // Import the custom hook

export default function ProductSearchPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch all products when the component mounts
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    import.meta.env.VITE_BACKEND_URL + "/api/products"
                );
                setProducts(response.data);
                setIsLoading(false);
            } catch (error) {
                toast.error("Error fetching products");
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const { filteredProducts, isLoading: searchLoading, setQuery } = useProductSearch("", products); // Use the custom hook

    return (
        <div className="w-full h-full flex flex-col items-center overflow-hidden">
            {/* Search Bar */}
            <div className="p-4">
                <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full md:w-[400px] h-[40px] px-4  rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                />
            </div>
            {/* Product Grid */}
            <div className="w-full h-full flex flex-row flex-wrap justify-center items-center overflow-auto">
                {searchLoading || isLoading ? (
                    <Loading />
                ) : filteredProducts.length === 0 ? (
                    <h1 className="text-2xl text-secondary font-semibold">
                        No products found
                    </h1>
                ) : (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.productId} product={product} />
                    ))
                )}
            </div>
        </div>
    );
}
