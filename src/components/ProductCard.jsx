import React from "react";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import { addToCard, setCartCount, removeFromCart } from "../store/productReducer";
import DeleteIcon from '@mui/icons-material/Delete';

export function ProductCard({ product, isCart = false }) {
    const dispatch = useDispatch();
    const { cartCount } = useSelector((state) => state.product);

    function handleAddToCart() {
        dispatch(addToCard(product));
        dispatch(setCartCount(cartCount + 1));
    }

    function handleRemoveFromCart(productId) {
        dispatch(removeFromCart(productId));
        dispatch(setCartCount(cartCount - 1));
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-4 flex flex-col gap-3">
            <div className="h-44 flex items-center justify-center bg-gray-50 rounded-xl p-2">
                <img src={product.image} alt={product.title} className="h-full object-contain" />
            </div>
            <div className="flex-1 flex flex-col gap-1">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{product.title}</h3>
                <span className="text-xs text-gray-400 capitalize">{product.category}</span>
            </div>
            <div className="flex items-center justify-between mt-auto">
                <span className="text-base font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {!isCart && (
                    <button
                        onClick={handleAddToCart}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                    >
                        <AddIcon fontSize="small" />
                    </button> 
                )} 
                {isCart && (
                    <button
                        onClick={() => handleRemoveFromCart(product.id)}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1.5 rounded-full transition"
                    >
                        <DeleteIcon fontSize="small" /> Remove
                    </button>
                )}
            </div>
        </div>
    );
}
