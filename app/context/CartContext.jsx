'use client';

import { createContext, useReducer, useState } from 'react';

export const CartContext = createContext(null);
export const WishlistContext = createContext(null);
export const ToastContext = createContext(null);

export function getPriceAfterDiscount(price, discount) {
    if (!price) {
        return 0;
    }

    const discountNumber = Number(discount) || 0;
    const discountRate = discountNumber > 1 ? discountNumber / 100 : discountNumber;
    const discountMultiplier = 1 - Math.min(Math.max(discountRate, 0), 1);

    return Number((price * discountMultiplier).toFixed(2));
}

const initialState = {
    items: [],
};

function cartReducer(state, action) {
    const items = [...state.items];

    switch (action.type) {
        case 'addItem': {
            const item = action.payload;
            const existingIndex = items.findIndex((cartItem) => cartItem.id === item.id);

            if (existingIndex >= 0) {
                items[existingIndex] = {
                    ...items[existingIndex],
                    countincart: Number(items[existingIndex].countincart || 1) + 1,
                    addtocard: true,
                };
                return { ...state, items };
            }

            items.push({
                ...item,
                img: item.image || item.img,
                addtocard: true,
                countincart: item.countincart || 1,
                Discount: item.Discount || 0,
            });

            return { ...state, items };
        }

        case 'plusItem': {
            const index = action.payload;
            if (index < 0 || index >= items.length) {
                return state;
            }

            const item = items[index];
            items[index] = { ...item, countincart: Number(item.countincart || 1) + 1 };
            return { ...state, items };
        }

        case 'minusItem': {
            const index = action.payload;
            if (index < 0 || index >= items.length) {
                return state;
            }

            const item = items[index];
            const nextCount = Number(item.countincart || 1) - 1;
            if (nextCount < 1) {
                return state;
            }

            items[index] = { ...item, countincart: nextCount };
            return { ...state, items };
        }

        case 'romvefromcart': {
            const index = action.payload;
            if (index < 0 || index >= items.length) {
                return state;
            }

            items.splice(index, 1);
            return { ...state, items };
        }

        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export function WishlistProvider({ children }) {
    const [items, setItems] = useState([]);

    const addItem = (product) => {
        setItems((current) => {
            if (current.some((entry) => entry.id === product.id)) {
                return current;
            }
            return [...current, product];
        });
    };

    const removeItem = (id) => {
        setItems((current) => current.filter((entry) => entry.id !== id));
    };

    const isInWishlist = (id) => items.some((entry) => entry.id === id);

    return (
        <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 2600);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div className="fixed right-5 top-24 z-[100] border border-stone-200 bg-white px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] text-stone-950 shadow-sm">
                    <span>{toast.message}</span>
                </div>
            )}
        </ToastContext.Provider>
    );
}
