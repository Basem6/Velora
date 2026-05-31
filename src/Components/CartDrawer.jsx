import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../Context/Productscontext';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getPriceAfterDiscount } from '../utils/priceUtils';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';
import { useToast } from '../Context/Toastcontext';

export default function CartDrawer({ open, onClose }) {
    const { state, dispatch } = useContext(CartContext);
    const { showAlert } = useToast();
    const [total, setTotal] = useState(0);
    const [current, setCurrent] = useState(0);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    // Calculate total price
    useEffect(() => {
        const cartItems = state.filter((i) => i.addtocard === true);
        const newTotal = cartItems.reduce((acc, item) => {
            return acc + getPriceAfterDiscount(item.price, item.Discount) * item.countincart;
        }, 0);
        setTotal(newTotal);
    }, [state]);

    const cartItems = state.filter((item) => item.addtocard === true);

    const handleMinusItem = (index) => {
        if (state[index].countincart > 1) {
            dispatch({
                type: 'minusItem',
                payload: index,
            });
        }
    };

    const handlePlusItem = (index) => {
        dispatch({
            type: 'plusItem',
            payload: index,
        });
    };

    const handleDeleteClick = (index) => {
        setCurrent(index);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        showAlert('success', 'removed from Cart');
        setDeleteDialogOpen(false);
        dispatch({
            type: 'romvefromcart',
            payload: current,
        });
    };

    return (
        <>
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{ backgroundColor: '#1a1a1a', color: '#F0ECE4' }}>
                    Remove Item
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: '#1a1a1a', color: '#F0ECE4' }}>
                    <DialogContentText sx={{ color: 'rgba(240,236,228,0.6)' }}>
                        Are you sure you want to remove this item from your cart?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#1a1a1a', padding: '16px' }}>
                    <Button onClick={() => setDeleteDialogOpen(false)} sx={{ color: '#C8A882' }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        sx={{ color: '#C8A882', fontWeight: 'bold' }}
                        autoFocus
                    >
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>

            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: '#0D0D0D',
                        borderLeft: '2px solid rgba(200,168,130,0.3)',
                    },
                }}
            >
                <div
                    className="w-full max-w-md px-6 py-4 flex flex-col h-full"
                    style={{ backgroundColor: '#0D0D0D' }}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 pb-4 border-b" style={{ borderColor: 'rgba(200,168,130,0.3)' }}>
                        <h2 className="text-2xl font-semibold" style={{ color: '#F0ECE4', fontFamily: "'Playfair Display', serif" }}>
                            Shopping Cart
                        </h2>
                        <IconButton onClick={onClose} sx={{ color: '#C8A882' }}>
                            <CloseIcon />
                        </IconButton>
                    </div>

                    {/* Cart Items */}
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center flex-grow gap-4">
                            <p style={{ color: 'rgba(240,236,228,0.6)', fontSize: '16px' }}>
                                Your cart is empty
                            </p>
                            <Link to="/Shop" onClick={onClose}>
                                <Button sx={{ color: '#C8A882', border: '1px solid #C8A882' }}>
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="flex-grow overflow-y-auto mb-6">
                                <div className="flex flex-col gap-4">
                                    {state.map((item, index) => {
                                        if (item.addtocard) {
                                            return (
                                                <div
                                                    key={index}
                                                    className="pb-4 border-b"
                                                    style={{ borderColor: 'rgba(200,168,130,0.2)' }}
                                                >
                                                    <div className="flex gap-3">
                                                        {/* Image */}
                                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0" style={{ backgroundColor: '#1a1a1a' }}>
                                                            <img
                                                                src={item.img}
                                                                alt={item.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>

                                                        {/* Item Details */}
                                                        <div className="flex-grow">
                                                            <h3 className="text-sm font-semibold" style={{ color: '#F0ECE4' }}>
                                                                {item.name}
                                                            </h3>
                                                            <p className="text-xs" style={{ color: 'rgba(200,168,130,0.6)' }}>
                                                                {item.category}
                                                            </p>
                                                            <p className="text-sm font-semibold mt-1" style={{ color: '#C8A882' }}>
                                                                ${(getPriceAfterDiscount(item.price, item.Discount) * item.countincart).toFixed(2)}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Quantity and Delete */}
                                                    <div className="flex items-center justify-between mt-3">
                                                        <div className="flex items-center gap-3 px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(13,13,13,0.5)', border: '1px solid rgba(200,168,130,0.2)' }}>
                                                            <button
                                                                onClick={() => handleMinusItem(index)}
                                                                className="text-xs hover:text-yellow-300 transition-colors"
                                                                style={{ color: 'rgba(200,168,130,0.7)' }}
                                                            >
                                                                <span className="fa-solid fa-minus"></span>
                                                            </button>
                                                            <span className="w-4 text-center text-xs" style={{ color: '#F0ECE4' }}>
                                                                {item.countincart}
                                                            </span>
                                                            <button
                                                                onClick={() => handlePlusItem(index)}
                                                                className="text-xs hover:text-yellow-300 transition-colors"
                                                                style={{ color: 'rgba(200,168,130,0.7)' }}
                                                            >
                                                                <span className="fa-solid fa-plus"></span>
                                                            </button>
                                                        </div>
                                                        <button
                                                            onClick={() => handleDeleteClick(index)}
                                                            className="text-xs hover:text-red-500 transition-colors"
                                                            style={{ color: '#C8A882' }}
                                                        >
                                                            <span className="fa-regular fa-trash-can"></span>
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>

                            {/* Summary Footer */}
                            <div className="border-t pt-4" style={{ borderColor: 'rgba(200,168,130,0.3)' }}>
                                <div className="flex justify-between items-center mb-4">
                                    <span style={{ color: 'rgba(240,236,228,0.6)' }}>Subtotal</span>
                                    <span className="font-semibold" style={{ color: '#F0ECE4' }}>
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                                <Link to="/Cart" onClick={onClose} className="block">
                                    <Button
                                        fullWidth
                                        sx={{
                                            backgroundColor: '#C8A882',
                                            color: '#000',
                                            mb: 1,
                                            '&:hover': {
                                                backgroundColor: '#d4b896',
                                            },
                                        }}
                                    >
                                        View Full Cart
                                    </Button>
                                </Link>
                                <Link to="/checkout" onClick={onClose} className="block">
                                    <Button
                                        fullWidth
                                        sx={{
                                            backgroundColor: 'transparent',
                                            color: '#C8A882',
                                            border: '1px solid #C8A882',
                                            '&:hover': {
                                                backgroundColor: 'rgba(200,168,130,0.1)',
                                            },
                                        }}
                                    >
                                        Checkout
                                    </Button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </Drawer>
        </>
    );
}
