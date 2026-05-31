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
        <main className="max-w-[1400px] mx-auto px-4 md:px-8 pt-16 pb-24 min-h-screen mt-12" style={{ backgroundColor: '#0D0D0D', color: '#F0ECE4' }}>
        <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif", color: '#F0ECE4' }}>Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side */}
            <div className="lg:col-span-8 space-y-10">
            
            {/* Shipping */}
            <section>
                <div className="rounded-2xl p-8 shadow-sm" style={{ backgroundColor: '#1a1a1a', borderColor: 'rgba(200,168,130,0.2)', border: '1px solid' }}>
                <div className="flex items-center gap-4 mb-8">
                    <span className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold" style={{ backgroundColor: '#C8A882', color: '#0D0D0D' }}>
                    1
                    </span>

                    <h2 className="text-2xl font-semibold" style={{ color: '#F0ECE4' }}>
                    Shipping Information
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    <div className="space-y-2">
                    <label className="text-sm block" style={{ color: 'rgba(200,168,130,0.6)' }}>
                        First Name
                    </label>

                    <input
                        type="text"
                        placeholder="John"
                        className="w-full rounded-xl px-4 py-3 outline-none transition-all"
                        style={{ backgroundColor: 'rgba(200,168,130,0.05)', borderColor: 'rgba(200,168,130,0.2)', border: '1px solid', color: '#F0ECE4' }}
                    />
                    </div>

                    <div className="space-y-2">
                    <label className="text-sm block" style={{ color: 'rgba(200,168,130,0.6)' }}>
                        Last Name
                    </label>

                    <input
                        type="text"
                        placeholder="Doe"
                        className="w-full rounded-xl px-4 py-3 outline-none transition-all"
                        style={{ backgroundColor: 'rgba(200,168,130,0.05)', borderColor: 'rgba(200,168,130,0.2)', border: '1px solid', color: '#F0ECE4' }}
                    />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                    <label className="text-sm block" style={{ color: 'rgba(200,168,130,0.6)' }}>
                        Address
                    </label>

                    <input
                        type="text"
                        placeholder="123 Luxury Ave"
                        className="w-full rounded-xl px-4 py-3 outline-none transition-all"
                        style={{ backgroundColor: 'rgba(200,168,130,0.05)', borderColor: 'rgba(200,168,130,0.2)', border: '1px solid', color: '#F0ECE4' }}
                    />
                    </div>

                    <div className="space-y-2">
                    <label className="text-sm block" style={{ color: 'rgba(200,168,130,0.6)' }}>
                        City
                    </label>

                    <input
                        type="text"
                        placeholder="New York"
                        className="w-full rounded-xl px-4 py-3 outline-none transition-all"
                        style={{ backgroundColor: 'rgba(200,168,130,0.05)', borderColor: 'rgba(200,168,130,0.2)', border: '1px solid', color: '#F0ECE4' }}
                    />
                    </div>

                    <div className="space-y-2">
                    <label className="text-sm block" style={{ color: 'rgba(200,168,130,0.6)' }}>
                        Postal Code
                    </label>

                    <input
                        type="text"
                        placeholder="10001"
                        className="w-full rounded-xl px-4 py-3 outline-none transition-all"
                        style={{ backgroundColor: 'rgba(200,168,130,0.05)', borderColor: 'rgba(200,168,130,0.2)', border: '1px solid', color: '#F0ECE4' }}
                    />
                    </div>
                </div>
                </div>
            </section>

            {/* Payment */}
            <section>
                <div className="rounded-2xl p-8 shadow-sm" style={{ backgroundColor: '#1a1a1a', borderColor: 'rgba(200,168,130,0.2)', border: '1px solid' }}>
                
                <div className="flex items-center gap-4 mb-8">
                    <span className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold" style={{ backgroundColor: 'rgba(200,168,130,0.2)', color: '#C8A882' }}>
                    2
                    </span>

                    <h2 className="text-2xl font-semibold" style={{ color: '#F0ECE4' }}>
                    Payment Details
                    </h2>
                </div>

                <div className="space-y-6">
                    
                    <div className="space-y-2">
                    <label className="text-sm block" style={{ color: 'rgba(200,168,130,0.6)' }}>
                        Card Number
                    </label>

                    <div className="relative">
                        <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        className="w-full rounded-xl pl-4 pr-12 py-3 outline-none transition-all"
                        style={{ backgroundColor: 'rgba(200,168,130,0.05)', borderColor: 'rgba(200,168,130,0.2)', border: '1px solid', color: '#F0ECE4' }}
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined" style={{ color: 'rgba(200,168,130,0.4)' }}>
                        credit_card
                        </span>
                    </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                    
                    <div className="space-y-2">
                        <label className="text-sm block" style={{ color: 'rgba(200,168,130,0.6)' }}>
                        Expiry Date
                        </label>

                        <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full rounded-xl px-4 py-3 outline-none transition-all"
                        style={{ backgroundColor: 'rgba(200,168,130,0.05)', borderColor: 'rgba(200,168,130,0.2)', border: '1px solid', color: '#F0ECE4' }}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm block" style={{ color: 'rgba(200,168,130,0.6)' }}>
                        CVV
                        </label>

                        <input
                        type="password"
                        placeholder="***"
                        className="w-full rounded-xl px-4 py-3 outline-none transition-all"
                        style={{ backgroundColor: 'rgba(200,168,130,0.05)', borderColor: 'rgba(200,168,130,0.2)', border: '1px solid', color: '#F0ECE4' }}
                        />
                    </div>
                    </div>

                    {/* Security */}
                    <div className="pt-6 flex flex-wrap items-center gap-6" style={{ borderTop: '1px solid rgba(200,168,130,0.2)' }}>
                    
                    <div className="flex items-center gap-2" style={{ color: 'rgba(200,168,130,0.6)' }}>
                        <span className="material-symbols-outlined text-[18px]">
                        lock
                        </span>

                        <span className="text-sm">
                        Secure SSL Encryption
                        </span>
                    </div>

                    <div className="flex items-center gap-2" style={{ color: 'rgba(200,168,130,0.6)' }}>
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
            <aside className="lg:col-span-4 ">
                <div className="rounded-2xl p-8 shadow-sm" style={{ backgroundColor: '#1a1a1a', borderColor: 'rgba(200,168,130,0.2)', border: '1px solid' }}>
                    
                    <h3 className="text-2xl font-semibold mb-6" style={{ color: '#F0ECE4' }}>
                    Order Summary
                    </h3>

                    <div className="space-y-6 mb-8">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex gap-4">
                                
                                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0" style={{ backgroundColor: '#0D0D0D' }}>
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    loading='lazy'
                                    className="w-full h-full object-cover"
                                />
                                </div>

                                <div className="flex-grow">
                                <p className="font-medium" style={{ color: '#F0ECE4' }}>
                                    {item.title}
                                </p>

                                <p className="text-sm mt-1" style={{ color: 'rgba(200,168,130,0.6)' }}>
                                    Qty: {item.countincart}
                                </p>

                                <p className="font-bold mt-1" style={{ color: '#F0ECE4' }}>
                                    ${getPriceAfterDiscount(item.price, item.Discount)}
                                </p>
                                </div>

                            </div>
                        ))}
                    </div>
                    {/* Price */}
                    <div className="space-y-4 pt-6" style={{ borderTop: '1px solid rgba(200,168,130,0.2)' }}>
                    
                    <div className="flex justify-between">
                        <span style={{ color: 'rgba(200,168,130,0.6)' }}>
                        Subtotal
                        </span>

                        <span className="font-medium" style={{ color: '#F0ECE4' }}>
                        {total}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span style={{ color: 'rgba(200,168,130,0.6)' }}>
                        Shipping
                        </span>

                        <span className="font-medium" style={{ color: '#F0ECE4' }}>
                        Free
                        </span>
                    </div>
                    <div className="flex justify-between pt-4" style={{ borderTop: '1px solid rgba(200,168,130,0.2)' }}>
                        <span className="text-2xl font-bold" style={{ color: '#F0ECE4' }}>
                        Total
                        </span>

                        <span className="text-2xl font-bold" style={{ color: '#F0ECE4' }}>
                        ${total}
                        </span>
                    </div>
                    </div>

                    <button className="w-full mt-8 py-4 rounded-full font-semibold hover:scale-[1.02] transition-all duration-200" style={{ backgroundColor: '#C8A882', color: '#0D0D0D' }}>
                    Complete Purchase
                    </button>

                    <p className="text-center text-sm mt-4 px-4" style={{ color: 'rgba(200,168,130,0.6)' }}>
                    By clicking "Complete Purchase", you agree to our Terms &
                    Conditions and Privacy Policy.
                    </p>
                </div>
            </aside>
        </div>
        </main>
    );
}