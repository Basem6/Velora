"use client";

import { CartProvider } from "@/app/context/CartContext";
import { WishlistProvider } from "@/app/context/WishlistContext";
import { ToastProvider } from "@/app/context/ToastContext";
import { AuthProvider } from "@/app/context/AuthContext"

export default function Providers({ children }) {
return (
    <AuthProvider>
    <ToastProvider>
    <CartProvider>
        <WishlistProvider>
        {children}
        </WishlistProvider>
    </CartProvider>
    </ToastProvider>
    </AuthProvider>
);
}