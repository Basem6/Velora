"use client";

import { createContext, useState } from "react";

export const WishlistContext = createContext(null);

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
    setItems((current) =>
    current.filter((entry) => entry.id !== id)
    );
};

const isInWishlist = (id) =>
    items.some((entry) => entry.id === id);

return (
    <WishlistContext.Provider
    value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
    }}
    >
    {children}
    </WishlistContext.Provider>
);
}