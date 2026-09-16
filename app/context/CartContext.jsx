"use client";

import { createContext, useReducer } from "react";

export const CartContext = createContext(null);

const initialState = {
items: [],
};

function cartReducer(state, action) {
const items = [...state.items];

switch (action.type) {
    case "addItem": {
    const item = action.payload;
    const existingIndex = items.findIndex(
        (cartItem) => cartItem.id === item.id
    );

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

    case "plusItem": {
    const index = action.payload;

    if (index < 0 || index >= items.length) {
        return state;
    }

    const item = items[index];

    items[index] = {
        ...item,
        countincart: Number(item.countincart || 1) + 1,
    };

    return { ...state, items };
    }

    case "minusItem": {
    const index = action.payload;

    if (index < 0 || index >= items.length) {
        return state;
    }

    const item = items[index];
    const nextCount = Number(item.countincart || 1) - 1;

    if (nextCount < 1) {
        return state;
    }

    items[index] = {
        ...item,
        countincart: nextCount,
    };

    return { ...state, items };
    }

    case "romvefromcart": {
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
export function getPriceAfterDiscount(price, discount) {
    if (!price) {
        return 0;
    }

    const discountNumber = Number(discount) || 0;
    const discountRate = discountNumber > 1 ? discountNumber / 100 : discountNumber;
    const discountMultiplier = 1 - Math.min(Math.max(discountRate, 0), 1);

    return Number((price * discountMultiplier).toFixed(2));
}
