"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
CheckCircle2,
XCircle,
Loader2,
} from "lucide-react";

export default function PaymentCallback() {
const searchParams = useSearchParams();
const router = useRouter();

const success = searchParams.get("success") === "true";
const pending = searchParams.get("pending") === "true";
const orderId = searchParams.get("order");

useEffect(() => {
    console.log("Paymob callback:", {
    success,
    pending,
    orderId,
    });
}, [success, pending, orderId]);

if (pending) {
    return (
    <main className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
            <Loader2 className="h-7 w-7 animate-spin" />
        </div>

        <h1 className="text-2xl font-semibold text-black">
            Payment Processing
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
            Your payment is still being processed. Please wait a moment.
        </p>
        </div>
    </main>
    );
}

if (success) {
    return (
    <main className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-6">
        <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
            <CheckCircle2 className="h-8 w-8" />
        </div>

        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-gray-400">
            VELORA
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-black">
            Payment Successful
        </h1>

        <p className="mt-4 text-sm leading-6 text-gray-500">
            Thank you for your order. Your payment has been successfully
            completed.
        </p>

        {orderId && (
            <p className="mt-4 text-xs text-gray-400">
            Order ID: {orderId}
            </p>
        )}

        <button
            onClick={() => router.push("/")}
            className="mt-8 w-full rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
            Continue Shopping
        </button>
        </div>
    </main>
    );
}

return (
    <main className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-6">
    <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-black text-white">
        <XCircle className="h-8 w-8" />
        </div>

        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-gray-400">
        VELORA
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-black">
        Payment Failed
        </h1>

        <p className="mt-4 text-sm leading-6 text-gray-500">
        We couldn't complete your payment. Please try again.
        </p>

        {orderId && (
        <p className="mt-4 text-xs text-gray-400">
            Order ID: {orderId}
        </p>
        )}

        <div className="mt-8 flex flex-col gap-3">
        <button
            onClick={() => router.push("/checkout")}
            className="w-full rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
            Try Again
        </button>

        <button
            onClick={() => router.push("/")}
            className="w-full rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-black transition hover:bg-white"
        >
            Back to Home
        </button>
        </div>
    </div>
    </main>
);
}