import { useContext, useEffect } from "react";
import { CartContext } from "../Context/Productscontext";
import { useState } from "react";
import { getPriceAfterDiscount } from '../utils/priceUtils';
export default function Checkout() {
    const {state} = useContext(CartContext)
    const [total , settotal] = useState(0)
    useEffect(()=>{
        let filter=state.filter((i)=>{
        return i.addtocard==true
        })
        const newtotal = filter.reduce((acc, item) => {
        return acc + (getPriceAfterDiscount(item.price, item.Discount) * item.countincart);
        }, 0);
        settotal(newtotal)
    },[state])
    const cartItems =state.filter((item)=>{
        return item.addtocard===true
    })
    return (
        <main className="max-w-[1400px] mx-auto px-4 md:px-8 pt-12 pb-24 bg-[#f8f8f7] min-h-screen text-[#111]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side */}
            <div className="lg:col-span-8 space-y-10">
            
            {/* Shipping */}
            <section>
                <h1 className="text-4xl font-bold mb-8">Checkout</h1>

                <div className="bg-[#ffffff] rounded-2xl p-8 shadow-sm border border-[#ececec]">
                <div className="flex items-center gap-4 mb-8">
                    <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                    1
                    </span>

                    <h2 className="text-2xl font-semibold">
                    Shipping Information
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="space-y-2">
                    <label className="text-sm text-[#777] block">
                        First Name
                    </label>

                    <input
                        type="text"
                        placeholder="John"
                        className="w-full bg-[#fafafa] border border-[#e5e5e5] focus:border-black rounded-xl px-4 py-3 outline-none transition-all"
                    />
                    </div>

                    <div className="space-y-2">
                    <label className="text-sm text-[#777] block">
                        Last Name
                    </label>

                    <input
                        type="text"
                        placeholder="Doe"
                        className="w-full bg-[#fafafa] border border-[#e5e5e5] focus:border-black rounded-xl px-4 py-3 outline-none transition-all"
                    />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                    <label className="text-sm text-[#777] block">
                        Address
                    </label>

                    <input
                        type="text"
                        placeholder="123 Luxury Ave"
                        className="w-full bg-[#fafafa] border border-[#e5e5e5] focus:border-black rounded-xl px-4 py-3 outline-none transition-all"
                    />
                    </div>

                    <div className="space-y-2">
                    <label className="text-sm text-[#777] block">
                        City
                    </label>

                    <input
                        type="text"
                        placeholder="New York"
                        className="w-full bg-[#fafafa] border border-[#e5e5e5] focus:border-black rounded-xl px-4 py-3 outline-none transition-all"
                    />
                    </div>

                    <div className="space-y-2">
                    <label className="text-sm text-[#777] block">
                        Postal Code
                    </label>

                    <input
                        type="text"
                        placeholder="10001"
                        className="w-full bg-[#fafafa] border border-[#e5e5e5] focus:border-black rounded-xl px-4 py-3 outline-none transition-all"
                    />
                    </div>
                </div>
                </div>
            </section>

            {/* Payment */}
            <section>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#ececec]">
                
                <div className="flex items-center gap-4 mb-8">
                    <span className="w-8 h-8 rounded-full bg-[#f1f1f1] text-black flex items-center justify-center text-sm font-bold">
                    2
                    </span>

                    <h2 className="text-2xl font-semibold">
                    Payment Details
                    </h2>
                </div>

                <div className="space-y-6">
                    
                    <div className="space-y-2">
                    <label className="text-sm text-[#777] block">
                        Card Number
                    </label>

                    <div className="relative">
                        <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        className="w-full bg-[#fafafa] border border-[#e5e5e5] focus:border-black rounded-xl pl-4 pr-12 py-3 outline-none transition-all"
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#999]">
                        credit_card
                        </span>
                    </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                    
                    <div className="space-y-2">
                        <label className="text-sm text-[#777] block">
                        Expiry Date
                        </label>

                        <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full bg-[#fafafa] border border-[#e5e5e5] focus:border-black rounded-xl px-4 py-3 outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm text-[#777] block">
                        CVV
                        </label>

                        <input
                        type="password"
                        placeholder="***"
                        className="w-full bg-[#fafafa] border border-[#e5e5e5] focus:border-black rounded-xl px-4 py-3 outline-none transition-all"
                        />
                    </div>
                    </div>

                    {/* Security */}
                    <div className="pt-6 flex flex-wrap items-center gap-6 border-t border-[#eee]">
                    
                    <div className="flex items-center gap-2 text-[#666]">
                        <span className="material-symbols-outlined text-[18px]">
                        lock
                        </span>

                        <span className="text-sm">
                        Secure SSL Encryption
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-[#666]">
                        <span className="material-symbols-outlined text-[18px]">
                        verified
                        </span>

                        <span className="text-sm">
                        PCI DSS Compliant
                        </span>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            </div>
            {/* Right Side */}
            <aside className="lg:col-span-4 sticky top-24">
            
            <div className="bg-white rounded-2xl p-8 border border-[#ececec] shadow-sm">
                
                <h3 className="text-2xl font-semibold mb-6">
                Order Summary
                </h3>

                <div className="space-y-6 mb-8">
                    {cartItems.map((item, index) => (
                        <div key={index} className="flex gap-4">
                            
                            <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#f5f5f5] shrink-0">
                            <img
                                src={item.img}
                                alt={item.title}
                                loading='lazy'
                                className="w-full h-full object-cover"
                            />
                            </div>

                            <div className="flex-grow">
                            <p className="font-medium">
                                {item.title}
                            </p>

                            <p className="text-sm text-[#777] mt-1">
                                Qty: {item.countincart}
                            </p>

                            <p className="font-bold mt-1">
                                ${getPriceAfterDiscount(item.price, item.Discount)}
                            </p>
                            </div>

                        </div>
                    ))}
                </div>
                {/* Price */}
                <div className="space-y-4 pt-6 border-t border-[#eee]">
                
                <div className="flex justify-between">
                    <span className="text-[#777]">
                    Subtotal
                    </span>

                    <span className="font-medium">
                    {total}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-[#777]">
                    Shipping
                    </span>

                    <span className="font-medium">
                    Free
                    </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-[#eee]">
                    <span className="text-2xl font-bold">
                    Total
                    </span>

                    <span className="text-2xl font-bold">
                    ${total}
                    </span>
                </div>
                </div>

                <button className="w-full mt-8 bg-black text-white py-4 rounded-full font-semibold hover:scale-[1.02] transition-all duration-200">
                Complete Purchase
                </button>

                <p className="text-center text-sm text-[#777] mt-4 px-4">
                By clicking "Complete Purchase", you agree to our Terms &
                Conditions and Privacy Policy.
                </p>
            </div>
            </aside>
        </div>
        </main>
    );
}