import axios from "axios";
import { useState, useEffect } from "react";
import ProductCard from "../../components/productCard";
import Loading from "../../components/loading";
import toast from "react-hot-toast";

export default function ProductSearchPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");

    useEffect(() => {
        // Fetch all products when the component mounts
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    import.meta.env.VITE_BACKEND_URL + "/api/products"
                );
                setProducts(response.data);
                setFilteredProducts(response.data); // Initially show all products
                setIsLoading(false);
            } catch (error) {
                toast.error("Error fetching products");
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Filter products based on the query entered
        if (query.length === 0) {
            setFilteredProducts(products); // Show all products if query is empty
        } else {
            setIsLoading(true);
            const fetchFilteredProducts = async () => {
                try {
                    const response = await axios.get(
                        import.meta.env.VITE_BACKEND_URL +
                        "/api/products/search/" +
                        query
                    );
                    setFilteredProducts(response.data);
                } catch (error) {
                    toast.error("Error fetching products");
                    console.error(error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchFilteredProducts();
        }
    }, [query, products]); // When the query or products list changes, filter accordingly

    return (
        <div className="w-full h-full flex flex-col items-center p-4">
            {/* Search Bar */}
            <div>
                <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full md:w-[400px] h-[40px] px-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                />
            </div>
            {/* Product Grid */}
            <div className="w-full h-full flex flex-row flex-wrap justify-center items-center gap-4">
                {isLoading ? (
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
