import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Context/Productscontext";
import {Cardproudct} from './Cardproudct';
export default function Hero() {
    const {state} = useContext(CartContext)
    return (
        <main className="bg-white">
        <section className="relative min-h-[650px] flex items-center justify-center overflow-hidden px-6 bg-gradient-to-b from-white to-gray-50">
            <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-200/40 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-100/60 rounded-full blur-[140px]"></div>
            </div>

            <div className="relative z-10 text-center max-w-4xl">

            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gray-100 border border-gray-200 mb-8">
                <span className="w-2 h-2 bg-black rounded-full"></span>
                <span className="text-xs uppercase tracking-widest text-gray-600">
                Autumn Collection 2024
                </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Redefining <span className="text-black">Excellence</span>
            </h1>

            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                Experience premium craftsmanship and modern design. Curated products built for everyday luxury.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to={"/Shop"}>
                <button className="px-10 py-4 bg-black text-white rounded-lg hover:scale-105 transition">
                Shop Now
                </button>
                </Link>
                <button className="px-10 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
                Explore Deals
                </button>
            </div>

            </div>
        </section>

        {/* FEATURED */}
        <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                <p className="text-gray-500 mt-2">Premium picks for you</p>
            </div>
            <Link to={"/Shop"} className="hidden md:flex items-center gap-2 text-black font-medium hover:gap-3 transition">
                View All →
            </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {state.map((product , index)=>{
                    if(product.isfetured){
                    return  <Link key={index+1} to={`/product/${index+1}`}><Cardproudct img={product.img} category={product.category} name={product.name} price={product.price} discount={product.Discount}/></Link>
                    }
                })}
            </div>
        </section>
        </main>
    );
}