import React, { createContext, useContext, useReducer, useEffect } from 'react';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_WISHLIST':
            const exists = state.wishlist.find(item => item._id === action.payload._id);
            if (exists) {
                return { ...state, wishlist: state.wishlist.filter(item => item._id !== action.payload._id) };
            }
            return { ...state, wishlist: [...state.wishlist, action.payload] };
        case 'REMOVE_FROM_WISHLIST':
            return { ...state, wishlist: state.wishlist.filter(item => item._id !== action.payload) };
        default:
            return state;
    }
};

export const WishlistProvider = ({ children }) => {
    const [state, dispatch] = useReducer(wishlistReducer, {
        wishlist: JSON.parse(localStorage.getItem('novacart_wishlist')) || []
    });

    useEffect(() => {
        localStorage.setItem('novacart_wishlist', JSON.stringify(state.wishlist));
    }, [state.wishlist]);

    const toggleWishlist = (product) => dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
    const removeFromWishlist = (id) => dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
    const isInWishlist = (id) => state.wishlist.some(item => item._id === id);

    return (
        <WishlistContext.Provider value={{ ...state, toggleWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
