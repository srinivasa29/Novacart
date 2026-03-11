import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItemIndex = state.items.findIndex(item => item._id === action.payload._id);
            if (existingItemIndex > -1) {
                const newItems = [...state.items];
                newItems[existingItemIndex].quantity += 1;
                return { ...state, items: newItems };
            }
            return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };

        case 'REMOVE_FROM_CART':
            return { ...state, items: state.items.filter(item => item._id !== action.payload) };

        case 'UPDATE_QUANTITY':
            if (action.payload.quantity <= 0) {
                return { ...state, items: state.items.filter(item => item._id !== action.payload._id) };
            }
            return {
                ...state,
                items: state.items.map(item =>
                    item._id === action.payload._id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                )
            };

        case 'CLEAR_CART':
            return { ...state, items: [] };

        case 'SET_DISCOUNT':
            return { ...state, couponCode: action.payload.code, discount: action.payload.amount };

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        items: JSON.parse(localStorage.getItem('novacart_cart')) || [],
        discount: 0,
        couponCode: ''
    });

    useEffect(() => {
        localStorage.setItem('novacart_cart', JSON.stringify(state.items));
    }, [state.items]);

    const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product });
    const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    const applyCoupon = (code) => {
        if (code.toUpperCase() === 'NOVA20') {
            dispatch({ type: 'SET_DISCOUNT', payload: { code, amount: 0.2 } });
            return { success: true, message: 'Coupon applied! 20% discount added.' };
        }
        return { success: false, message: 'Invalid coupon code.' };
    };

    const subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const discountAmount = subtotal * state.discount;
    const totalAmount = subtotal - discountAmount;
    const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            ...state,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            applyCoupon,
            subtotal,
            discountAmount,
            totalAmount,
            itemCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
