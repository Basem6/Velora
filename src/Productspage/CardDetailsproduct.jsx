import { useContext } from "react"
import { CartContext } from "../Context/Productscontext";
import {useToast} from '../Context/Toastcontext'
import { getPriceAfterDiscount } from '../utils/priceUtils';
export function CartDetailsproduct({index,product}){
    const {state , dispatch} = useContext(CartContext)
    const { showAlert } = useToast()
    const filter=state.filter((item) => {
        return item.addtocard===true
    });
    const id=index+1;
    function handleAddtocard(e) {
        e.preventDefault();
        e.stopPropagation();
        showAlert("success", "added to card successfully");
        if (filter.includes(state[index])) {
            console.log("exist")
            dispatch({
            type: "plusItem",
            payload: index,
            });
        } else {
            dispatch({
            type: "addedcart",
            payload: { id },
            });
        }
    }
    
    return (
        <div
                    key={index}
                    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-500 hover:-translate-y-1"
                >

                    {/* IMAGE */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">

                    <img
                        src={product.img}
                        loading='lazy'
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                    />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"></div>

                    {/* QUICK VIEW */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">

                        <button className="px-7 py-3 bg-white text-black rounded-full font-medium shadow-xl hover:scale-105 transition">
                        Quick View
                        </button>

                    </div>

                    </div>

                    {/* CONTENT */}
                    <div className="p-6">

                    <div className="flex justify-between items-center mb-3">

                        <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">
                        {product.category}
                        </span>

                        <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                        ⭐ {product.Rate}
                        </div>

                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {product.name}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed mb-5">
                        Modern premium design crafted for luxury and performance.
                    </p>

                    <div className="flex justify-between items-center">

                        <span className="text-2xl font-bold text-gray-900">
                        ${getPriceAfterDiscount(product.price, product.Discount)}
                        </span>

                        <button className="w-12 h-12 rounded-full bg-black text-white hover:scale-110 transition flex items-center justify-center z-20" onClick={(e)=>{handleAddtocard(e)}}>
                        +
                        </button>

                    </div>

                    </div>

        </div>
    )
}