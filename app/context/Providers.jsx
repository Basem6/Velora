"use client";

import { CartProvider } from "@/app/context/CartContext";
import { WishlistProvider } from "@/app/context/WishlistContext";
import { ToastProvider } from "@/app/context/ToastContext";

export default function Providers({ children }) {
return (
    <ToastProvider>
    <CartProvider>
        <WishlistProvider>
        {children}
        </WishlistProvider>
    </CartProvider>
    </ToastProvider>
);
}