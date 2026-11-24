import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCategory } from '../store/productReducer';

export function CategoryBar() {
    const dispatch = useDispatch();
    const { categories, selectedCategory } = useSelector((state) => state.product);

    return (
        <div className="flex gap-2 px-6 py-3 bg-white border-b border-gray-100 overflow-x-auto">
            <button
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${!selectedCategory ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-600 hover:bg-yellow-100'}`}
                onClick={() => dispatch(setSelectedCategory(null))}
            >
                All
            </button>
            {categories.map((cat) => (
                <button
                    key={cat}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap capitalize transition ${selectedCategory === cat ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-600 hover:bg-yellow-100'}`}
                    onClick={() => dispatch(setSelectedCategory(cat))}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
