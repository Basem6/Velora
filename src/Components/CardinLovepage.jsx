import { getPriceAfterDiscount } from '../utils/priceUtils';

export function CardLove({product , handleClickOpen , keye , handleAddtocard}){
    return(
        <div
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0px_6px_30px_rgba(0,0,0,0.05)] hover:shadow-[0px_12px_40px_rgba(59,130,246,0.12)] transition-all duration-300"
            >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                    src={product.img}
                    alt={product.name}
                    loading='lazy'
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Delete */}
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-500 hover:text-red-500 shadow-md transition-all duration-200" onClick={()=>{handleClickOpen(keye)}}>

                    <span className="material-symbols-outlined">
                    delete
                    </span>

                </button>

                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">

                <div className="flex justify-between items-start mb-2">

                    <h3 className="text-lg font-semibold text-gray-900">
                    {product.name}
                    </h3>

                    <span className="font-bold text-blue-600">
                    ${getPriceAfterDiscount(product.price, product.Discount)}
                    </span>

                </div>

                <p className="text-xs uppercase tracking-[3px] text-gray-400 mb-6">
                    {product.category}
                </p>

                {/* Add To Cart */}
                <button className="mt-auto w-full py-4 rounded-xl bg-blue-600 text-white font-medium flex items-center justify-center gap-2 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-blue-100" onClick={()=>{handleAddtocard(keye+1)}}>

                    <span className="material-symbols-outlined text-[18px]">
                    add_shopping_cart
                    </span>

                    Add to Cart

                </button>
                </div>
            </div>
    )
}