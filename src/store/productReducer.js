import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    cartProducts: [],
    cartCount: 0,
    toast: null,
    searchQuery: '',
    categories: [],
    selectedCategory: null,
    loading: false,
    error: null
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {  
            state.error = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        addToCard: (state, action) => {
            state.cartProducts = [...state.cartProducts, action.payload];
            state.toast = { message: `"${action.payload.title.slice(0, 30)}..." added to cart`, type: 'add' };
        },
        removeFromCart: (state, action) => {
            const removed = state.cartProducts.find(p => p.id === action.payload);
            state.cartProducts = state.cartProducts.filter(p => p.id !== action.payload);
            state.toast = { message: `"${removed?.title.slice(0, 30)}..." removed from cart`, type: 'remove' };
        },
        setCartCount: (state, action) => {
            state.cartCount = action.payload;
        },
        clearToast: (state) => {
            state.toast = null;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        }
    }
})

export const { setProducts, setLoading, setError, setCategories, setSelectedCategory, addToCard, removeFromCart, setCartCount, clearToast, setSearchQuery } = productSlice.actions;

export const productReducer = productSlice.reducer;
export default productSlice.reducer;