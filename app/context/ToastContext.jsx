"use client";

import { createContext, useState } from "react";

export const ToastContext = createContext(null);

export function ToastProvider({ children }) {
const [toast, setToast] = useState(null);

const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
    setToast(null);
    }, 2600);
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