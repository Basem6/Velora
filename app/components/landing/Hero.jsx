import Image from "next/image";
import MainBtn from "../ui/Mainbtn"
export default function Hero(){
    return (
        <div className="relative w-full bg-gray-50  min-h-svh overflow-hidden">
                <main className="w-full relative ">
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
                                    
                                    <MainBtn></MainBtn>
                                    
                            </div>
                            </div>
                        </div>
                    </section>
                </main>
                <div className="absolute bottom-0 left-0  w-full">
                <div className="flex justify-center w-full">
                    <Image
                    src="/hero.webp"
                    alt="Models wearing the latest collection"
                    width={1130}
                    height={500}
                    preload
                    fetchPriority="high"
                    className="object-contain"
                    />
                </div>
                </div>
        </div>
    )
}