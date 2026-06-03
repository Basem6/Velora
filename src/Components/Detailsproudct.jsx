import { useParams } from "react-router-dom";
import { useState , useContext} from "react";
import { getPriceAfterDiscount } from '../utils/priceUtils';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { CartContext } from "../Context/Productscontext";
import Checkbox from "./Checkbox";
import { useToast } from '../Context/Toastcontext'
export default function ProductDetails() {
    const { showAlert } = useToast()
    const {state , dispatch} = useContext(CartContext)
    const { id } = useParams();
    const [current ] = useState(state[id-1])
    const [value, setValue] = useState(current.Rate);
    const filter=state.filter((item) => {
        return item.addtocard===true
    });
    function handleAddtocard(){
        showAlert("success","added to card successfully")
        if (filter.includes(state[id-1])) {
            console.log("exist")
            dispatch({
            type: "plusItem",
            payload: id-1,
            });
        } else {
            dispatch({
            type: "addedcart",
            payload: { id },
            });
        }
    }
    function handleAddtoLove(){
        showAlert("info","added to LoveProducts successfully")
        dispatch({
            type:"addedLove",
            payload:{id}
        })
    }
    const priceAfterOffer = getPriceAfterDiscount(current.price, current.Discount)
    return (
        <main className=" mt-16 max-w-650 mx-auto px-4 md:px-10 py-12 min-h-screen "  style={{ backgroundColor: '#0D0D0D' }}>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
            {/* Main Image */}
            <div className="flex-1 rounded-3xl overflow-hidden border shadow-[0px_10px_40px_rgba(0,0,0,0.5)]" style={{ backgroundColor: '#1a1a1a', borderColor: 'rgba(200,168,130,0.2)' }}>
                <img
                src={current.img}
                alt={current.name}
                className="w-full h-full object-cover aspect-square md:h-150"
                />
            </div>
            </div>
            {/* Details */}
            <div className="lg:col-span-5 sticky top-24 flex flex-col gap-8">
            {/* Badge */}
            <div className="flex gap-3">
                <span className="text-white text-xs px-4 py-2 rounded-full" style={{ backgroundColor: '#C8A882', color: '#0D0D0D' }}>
                NEW ARRIVAL
                </span>
                <span className="text-xs px-4 py-2 rounded-full border" style={{ color: '#C8A882', borderColor: 'rgba(200,168,130,0.3)', backgroundColor: 'rgba(200,168,130,0.05)' }}>
                -{current.Discount}% OFF
                </span>
            </div>
            {/* Title */}
            <div className="flex flex-col gap-4">
                <h1 className="text-5xl leading-tight font-semibold tracking-tight" style={{ color: '#F0ECE4', fontFamily: "'Playfair Display', serif" }}>
                {current.name}
                </h1>
                {/* Stars */}
                <Box sx={{ '& > legend': { mt: 2 } }}>
                    <Typography component="legend"></Typography>
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                            sx={{
                            color: '#C8A882',
                            '& .MuiRating-iconFilled': { color: '#C8A882' },
                            }}
                    />
                </Box>
            </div>
            {/* Price */}
            <div className="flex items-end gap-4">
                <span className="text-6xl font-bold tracking-tight" style={{ color: '#F0ECE4' }}>
                ${priceAfterOffer}.00
                </span>
                <span className="text-2xl line-through mb-1" style={{ color: 'rgba(240,236,228,0.4)' }}>
                ${current.price}
                </span>
            </div>
            {/* Desc */}
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(240,236,228,0.6)' }}>
                Experience pure acoustic mastery. The LXP-900 combines
            </p>
            {/* Colors */}
            <div className="pt-8 hidden" style={{ borderTop: '1px solid rgba(200,168,130,0.2)' }}>
                <p className="text-xs uppercase tracking-[0.3em] mb-5" style={{ color: 'rgba(200,168,130,0.6)' }}>
                Select Color : Obsidian
                </p>
                <div className="flex gap-4">
                <button  className="w-11 h-11  rounded-full bg-black ring-2 ring-black ring-offset-4" style={{ ringOffsetColor: '#0D0D0D' }} />

                <button className="w-11 h-11 rounded-full border hover:ring-2 hover:ring-offset-4 transition-all" style={{ backgroundColor: 'rgba(200,168,130,0.2)', borderColor: 'rgba(200,168,130,0.3)' }} />

                <button className="w-11 h-11 rounded-full border hover:ring-2 hover:ring-offset-4 transition-all" style={{ backgroundColor: 'rgba(200,168,130,0.1)', borderColor: 'rgba(200,168,130,0.3)' }} />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
                <button className="flex-1 text-white py-5 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:opacity-90 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300" style={{ backgroundColor: '#C8A882', color: '#0D0D0D' }} onClick={handleAddtocard}>
                <span className="material-symbols-outlined">
                    shopping_cart
                </span>
                Add to Cart
                </button>
                <button className="w-16 rounded-2xl border hover:opacity-90 transition-all flex items-center justify-center" style={{ borderColor: 'rgba(200,168,130,0.2)', backgroundColor: 'rgba(13,13,13,0.5)' }}>
                    <Checkbox onhandle={handleAddtoLove}></Checkbox>
                </button>
            </div>
            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl border" style={{ backgroundColor: '#1a1a1a', borderColor: 'rgba(200,168,130,0.2)', color: '#F0ECE4' }}>
                <span className="material-symbols-outlined">
                    local_shipping
                </span>

                <div>
                    <p className="font-semibold text-sm">
                    Free Shipping
                    </p>

                    <p className="text-xs" style={{ color: 'rgba(200,168,130,0.6)' }}>
                    Express delivery
                    </p>
                </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl border" style={{ backgroundColor: '#1a1a1a', borderColor: 'rgba(200,168,130,0.2)', color: '#F0ECE4' }}>
                <span className="material-symbols-outlined">
                    verified_user
                </span>

                <div>
                    <p className="font-semibold text-sm">
                    2 Year Warranty
                    </p>

                    <p className="text-xs" style={{ color: 'rgba(200,168,130,0.6)' }}>
                    Global coverage
                    </p>
                </div>
                </div>
            </div>
            </div>
        </section>
        </main>
    )
}
