import React, { useEffect, useMemo } from 'react'
import { ProductCard } from './ProductCard'
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setLoading, setError, setCategories } from '../store/productReducer';

export function ProductList() {
    const dispatch = useDispatch();
    const { products, loading, error, selectedCategory, searchQuery } = useSelector((state) => state.product);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchProducts() {
            dispatch(setLoading(true));
            try {
                const res = await fetch("https://fakestoreapi.com/products", { signal: controller.signal });
                if (!res.ok) throw new Error("Failed to fetch products");
                const data = await res.json();
                dispatch(setProducts(data));
                const uniqueCategories = [...new Set(data.map((p) => p.category))];
                dispatch(setCategories(uniqueCategories));
            } catch (err) {
                if (err.name !== 'AbortError') dispatch(setError(err.message));
            } finally {
                dispatch(setLoading(false));
            }
        }

        fetchProducts();
        return () => controller.abort();
    }, []);

    const filteredProducts = useMemo(() => {
        return products
            .filter((p) => !selectedCategory || p.category === selectedCategory)
            .filter((p) => !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [products, selectedCategory, searchQuery]);

    if (loading) return <div className="flex justify-center items-center h-64 text-gray-400">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-64 text-red-400">Error: {error}</div>;

    return (
        <div className="px-6 py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.length > 0
                ? filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
                : <div className="col-span-full text-center text-gray-400 py-16">No products available</div>
            }
        </div>
    );
}
