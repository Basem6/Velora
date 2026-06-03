import { useContext, useEffect } from "react";
import { CartContext } from "../../Context/Productscontext";
import { useState } from "react";
import { getPriceAfterDiscount } from '../../utils/priceUtils';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from "react-router-dom";
import { useToast } from "../../Context/Toastcontext";
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
        <main className="max-w-350 mx-auto w-full px-4 md:px-10 py-16 min-h-screen relative mt-12" style={{ backgroundColor: '#0D0D0D' }}>
        <div className="flex flex-col gap-12">
            {/* Header */}
            <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-semibold tracking-tight" style={{ color: '#F0ECE4', fontFamily: "'Playfair Display', serif" }}>
                Shopping Bag
            </h1>

            <p className="text-lg max-w-2xl leading-relaxed" style={{ color: 'rgba(240,236,228,0.6)' }}>
                Refined selections for the discerning individual. Review your
                items before proceeding to checkout.
            </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Cart Items */}
            <div className="lg:col-span-8 flex flex-col gap-6 min-w-full">
                <div className="flex flex-col border-y" style={{ borderColor: 'rgba(200,168,130,0.2)' }}>
                    {state.map((item, index) => {
                        if (item.addtocard) {
                        return (
                            <div
                            key={index + 1}
                            className={`py-8 flex flex-row gap-6 items-center ${
                                index !== 0 ? "border-t" : ""
                            }`}
                            style={{ borderColor: index !== 0 ? 'rgba(200,168,130,0.2)' : 'transparent' }}
                            >
                            <div className="w-20 md:w-40 aspect-square overflow-hidden rounded-2xl" style={{ backgroundColor: '#1a1a1a' }}>
                                <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className="grow flex flex-col gap-2 ">
                                <div className="flex justify-between items-center gap-6">
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase tracking-[0.25em] mb-2" style={{ color: 'rgba(200,168,130,0.6)' }}>
                                    {item.category}
                                    </span>

                                    <h3 className="text-2xl font-medium" style={{ color: '#F0ECE4' }}>
                                    {item.name}
                                    </h3>
                                </div>

                                <span className="text-2xl font-semibold whitespace-nowrap" style={{ color: '#F0ECE4' }}>
                                    ${(getPriceAfterDiscount(item.price, item.Discount) * item.countincart).toFixed(2)}
                                </span>
                                </div>

                                <div className="flex flex-row  items-center justify-between gap-4 mt-5">
                                <div className="flex items-center gap-5 px-5 py-3 rounded-full w-fit shadow-sm" style={{ backgroundColor: 'rgba(13,13,13,0.5)', borderColor: 'rgba(200,168,130,0.2)', border: '1px solid', color: 'rgba(200,168,130,0.7)' }}>
                                    <span
                                    className="fa-solid fa-minus cursor-pointer hover:text-yellow-300 transition-colors"
                                    onClick={(e) => {
                                        handleminusitem(index, e.target);
                                    }}
                                    ></span>

                                    <span className="text-base font-medium w-5 text-center" style={{ color: '#F0ECE4' }}>
                                    {state[index].countincart}
                                    </span>

                                    <span
                                    className="fa-solid fa-plus cursor-pointer hover:text-yellow-300 transition-colors"
                                    onClick={() => {
                                        handleplusitem(index);
                                    }}
                                    ></span>
                                </div>
                                <button className="flex items-center gap-2 transition-colors"  onClick={()=>{handleClickOpen(index)}} style={{ color: '#C8A882' }}>
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
                <span className="fa-regular fa-truck" style={{ color: 'rgba(200,168,130,0.6)' }}>
                    
                </span>
                <p style={{ color: 'rgba(240,236,228,0.6)' }}>
                    Complementary white-glove shipping on orders over $1,000
                </p>
                </div>
            </div>
            {/* Summary */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24">
                <div className="p-8 rounded-3xl border flex flex-col gap-8 shadow-[0px_10px_40px_rgba(0,0,0,0.5)]" style={{ backgroundColor: '#1a1a1a', borderColor: 'rgba(200,168,130,0.2)' }}>
                <h2 className="text-3xl font-semibold" style={{ color: '#F0ECE4' }}>
                    Order Summary
                </h2>

                <div className="flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                    <span style={{ color: 'rgba(240,236,228,0.6)' }}>Subtotal</span>

                    <span className="font-semibold" style={{ color: '#F0ECE4' }}>
                        ${total}
                    </span>
                    </div>

                    <div className="flex justify-between items-center">
                    <span style={{ color: 'rgba(240,236,228,0.6)' }}>Shipping</span>

                    <span className="font-semibold" style={{ color: '#F0ECE4' }}>
                        Free
                    </span>
                    </div>
                </div>

                {/* Total */}
                <div className="pt-6 border-t flex flex-col gap-8" style={{ borderColor: 'rgba(200,168,130,0.2)' }}>
                    <div className="flex justify-between items-end">
                    <span className="text-2xl font-semibold" style={{ color: '#F0ECE4' }}>
                        Total
                    </span>

                    <div className="flex flex-col items-end">
                        <span className="text-4xl font-bold tracking-tight" style={{ color: '#F0ECE4' }}>
                        ${total}
                        </span>

                        <span className="text-sm" style={{ color: 'rgba(200,168,130,0.6)' }}>
                        USD
                        </span>
                    </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-4">
                    <Link to={"/checkout"}>
                        <button className={'w-full text-white py-4 rounded-2xl text-lg font-medium hover:opacity-90 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300' + (cartItems.length === 0 ? ' cursor-not-allowed opacity-50' : '')} style={{ backgroundColor: cartItems.length === 0 ? 'rgba(200,168,130,0.3)' : '#C8A882', color: '#0D0D0D' }} disabled={cartItems.length === 0}>
                            Proceed to Checkout
                        </button>
                    </Link>
                    <button className="w-full cursor-no-drop border text-base font-medium py-4 rounded-2xl transition-all duration-300" style={{ borderColor: 'rgba(200,168,130,0.2)', backgroundColor: 'rgba(200,168,130,0.05)', color: '#F0ECE4' }}>
                        Pay with Apple Pay
                    </button>
                    </div>
                </div>
                {/* Security */}
                <div className="flex flex-col gap-4 pt-2">
                    <p className="text-sm text-center" style={{ color: 'rgba(200,168,130,0.6)' }}>
                    Secure Checkout Guaranteed
                    </p>
                    <div className="flex justify-center gap-4" style={{ color: 'rgba(200,168,130,0.5)' }}>
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
                <div className="mt-6 p-6 rounded-3xl border" style={{ backgroundColor: '#1a1a1a', borderColor: 'rgba(200,168,130,0.2)' }}>
                <label className="text-xs uppercase tracking-[0.25em] mb-3 block" style={{ color: 'rgba(200,168,130,0.6)' }}>
                    Promo Code
                </label>
                <div className="flex gap-3 flex-wrap ">
                    <input
                    type="text"
                    placeholder="Enter code"
                    className="grow rounded-xl px-4 py-3 outline-none focus:ring-1"
                    style={{ backgroundColor: 'rgba(200,168,130,0.08)', color: '#F0ECE4' }}
                    />
                    <button disabled className="grow text-white px-5 py-2 rounded-xl hover:opacity-90 transition-all cursor-no-drop" style={{ backgroundColor: '#C8A882', color: '#0D0D0D' }}>
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