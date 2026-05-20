import { useParams } from "react-router-dom";
import { useState , useContext} from "react";
import { getPriceAfterDiscount } from './utils/priceUtils';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { CartContext } from "./Context/Productscontext";
import Checkbox from "./Checkbox";
import { useToast } from './Context/Toastcontext'
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
        <main className="max-w-[1400px] mx-auto px-4 md:px-10 py-12 bg-[#f8f8f6] min-h-screen">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
            {/* Main Image */}
            <div className="flex-1 rounded-3xl overflow-hidden bg-white border border-[#e5e5df] shadow-[0px_10px_40px_rgba(0,0,0,0.03)]">
                <img
                src={current.img}
                alt={current.name}
                className="w-full h-full object-cover aspect-square md:h-[600px]"
                />
            </div>
            </div>
            {/* Details */}
            <div className="lg:col-span-5 sticky top-24 flex flex-col gap-8">
            {/* Badge */}
            <div className="flex gap-3">
                <span className="bg-black text-white text-xs px-4 py-2 rounded-full">
                NEW ARRIVAL
                </span>
                <span className="bg-red-50 text-red-500 text-xs px-4 py-2 rounded-full border border-red-100">
                -{current.Discount}% OFF
                </span>
            </div>
            {/* Title */}
            <div className="flex flex-col gap-4">
                <h1 className="text-5xl leading-tight font-semibold tracking-tight text-[#111]">
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
                    />
                </Box>
            </div>
            {/* Price */}
            <div className="flex items-end gap-4">
                <span className="text-6xl font-bold tracking-tight text-[#111]">
                ${priceAfterOffer}.00
                </span>
                <span className="text-2xl text-[#999] line-through mb-1">
                ${current.price}
                </span>
            </div>
            {/* Desc */}
            <p className="text-[#666] text-lg leading-relaxed">
                Experience pure acoustic mastery. The LXP-900 combines
            </p>
            {/* Colors */}
            <div className="border-t border-[#e5e5df] pt-8">
                <p className="text-xs uppercase tracking-[0.3em] text-[#777] mb-5">
                Select Color : Obsidian
                </p>
                <div className="flex gap-4">
                <button className="w-11 h-11 rounded-full bg-black ring-2 ring-black ring-offset-4 ring-offset-[#f8f8f6]" />

                <button className="w-11 h-11 rounded-full bg-gray-200 border border-[#ddd] hover:ring-2 hover:ring-black/30 ring-offset-4 transition-all" />

                <button className="w-11 h-11 rounded-full bg-stone-500 border border-[#ddd] hover:ring-2 hover:ring-black/30 ring-offset-4 transition-all" />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
                <button className="flex-1 bg-black text-white py-5 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:opacity-90 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300" onClick={handleAddtocard}>
                <span className="material-symbols-outlined">
                    shopping_cart
                </span>
                Add to Cart
                </button>
                <button className="w-16 rounded-2xl border border-[#ddd] bg-white hover:bg-[#f1f1ee] transition-all flex items-center justify-center">
                    <Checkbox onhandle={handleAddtoLove}></Checkbox>
                </button>
            </div>
            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-[#e5e5df]">
                <span className="material-symbols-outlined text-black">
                    local_shipping
                </span>

                <div>
                    <p className="font-semibold text-sm">
                    Free Shipping
                    </p>

                    <p className="text-xs text-[#8a8a82]">
                    Express delivery
                    </p>
                </div>
                </div>

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-[#e5e5df]">
                <span className="material-symbols-outlined text-black">
                    verified_user
                </span>

                <div>
                    <p className="font-semibold text-sm">
                    2 Year Warranty
                    </p>

                    <p className="text-xs text-[#8a8a82]">
                    Global coverage
                    </p>
                </div>
                </div>
            </div>
            </div>
        </section>
        {/* Related */}
        {/* <section className="mt-32">
            <div className="flex justify-between items-end mb-14">
            <h2 className="text-4xl font-semibold tracking-tight text-[#111]">
                You May Also Like
            </h2>

            <a
                href="#"
                className="flex items-center gap-2 text-black font-medium group"
            >
                View Collection

                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                arrow_forward
                </span>
            </a>
            </div>
        </section> */}
        </main>
    )
}
