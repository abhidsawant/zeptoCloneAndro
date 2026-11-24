import React from "react";
import { ProductCard } from "./ProductCard";
import { useSelector } from "react-redux";

export function ProductCart() {
    const { cartProducts } = useSelector((state) => state.product);

    return (
        <div className="px-6 py-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Cart <span className="text-yellow-400">({cartProducts.length})</span></h2>
            {cartProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {cartProducts.map((product) => (
                        <ProductCard key={product.id} product={product} isCart={true} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-2">
                    <span className="text-5xl">🛒</span>
                    <p className="text-sm">Your cart is empty</p>
                </div>
            )}
        </div>
    );
}
