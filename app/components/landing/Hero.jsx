"use client"
import Image from "next/image";
function handlescroll() {
  const section = document.getElementById("offers");

  if (!section) return;

  const offset =30;
  const top =
    section.getBoundingClientRect().top +
    window.scrollY -
    offset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
}
export default function Hero(){
    return (
        <div className="relative w-full bg-white min-h-screen overflow-hidden">
                <main className="w-full overflow-x-hidden relative">
                    <section className="relative min-h-136.5  md:min-h-116.5 flex items-center justify-center overflow-hidden px-3 md:px-6 w-full max-w-full">
                        <div className="relative z-10 text-center max-w-4xl">

                            <div className="inline-flex items-center gap-2 py-1 px-2 max-w-fit rounded-full  overflow-hidden whitespace-nowrap">
                                <span className="tracking-widest md:my-0 my-4 text-amber-800">
                    Best Collection
                                </span>
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <h1 className="text-4xl md:text-7xl font-serif">
                                    <span>Quiet luxury,</span>
                                </h1>
                                <h2 className="text-4xl md:text-7xl font-serif">
                                    <span className="text-amber-950/70">loudly considered.</span>
                                </h2>
                            </div>
                            <p className="text-sm md:text-lg mt-4 text-black/70 mx-auto mb-9 leading-relaxed">
                    Experience premium craftsmanship and modern design
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                
                                <div>
                                    
                                    <button
                                                onClick={()=>handlescroll()}
                                                className="
                                                    group relative overflow-hidden
                                                    lg:px-10 md:px-8 px-4
                                                    md:py-4 py-2.5
                                                    border border-black 
                                                    uppercase tracking-widest
                                                    cursor-pointer
                                                    bg-black text-white
                                                "
                                                >
                                                <span className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-0" />

                                                <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
                                        Explore Deals
                                    </span>
                                    </button>
                                    
                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <div className="absolute bottom-0  w-full">
                <div className="flex justify-center w-full">
                    <Image
                    src="/hero.webp"
                    alt="Models wearing the latest collection"
                    width={1130}
                    sizes="(max-width: 768px) 100vw, 900px"
                    height={200}
                    preload
                    fetchPriority="high"
                    className="object-contain"
                    />
                </div>
                </div>
            </div>
    )
}