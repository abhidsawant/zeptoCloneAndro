import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PlaceIcon from '@mui/icons-material/Place';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/productReducer';

export function Header() {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const cartCount = useSelector((state) => state.product.cartProducts.length);

    useEffect(() => {
        const timer = setTimeout(() => dispatch(setSearchQuery(inputValue.trim())), 400);
        return () => clearTimeout(timer);
    }, [inputValue]);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 px-6 py-3 flex items-center gap-6">
            <h2 className="text-2xl font-bold text-yellow-400 tracking-tight whitespace-nowrap">ZeptoClone</h2>
            <div className="flex items-center gap-1 text-gray-500 text-sm whitespace-nowrap">
                <PlaceIcon fontSize="small" className="text-yellow-400" />
                <span>Select Location</span>
            </div>
            <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-yellow-400 transition"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <nav className="flex items-center gap-4">
                <NavLink to="/" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-400'} transition`}>
                    Products
                </NavLink>
                <NavLink to="/cart" className={({ isActive }) => `relative ${isActive ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-400'} transition`}>
                    <ShoppingCartIcon />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-yellow-400 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </NavLink>
            </nav>
        </header>
    );
}
