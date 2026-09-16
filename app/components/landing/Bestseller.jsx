import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {products} from "@/app/data/products"
export default function BestSeller(){
    const bestSellers  =  products.filter((i)=>{
        return i.bestseller
    })
    return (
        <div className="flex flex-col relative flex-1 items-center justify-start dark:bg-black">
            
            <section id="best-sellers" className="w-full bg-[#f5f3ef] px-5 py-20 md:px-12 md:py-28">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
                        <div>
                            <p className="mb-3 text-xs uppercase tracking-[0.28em] text-amber-800">The edit</p>
                            <h2 className=" text-black md:text-2xl font-semibold">Best sellers</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
                        {bestSellers.map((product , i) => (
                            <a href={`/products/${product.category.toLocaleLowerCase()}/${product.id}`} key={product.name} className="group block">
                                <div className="relative mb-4 aspect-3/4 overflow-hidden bg-[#e7e4de]">
                                    <Image
                                        src={`${product.image}`}
                                        alt={product.name}
                                        fill
                                        loading="lazy"
                                        sizes="(min-width: 768px) 25vw, 50vw"
                                        className="object-cover grayscale-15 transition duration-700 group-hover:scale-105"
                                        style={{ objectPosition: product.position }}
                                    />
                                    {i===0 || i===2 ?
                                    <span className="absolute left-3 top-3 px-2 py-1 text-[10px] uppercase tracking-[0.18em] bg-black text-gray-100 ">New</span>:""
                                    }
                                    <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center bg-white text-black opacity-0 transition group-hover:opacity-100">
                                        <ArrowUpRight size={16} strokeWidth={1.5} />
                                    </span>
                                </div>
                                <div className="flex items-start justify-between gap-3 text-sm">
                                    <div>
                                        <h3 className="font-medium text-black">{product.name}</h3>
                                        <p className="mt-1 text-xs text-black/50">{product.category}</p>
                                    </div>
                                    <p className="text-black">{product.price}</p>
                                </div>
                            </a>
                        ))}
                    </div>

                </div>
            </section>
            <div id="collection" />
        </div>
    )
}