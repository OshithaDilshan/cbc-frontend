import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export function useProductSearch(initialQuery, products) {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState(initialQuery);

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

    return { filteredProducts, isLoading, setQuery };
}
