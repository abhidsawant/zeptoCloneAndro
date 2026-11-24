import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProductList } from './ProductList';
import { ProductCart } from './ProductCart';
import { Header } from './Header';
import { CategoryBar } from './CategoryBar';
import { Toast } from './Toast';

import { useLocation } from 'react-router-dom';

export function ProductDashboard() {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            {location.pathname !== '/cart' && <CategoryBar />}
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/cart" element={<ProductCart />} />
                <Route path="*" element={<div className="flex justify-center items-center h-64 text-gray-400">404 Not Found</div>} />
            </Routes>
            <Toast />
        </div>
    );
}
