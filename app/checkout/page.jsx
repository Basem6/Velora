"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import {ArrowLeft,Check,CreditCard,Lock,MapPin,Minus,PackageCheck,Plus,ShoppingBag,} from "lucide-react";

import {CartContext,getPriceAfterDiscount,} from "@/app/context/CartContext";

import { ToastContext } from "@/app/context/ToastContext";
import ConfirmDialog from "@/app/components/ui/ConfirmDialog";
import { useAuth } from "@/app/context/AuthContext";
export default function CheckoutPage() {
const { token} = useAuth();
const { state, dispatch } = useContext(CartContext) || {
state: { items: [] },
dispatch: () => {},
};

const { showToast } = useContext(ToastContext) || {
showToast: () => {},
};


const items = useMemo(() => {
return Array.isArray(state.items)
? state.items.filter(
        (item) => item?.addtocard === true
    )
: [];
}, [state.items]);

const subtotal = useMemo(() => {
return items.reduce((sum, item) => {
const unitPrice = getPriceAfterDiscount(
    item.price,
    item.Discount
);

return (
    sum +
    unitPrice *
        Number(item.countincart || 1)
);
}, 0);
}, [items]);

const shipping =
subtotal > 100 || items.length === 0
? 0
: 12;

const tax = subtotal * 0.08;

const total = subtotal + shipping + tax;

const [promoCode, setPromoCode] = useState("");

const [paymentMethod, setPaymentMethod] =
useState("card");

const [removeIndex, setRemoveIndex] =
useState(null);

const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({
firstName: "",
lastName: "",
email: "",
phone: "",
street: "",
city: "",
postalCode: "",
});

console.log(items)
const handleInputChange = (event) => {
const { name, value } = event.target;

setFormData((previous) => ({
...previous,
[name]: value,
}));
};

const updateQuantity = (type, index) => {
if (type === "plus") {
dispatch({
    type: "plusItem",
    payload: index,
});
}

if (type === "minus") {
dispatch({
    type: "minusItem",
    payload: index,
});
}
};

const removeItem = (index) => {
setRemoveIndex(index);
};

const confirmRemove = () => {
if (removeIndex !== null) {
dispatch({
    type: "romvefromcart",
    payload: removeIndex,
});
}

setRemoveIndex(null);
};

const validateForm = () => {
const requiredFields = [

"firstName",
"lastName",
"email",
"phone",
"street",
"city",
"postalCode",
];

for (const field of requiredFields) {
if (!formData[field].trim()) {
    showToast(
        `Please enter your ${field
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()}.`,
        "error"
    );

    return false;
}
}

if (
!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    formData.email
)
) {
showToast(
    "Please enter a valid email address.",
    "error"
);

return false;
}

return true;
};


const handlePlaceOrder = async () => {
  if (loading) return;

  if (!token) {
    showToast("Please wait while your session is being created.", "error");
    return;
  }

  if (!validateForm()) {
    return;
  }

  if (items.length === 0) {
    showToast("Your cart is empty.", "error");
    return;
  }

  try {
    setLoading(true);

    // =========================
    // 1. Create Order
    // =========================

    const orderPayload = {
      products: items.map((item) => ({
        // IMPORTANT:
        // This must be the MongoDB _id
        product: item._id,

        name: item.name,

        price: getPriceAfterDiscount(
          item.price,
          item.Discount || 0
        ),

        quantity: Number(item.countincart || 1),
      })),

      shippingAddress: {
        fullName: `${formData.firstName} ${formData.lastName}`,
        address: formData.street,
        city: formData.city,
        country: "Egypt",
        postalCode: formData.postalCode,
        phone: formData.phone,
      },

      totalPrice: total,

      paymentMethod,
    };

    console.log("ORDER PAYLOAD:", orderPayload);

    const orderResponse = await fetch(
      "https://backend-velora-production.up.railway.app/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      }
    );

    const orderData = await orderResponse.json();

    console.log("ORDER RESPONSE:", orderData);

    if (!orderResponse.ok) {
      throw new Error(
        orderData?.message || "Failed to create order"
      );
    }

    const orderId = orderData.orderId;

    if (!orderId) {
      throw new Error("Order ID was not returned");
    }

    console.log("ORDER CREATED:", orderId);

    // =========================
    // 2. Cash On Delivery
    // =========================

    if (paymentMethod === "cash") {
      showToast(
        "Your order has been placed successfully.",
        "success"
      );

      // optional:
      // dispatch({ type: "clearCart" });

      // redirect to success page
      // router.push(`/order-success?orderId=${orderId}`);

      return;
    }

    // =========================
    // 3. Paymob
    // =========================

    const paymentResponse = await fetch(
      "https://backend-velora-production.up.railway.app/api/payment/pay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderId,
        }),
      }
    );

    const paymentData = await paymentResponse.json();

    console.log("PAYMENT RESPONSE:", paymentData);

    if (!paymentResponse.ok) {
      throw new Error(
        paymentData?.message ||
          "Failed to initiate payment"
      );
    }

    const iframeUrl =
      paymentData?.data?.iframeUrl;

    if (!iframeUrl) {
      throw new Error(
        "Paymob iframe URL was not returned"
      );
    }

    // =========================
    // 4. Redirect to Paymob
    // =========================

    window.location.href = iframeUrl;

  } catch (error) {
    console.error(
      "CHECKOUT ERROR:",
      error
    );

    showToast(
      error?.message ||
        "Unable to complete checkout.",
      "error"
    );
  } finally {
    setLoading(false);
  }
};


if (!items.length) {
return (
<section className="min-h-[62vh] px-5 py-24 text-stone-950 md:px-12">
    <div className="mx-auto max-w-4xl border border-stone-200 bg-white px-8 py-16 text-center md:px-14">
        <div className="mb-6 flex justify-center">
            <ShoppingBag
                size={42}
                strokeWidth={1}
                className="text-stone-500"
            />
        </div>

        <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-stone-500">
            Checkout
        </p>

        <h1 className="font-serif text-5xl leading-none md:text-6xl">
            Your Bag Is Empty
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-stone-500">
            Add a few considered pieces
            before continuing to secure
            checkout.
        </p>

        <Link
            href="/products/clothing"
            className="mt-8 inline-flex min-h-11 items-center justify-center border border-stone-950 bg-stone-950 px-8 text-xs font-medium uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-stone-950"
        >
            Continue Shopping
        </Link>
    </div>
</section>
);
}

return (
<>
<ConfirmDialog
    open={removeIndex !== null}
    title="Remove item"
    message="Are you sure you want to remove this item from your bag?"
    cancelLabel="Keep item"
    confirmLabel="Remove"
    onCancel={() =>
        setRemoveIndex(null)
    }
    onConfirm={confirmRemove}
/>

<section className="min-h-screen w-full max-w-full px-4 py-16 text-stone-950 sm:px-5 md:px-12 md:py-26">
    <div className="mx-auto w-full max-w-7xl min-w-0">

        {/* Header */}

        <header className="mb-10 flex w-full min-w-0 flex-col items-start justify-between gap-5 border-b border-stone-200 pb-8 sm:flex-row sm:items-end">
            <div className="min-w-0">
                <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-stone-500">
                    The Edit
                </p>

                <h1 className="font-serif text-5xl leading-none md:text-7xl">
                    Checkout
                </h1>
            </div>

            <Link
                href="/cart"
                className="inline-flex shrink-0 items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-500 transition hover:text-stone-950"
            >
                <ArrowLeft
                    size={14}
                    strokeWidth={1.4}
                />

                Return to Bag
            </Link>
        </header>

        {/* Steps */}

        <div className="mb-8 flex w-full min-w-0 flex-wrap items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-950 bg-stone-950 text-white">
                <Check
                    size={14}
                    strokeWidth={2}
                />
            </span>

            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500">
                Shipping
            </span>

            <span className="hidden h-px w-14 bg-stone-300 sm:block" />

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-500">
                2
            </span>

            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500">
                Payment
            </span>

            <span className="hidden h-px w-14 bg-stone-300 sm:block" />

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-500">
                3
            </span>

            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-500">
                Review
            </span>
        </div>

        {/* Main Grid */}

        <div className="grid min-w-full gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">

            {/* Left */}

            <div className="w-full min-w-0">

                {/* Shipping */}

                <section className="w-full min-w-0 border border-stone-200 bg-white p-4 sm:p-6 md:p-10">

                    <div className="mb-8 flex min-w-0 items-center justify-between gap-4">

                        <div className="min-w-0">
                            <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500">
                                Contact Details
                            </p>

                            <h2 className="mt-2 font-serif text-3xl leading-none md:text-4xl">
                                Shipping Information
                            </h2>
                        </div>

                        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-stone-200">
                            <MapPin
                                size={18}
                                strokeWidth={1.3}
                            />
                        </span>
                    </div>

                    <div className="grid min-w-0 gap-5 md:grid-cols-2">

                        {/* First Name */}

                        <label className="block min-w-0">
                            <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
                                First Name
                            </span>

                            <input
                                type="text"
                                name="firstName"
                                value={
                                    formData.firstName
                                }
                                onChange={
                                    handleInputChange
                                }
                                autoComplete="given-name"
                                className="min-h-11 w-full min-w-0 border border-stone-300 bg-stone-50 px-4 text-sm text-stone-950 outline-none focus:border-stone-950"
                            />
                        </label>

                        {/* Last Name */}

                        <label className="block min-w-0">
                            <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
                                Last Name
                            </span>

                            <input
                                type="text"
                                name="lastName"
                                value={
                                    formData.lastName
                                }
                                onChange={
                                    handleInputChange
                                }
                                autoComplete="family-name"
                                className="min-h-11 w-full min-w-0 border border-stone-300 bg-stone-50 px-4 text-sm text-stone-950 outline-none focus:border-stone-950"
                            />
                        </label>

                        {/* Email */}

                        <label className="block min-w-0 md:col-span-2">
                            <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
                                Email Address
                            </span>

                            <input
                                type="email"
                                name="email"
                                value={
                                    formData.email
                                }
                                onChange={
                                    handleInputChange
                                }
                                autoComplete="email"
                                className="min-h-11 w-full min-w-0 border border-stone-300 bg-stone-50 px-4 text-sm text-stone-950 outline-none focus:border-stone-950"
                            />
                        </label>

                        {/* Phone */}

                        <label className="block min-w-0 md:col-span-2">
                            <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
                                Phone Number
                            </span>

                            <input
                                type="tel"
                                name="phone"
                                value={
                                    formData.phone
                                }
                                onChange={
                                    handleInputChange
                                }
                                autoComplete="tel"
                                placeholder="+20"
                                className="min-h-11 w-full min-w-0 border border-stone-300 bg-stone-50 px-4 text-sm text-stone-950 outline-none placeholder:text-stone-400 focus:border-stone-950"
                            />
                        </label>

                        {/* Street */}

                        <label className="block min-w-0 md:col-span-2">
                            <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
                                Street Address
                            </span>

                            <input
                                type="text"
                                name="street"
                                value={
                                    formData.street
                                }
                                onChange={
                                    handleInputChange
                                }
                                autoComplete="street-address"
                                className="min-h-11 w-full min-w-0 border border-stone-300 bg-stone-50 px-4 text-sm text-stone-950 outline-none focus:border-stone-950"
                            />
                        </label>

                        {/* City */}

                        <label className="block min-w-0">
                            <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
                                City
                            </span>

                            <input
                                type="text"
                                name="city"
                                value={
                                    formData.city
                                }
                                onChange={
                                    handleInputChange
                                }
                                autoComplete="address-level2"
                                className="min-h-11 w-full min-w-0 border border-stone-300 bg-stone-50 px-4 text-sm text-stone-950 outline-none focus:border-stone-950"
                            />
                        </label>

                        {/* Postal */}

                        <label className="block min-w-0">
                            <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.2em] text-stone-500">
                                Postal Code
                            </span>

                            <input
                                type="text"
                                name="postalCode"
                                value={
                                    formData.postalCode
                                }
                                onChange={
                                    handleInputChange
                                }
                                autoComplete="postal-code"
                                className="min-h-11 w-full min-w-0 border border-stone-300 bg-stone-50 px-4 text-sm text-stone-950 outline-none focus:border-stone-950"
                            />
                        </label>
                    </div>
                </section>

                {/* Payment */}

                <section className="mt-6 w-full min-w-0 border border-stone-200 bg-white p-4 sm:p-6 md:p-9">

                    <div className="mb-6 flex min-w-0 items-center justify-between gap-4">

                        <div className="min-w-0">
                            <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500">
                                Payment
                            </p>

                            <h2 className="mt-2 font-serif text-3xl leading-none md:text-4xl">
                                Secure Payment
                            </h2>
                        </div>

                        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-stone-200">
                            <CreditCard
                                size={18}
                                strokeWidth={1.2}
                            />
                        </span>
                    </div>

                    <div className="grid min-w-0 gap-4">

                        {/* Methods */}

                        <div className="grid min-w-0 gap-3 sm:grid-cols-2">

                            {/* Card */}

                            <button
                                type="button"
                                onClick={() =>
                                    setPaymentMethod(
                                        "card"
                                    )
                                }
                                className={`flex min-h-11 min-w-0 items-center justify-center border px-4 py-3 text-[10px] uppercase tracking-[0.2em] ${
                                    paymentMethod ===
                                    "card"
                                        ? "border-stone-950 bg-stone-950 text-white"
                                        : "border-stone-300 bg-white text-stone-950 hover:border-stone-950"
                                }`}
                            >
                                Card
                            </button>

                            {/* Cash */}

                            <button
                                type="button"
                                onClick={() =>
                                    setPaymentMethod(
                                        "cash"
                                    )
                                }
                                className={`flex min-h-11 min-w-0 items-center justify-center border px-4 py-3 text-[10px] uppercase tracking-[0.2em] ${
                                    paymentMethod ===
                                    "cash"
                                        ? "border-stone-950 bg-stone-950 text-white"
                                        : "border-stone-300 bg-white text-stone-950 hover:border-stone-950"
                                }`}
                            >
                                Cash on Delivery
                            </button>
                        </div>

                        {/* Card Info */}

                        {paymentMethod ===
                            "card" && (
                            <div className="border border-stone-200 bg-stone-50 p-5">

                                <div className="flex items-start gap-3">

                                    <Lock
                                        size={17}
                                        strokeWidth={1.3}
                                        className="mt-0.5 shrink-0"
                                    />

                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-950">
                                            Secure Card Payment
                                        </p>

                                        <p className="mt-2 text-sm leading-6 text-stone-500">
                                            You will be redirected to Paymob's secure checkout to complete your payment.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Cash Info */}

                        {paymentMethod ===
                            "cash" && (
                            <div className="border border-stone-200 bg-stone-50 p-5">

                                <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-950">
                                    Cash on Delivery
                                </p>

                                <p className="mt-2 text-sm leading-6 text-stone-500">
                                    Pay in cash when your order is delivered.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Bottom Actions */}

                <div className="mt-8 flex w-full min-w-0 flex-col items-stretch gap-5 border-t border-stone-200 pt-8 sm:flex-row sm:items-center sm:justify-between">

                    <Link
                        href="/cart"
                        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-500 transition hover:text-stone-950"
                    >
                        <ArrowLeft
                            size={14}
                            strokeWidth={1.2}
                        />

                        Edit Bag
                    </Link>

                    <button
                        type="button"
                        disabled={loading}
                        onClick={
                            handlePlaceOrder
                        }
                        className="inline-flex min-h-12 w-full items-center justify-center border border-stone-950 bg-stone-950 px-8 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                        {loading
                            ? "Processing..."
                            : paymentMethod ===
                                "card"
                            ? "Continue to Payment"
                            : "Place Order"}
                    </button>
                </div>
            </div>

            {/* Order Summary */}

            <aside className="h-fit w-full min-w-0 self-start lg:sticky lg:top-24">

                <div className="w-full min-w-0 border border-stone-200 bg-white p-4 sm:p-6 md:p-8">

                    {/* Summary Header */}

                    <div className="mb-8 flex min-w-0 items-center justify-between gap-4">

                        <div className="min-w-0">
                            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-stone-500">
                                Order Summary
                            </p>
                        </div>

                        <span className="shrink-0 rounded-full border border-stone-300 px-3 py-1 text-[9px] uppercase tracking-[0.15em] text-stone-500 sm:px-4 sm:text-[10px] sm:tracking-[0.2em]">
                            {items.length} Items
                        </span>
                    </div>

                    {/* Items */}

                    <div className="space-y-5">

                        {items.map(
                            (
                                item,
                                index
                            ) => {
                                const discountedPrice =
                                    getPriceAfterDiscount(
                                        item.price,
                                        item.Discount
                                    );

                                return (
                                    <article
                                        key={`${item.name}-${index}`}
                                        className="flex min-w-0 flex-col items-start gap-4 border-b border-stone-200 pb-5 last:border-b-0 last:pb-0 sm:flex-row sm:items-center"
                                    >

                                        {/* Image */}

                                        <div className="relative h-24 w-20 flex-none overflow-hidden border border-stone-200 bg-stone-50">

                                            <Image
                                                src={
                                                    item.img
                                                }
                                                alt={
                                                    item.name
                                                }
                                                loading="lazy"
                                                fill
                                                sizes="80px"
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="w-full min-w-0 flex-1">

                                            <div className="flex min-w-0 items-start justify-between gap-3">

                                                <div className="min-w-0">

                                                    <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-stone-500">
                                                        {
                                                            item.category
                                                        }
                                                    </p>

                                                    <p className="truncate text-sm font-medium text-stone-950">
                                                        {
                                                            item.name
                                                        }
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeItem(
                                                            index
                                                        )
                                                    }
                                                    className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-stone-500 transition hover:text-stone-950"
                                                >
                                                    Remove
                                                </button>
                                            </div>

                                            <div className="mt-4 flex min-w-0 flex-wrap items-center justify-between gap-2">

                                                {/* Quantity */}

                                                <div className="flex items-center border border-stone-300">

                                                    <button
                                                        type="button"
                                                        aria-label="Decrease quantity"
                                                        disabled={
                                                            Number(
                                                                item.countincart
                                                            ) <=
                                                            1
                                                        }
                                                        onClick={() =>
                                                            updateQuantity(
                                                                "minus",
                                                                index
                                                            )
                                                        }
                                                        className="flex h-8 w-8 items-center justify-center text-stone-700 hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-45"
                                                    >
                                                        <Minus
                                                            size={
                                                                12
                                                            }
                                                            strokeWidth={
                                                                1.5
                                                            }
                                                        />
                                                    </button>

                                                    <span className="flex h-8 min-w-9 items-center justify-center border-x border-stone-300 px-3 text-xs text-stone-950">
                                                        {
                                                            item.countincart
                                                        }
                                                    </span>

                                                    <button
                                                        type="button"
                                                        aria-label="Increase quantity"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                "plus",
                                                                index
                                                            )
                                                        }
                                                        className="flex h-8 w-8 items-center justify-center text-stone-700 hover:bg-stone-100"
                                                    >
                                                        <Plus
                                                            size={
                                                                12
                                                            }
                                                            strokeWidth={
                                                                1.5
                                                            }
                                                        />
                                                    </button>
                                                </div>

                                                {/* Price */}

                                                <span className="text-sm font-medium text-stone-950">
                                                    EGP{" "}
                                                    {(
                                                        discountedPrice *
                                                        Number(
                                                            item.countincart ||
                                                                1
                                                        )
                                                    ).toFixed(
                                                        2
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                );
                            }
                        )}
                    </div>

                    {/* Totals */}

                    <div className="mt-8 border-t border-stone-200 pt-6">

                        <div className="flex items-center justify-between gap-4 text-sm">
                            <span className="text-stone-500">
                                Subtotal
                            </span>

                            <span className="font-medium text-stone-950">
                                EGP{" "}
                                {subtotal.toFixed(
                                    2
                                )}
                            </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                            <span className="text-stone-500">
                                Shipping
                            </span>

                            <span className="font-medium text-stone-950">
                                {shipping ===
                                0
                                    ? "Free"
                                    : `EGP ${shipping.toFixed(
                                            2
                                        )}`}
                            </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                            <span className="text-stone-500">
                                Estimated Tax
                            </span>

                            <span className="font-medium text-stone-950">
                                EGP{" "}
                                {tax.toFixed(
                                    2
                                )}
                            </span>
                        </div>

                        <div className="mt-6 flex items-center justify-between gap-4 border-t border-stone-200 pt-5">

                            <span className="text-[11px] uppercase tracking-[0.2em] text-stone-500">
                                Total
                            </span>

                            <span className="font-sans text-3xl text-stone-950">
                                EGP{" "}
                                {total.toFixed(
                                    2
                                )}
                            </span>
                        </div>
                    </div>

                    {/* Promo */}

                    <div className="mt-8 border-t border-stone-200 pt-6">

                        <div className="flex w-full min-w-0 items-center gap-2">

                            <input
                                type="text"
                                value={
                                    promoCode
                                }
                                onChange={(
                                    event
                                ) =>
                                    setPromoCode(
                                        event
                                            .target
                                            .value
                                    )
                                }
                                placeholder="Promo code"
                                className="min-h-11 min-w-0 flex-1 border border-stone-300 bg-white px-3 text-sm text-stone-950 outline-none placeholder:text-stone-400 focus:border-stone-950 sm:px-4"
                            />

                            <button
                                type="button"
                                className="min-h-11 shrink-0 border border-stone-950 bg-white px-3 text-[9px] font-medium uppercase tracking-[0.14em] text-stone-950 transition hover:bg-stone-950 hover:text-white sm:px-5 sm:text-[10px] sm:tracking-[0.18em]"
                            >
                                Apply
                            </button>
                        </div>
                    </div>

                    {/* Security */}

                    <div className="mt-8 border-t border-stone-200 pt-6">

                        <div className="flex flex-wrap items-center justify-between gap-4">

                            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-500">
                                <PackageCheck
                                    size={
                                        14
                                    }
                                    strokeWidth={
                                        1.2
                                    }
                                />

                                Secure checkout
                            </span>

                            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-500">
                                <Lock
                                    size={
                                        14
                                    }
                                    strokeWidth={
                                        1.2
                                    }
                                />

                                SSL
                            </span>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</section>
</>
);
}