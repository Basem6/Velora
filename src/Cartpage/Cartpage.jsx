import { useContext, useEffect } from "react";
import { CartContext } from "../Context/Productscontext";
import { useState } from "react";
import { getPriceAfterDiscount } from '../utils/priceUtils';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from "react-router-dom";
import { useToast } from "../Context/Toastcontext";
export default function CartPage() {
    const { showAlert } = useToast()
    const [current ,setcurrent] =useState(0)
    const [open, setOpen] = useState(false);
    const handleClickOpen = (e) => {
        setOpen(true);
        setcurrent(e)
    };

    const handleClose = () => {
        setOpen(false);
    };
    const {state , dispatch} = useContext(CartContext)
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
    function handleminusitem(index,e){
        if(Number(e.nextElementSibling.textContent)!=1){
        dispatch({
            type:"minusItem",
            payload:index
        })
        }
    }
    function handleplusitem(e){
        dispatch({
            type:"plusItem",
            payload:e
        })
    }
    function confirmAgree(){
        showAlert("success","removed from Cart")
        handleClose()
        dispatch({
            type:"romvefromcart",
            payload:current
        })
        console.log(state[current])
        console.log(current)
    }
    return (
        <>
        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            role="alertdialog"
        >
            <DialogTitle>{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Let Google help apps determine location. This means sending anonymous
                location data to Google, even when no apps are running.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} autoFocus>
                Disagree
            </Button>
            <Button onClick={confirmAgree}>Agree</Button>
            </DialogActions>
        </Dialog>
        <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 md:px-10 py-12 md:py-16 bg-[#f8f8f6] min-h-screen relative">
        <div className="flex flex-col gap-12">
            {/* Header */}
            <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-semibold tracking-tight text-[#111111]">
                Shopping Bag
            </h1>

            <p className="text-lg text-[#6b6b6b] max-w-2xl leading-relaxed">
                Refined selections for the discerning individual. Review your
                items before proceeding to checkout.
            </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Cart Items */}
            <div className="lg:col-span-8 flex flex-col gap-6 min-w-full">
                <div className="flex flex-col border-y border-[#dcdcd7]">
                    {state.map((item, index) => {
                        if (item.addtocard) {
                        return (
                            <div
                            key={index + 1}
                            className={`py-8 flex flex-col md:flex-row gap-6 items-center ${
                                index !== 0 ? "border-t border-[#dcdcd7]" : ""
                            }`}
                            >
                            <div className="w-full md:w-40 aspect-square overflow-hidden rounded-2xl bg-[#f1f1ee]">
                                <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className="flex-grow flex flex-col gap-2">
                                <div className="flex justify-between items-start gap-6">
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase tracking-[0.25em] text-[#8a8a82] mb-2">
                                    {item.category}
                                    </span>

                                    <h3 className="text-2xl font-medium text-[#111111]">
                                    {item.name}
                                    </h3>
                                </div>

                                <span className="text-2xl font-semibold text-[#111111] whitespace-nowrap">
                                    ${(getPriceAfterDiscount(item.price, item.Discount) * item.countincart).toFixed(2)}
                                </span>
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-5">
                                <div className="flex items-center gap-5 bg-white border border-[#e2e2dc] px-5 py-3 rounded-full w-fit shadow-sm">
                                    <span
                                    className="fa-solid fa-minus text-[#777] hover:text-black transition-colors"
                                    onClick={(e) => {
                                        handleminusitem(index, e.target);
                                    }}
                                    ></span>

                                    <span className="text-base font-medium text-[#111] w-5 text-center">
                                    {state[index].countincart}
                                    </span>

                                    <span
                                    className="fa-solid fa-plus text-[#777] hover:text-black transition-colors"
                                    onClick={() => {
                                        handleplusitem(index);
                                    }}
                                    ></span>
                                </div>
                                <button className="flex items-center gap-2 text-red-500 hover:text-red-300 transition-colors"  onClick={()=>{handleClickOpen(index)}}>
                                    <span className="fa-regular fa-trash-can"></span>
                                    <span className="text-sm font-medium">
                                    Remove
                                    </span>
                                </button>
                                </div>
                            </div>
                            </div>
                        );
                        }
                    })}
                </div>
                {/* Shipping */}
                <div className="flex items-center gap-3 py-2">
                <span className="fa-regular fa-truck text-[#8a8a82]">
                    
                </span>
                <p className="text-[#6b6b6b]">
                    Complementary white-glove shipping on orders over $1,000
                </p>
                </div>
            </div>

            {/* Summary */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24">
                <div className="bg-white p-8 rounded-3xl border border-[#e2e2dc] flex flex-col gap-8 shadow-[0px_10px_40px_rgba(0,0,0,0.03)]">
                <h2 className="text-3xl font-semibold text-[#111111]">
                    Order Summary
                </h2>

                <div className="flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                    <span className="text-[#6b6b6b]">Subtotal</span>

                    <span className="font-semibold text-[#111111]">
                        ${total}
                    </span>
                    </div>

                    <div className="flex justify-between items-center">
                    <span className="text-[#6b6b6b]">Shipping</span>

                    <span className="font-semibold text-[#111111]">
                        Free
                    </span>
                    </div>
                </div>

                {/* Total */}
                <div className="pt-6 border-t border-[#ecece7] flex flex-col gap-8">
                    <div className="flex justify-between items-end">
                    <span className="text-2xl font-semibold text-[#111111]">
                        Total
                    </span>

                    <div className="flex flex-col items-end">
                        <span className="text-4xl font-bold tracking-tight text-[#111111]">
                        ${total}
                        </span>

                        <span className="text-sm text-[#8a8a82]">
                        USD
                        </span>
                    </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-4">
                    <Link to={"/checkout"}>
                        <button className="w-full bg-[#111111] text-white py-4 rounded-2xl text-lg font-medium hover:opacity-90 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300">
                            Proceed to Checkout
                        </button>
                    </Link>
                    <button className="w-full cursor-no-drop bg-[#f1f1ee] border border-[#e2e2dc] text-[#111111] py-4 rounded-2xl text-base font-medium hover:bg-[#ecece7] transition-all duration-300">
                        Pay with Apple Pay
                    </button>
                    </div>
                </div>
                {/* Security */}
                <div className="flex flex-col gap-4 pt-2">
                    <p className="text-sm text-[#8a8a82] text-center">
                    Secure Checkout Guaranteed
                    </p>
                    <div className="flex justify-center gap-4 opacity-50">
                    <span className="fa-regular fa-credit-card">
                        
                    </span>
                    <span className="fa-solid fa-lock">
                    </span>
                    <span className="fa-regular fa-circle-check">
                        
                    </span>
                    </div>
                </div>
                </div>
                {/* Promo */}
                <div className="mt-6 p-6 bg-white rounded-3xl border border-[#e2e2dc]">
                <label className="text-xs uppercase tracking-[0.25em] text-[#8a8a82] mb-3 block">
                    Promo Code
                </label>
                <div className="flex gap-3">
                    <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-grow bg-[#f3f3ef] rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-black text-[#111]"
                    />

                    <button className="bg-[#111111] text-white px-5 rounded-xl hover:opacity-90 transition-all">
                    Apply
                    </button>
                </div>
                </div>
            </aside>
            </div>
        </div>
        </main>
        </>
    );
}