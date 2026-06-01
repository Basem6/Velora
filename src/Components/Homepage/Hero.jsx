import { Link } from "react-router-dom";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useState } from "react";
import Card from "../Card";
import { HeroSlider } from "../Fetured";
import { Marquee } from "../Aboutpage";
// GSAP
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(SplitText,ScrollTrigger,ScrollSmoother);
export default function Hero({smootherRef}) {
    const scrollToSection = (id) => {
        smootherRef.current.scrollTo(id, true, "top 80px");
    };
    const [showOverlay, setShowOverlay] = useState(() => {
    return !sessionStorage.getItem("hero-animation-done");
});

//use REf
    const container = useRef(null);
    const titleheader= useRef(null);
    const texthero= useRef(null);
    const btnleft= useRef(null);
    const btnright= useRef();
    const loading= useRef(null);
    const container2= useRef(null);
    const left= useRef(null);
    const right= useRef(null);
    const main= useRef(null);
    const main2= useRef(null);
    useGSAP(() => {
    if (
    !loading.current    ||
    !left.current       ||
    !right.current      ||
    !container2.current ||
    !container.current  ||
    !texthero.current   ||
    !btnleft.current    ||
    !btnright.current   ||
    !titleheader.current
    ) return;
    let splitText = SplitText.create(texthero.current, {
        type: "lines",
        mask: "lines"
    });
    const tl = gsap.timeline({
    onComplete: () => {
        setShowOverlay(false);
        sessionStorage.setItem("hero-animation-done", "true");
    }
});
    tl.from(loading.current, { width: "0%", duration: 1.5, ease: "power2.out" });
    tl.to(left.current, { x: "-110%", duration: 1.5, ease: "power2.inOut" });
    tl.to(right.current, { x: "110%", duration: 1.5, ease: "power2.inOut" }, "<");
    tl.to(container2.current, { opacity: 0, scale: 0.93, duration: 0.5, ease: "power2.out" }, "<");
    tl.from(container.current, { opacity: 0, scale: 0.93, y: 20, duration: 0.7, ease: "power2.out" });
    tl.from(texthero.current, { opacity: 0, y: 80, duration: 0.8, ease: "power2.out" });
    tl.from(splitText.lines, { y: 30, duration: 0.8, ease: "power2.out", stagger: 0.1, opacity: 0 }, "<");
    tl.from(btnleft.current, { opacity: 0, x: -100, duration: 1, ease: "power2.out" });
    tl.from(btnright.current, { opacity: 0, x: 100, duration: 1, ease: "power2.out" }, "<");
    tl.fromTo(titleheader.current, { width: "0px" }, { width: "100%", duration: 0.9, ease: "none" });
    return () => {
        splitText.revert();
    };
}, { scope: main, dependencies: [] });
    useGSAP(() => {
    const mm = gsap.matchMedia();
    // Desktop only
    mm.add("(min-width: 768px)", () => {
        const slides = gsap.utils.toArray(".slide");
        gsap.from(".anmation", {
            scrollTrigger: {
                trigger: "#horizontall",
                start: "2% 40%",
            },
            backgroundColor: "black",
            y: -40,
            duration: 0.5,
            scale: 0.4,
        });
        gsap.to(slides, {
            xPercent: -100 * (slides.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: "#horizontall",
                pin: true,
                anticipatePin: 1,
                pinType: "transform",
                start: "top top",
                scrub: 1,
                end: `+=${1000 * slides.length}`,
                invalidateOnRefresh: true,
                fastScrollEnd: true
            }
        });
    });
    // Mobile
    mm.add("(max-width: 767px)", () => {
        // reset any transforms
        gsap.set(".slide", {
            clearProps: "all",
        });
    });
    return () => {
        mm.revert();
    };
    },{ scope: main2, dependencies: [] })
    return (
        <div className="py-14">
            <main ref={main}   className="w-full overflow-x-hidden">
            <section className="relative min-h-162.5 flex items-center justify-center overflow-hidden px-6 w-full max-w-full" style={{ backgroundColor: 'black' }}>
                <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]" style={{ background: 'rgba(200,168,130,0.1)', willChange: 'transform' }}></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[140px]" style={{ background: 'rgba(200,168,130,0.08)', willChange: 'transform' }}></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl">

                <div className="inline-flex items-center gap-2 py-1 px-2 max-w-fit rounded-full mb-8 overflow-hidden whitespace-nowrap" ref={showOverlay ?titleheader:null} style={{ backgroundColor: 'rgba(200,168,130,0.1)', borderColor: 'rgba(200,168,130,0.3)', border: '1px solid' }}>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#C8A882' }}></span>
                    <span className="text-xs uppercase tracking-widest" style={{ color: '#C8A882' }}>
                    Autumn Collection 2024
                    </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-6" ref={showOverlay?container:null} style={{ color: '#F0ECE4', fontFamily: "'Playfair Display', serif" }}>
                    Redefining <span style={{ color: '#C8A882' }}>Excellence</span>
                </h1>

                <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" ref={showOverlay?texthero:null} style={{ color: 'rgba(240,236,228,0.6)' }}>
                    Experience premium craftsmanship and modern design. Curated products built for everyday luxury.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to={"/Shop"} ref={showOverlay?btnleft:null}>
                        <button className="px-10 py-4 cursor-pointer  rounded-lg transition" style={{ backgroundColor: '#C8A882', color: '#0D0D0D', fontWeight: 600 }}>
                        Shop Now
                        </button>
                    </Link>
                    <div ref={showOverlay?btnright:null} onClick={()=>{scrollToSection("#deals")}}>
                        <button className="px-10 cursor-pointer py-4 rounded-lg transition" style={{ borderColor: '#C8A882', color: '#C8A882', border: '1px solid', backgroundColor: 'transparent' }}>
                        Explore Deals
                        </button>
                    </div>
                </div>
                </div>
            </section>  
            {showOverlay&&
            <div 
            className="overlay fixed inset-0 pointer-events-none bg-transparent left-0 top-0 z-50 flex flex-col items-center justify-center gap-40 overflow-x-hidden overflow-y-hidden"
            style={{ display:"flex"}} 
            >
                <div className="left absolute inset-0 bg-black left-0 top-0 max-w-1/2 min-w-1/2 max-h-full min-h-full -z-50" ref={left} style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}></div>
                <div className="right absolute inset-0 bg-black left-1/2 top-0 max-w-1/2 min-w-1/2 max-h-full min-h-full -z-50" ref={right} style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}></div>
                <div ref={container2} className="flex flex-col items-center justify-center gap-6" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <h1 className="text-3xl font-bold text-white opacity-60 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Premium Quality, Unmatched Style
                    </h1>
                    <div className="w-80 h-1 bg-white/10 rounded-lg relative overflow-hidden">
                        <div className="h-full bg-white left-0 top-0 rounded-lg" ref={loading}></div>
                    </div>
                </div>
            </div>
            }
            </main>
            <section className="relative min-h-screen bg-black" ref={main2}>
                    <div className="min-h-screen" id="deals"><HeroSlider></HeroSlider></div>
                    <div id="horizontall" className="">
                            <div className="anmation relative overflow-hidden bg-transparent min-w-full min-h-screen rounded-t-lg shadow-lg shadow-gray-900/25 flex flex-col md:flex-row" >
                            <div className="part1 min-w-full slide" >
                                <section className="min-h-full bg-black flex items-center justify-center  flex-wrap flex-col lg:flex-row">
                                    <div style={{ position: "relative", padding: "3rem 4rem" }}>
                                        <p style={{ fontSize: 17, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A882", marginBottom: "1rem" }}>Limited time offer</p>
                                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 700, color: "#F0ECE4", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                                        Up to 40% off<br /><em style={{ fontStyle: "italic", color: "rgba(240,236,228,0.6)" }}>selected styles.</em>
                                        </h2>
                                        <button style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: 15, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
                                        padding: "13px 34px", borderRadius: 4,
                                        background: "#C8A882", color: "#0D0D0D",
                                        border: "none", cursor: "pointer",
                                        }}>
                                        Shop the sale
                                        </button>
                                    </div>
                                </section>
                            </div>
                            <div className="part2 min-w-full slide" >
                                <div style={{ minHeight: "100%", borderBottom: "0.5px solid #e5e5e5" }} className="lg:grid grid-cols-2 ">
                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", background: "#f3f0ea"}} className="p-9 min-w-full">
                                    <p style={{ fontSize: 18, letterSpacing: "0.18em", textTransform: "uppercase", color: "#999", marginBottom: "1rem" }}>
                                        New Collection · SS 2026
                                    </p>
                                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 55, fontWeight: 700, lineHeight: 1.1, marginBottom: "1rem" }}>
                                        Every step,<br />
                                        <em style={{ fontStyle: "italic", color: "#888" }}>a statement.</em>
                                    </h1>
                                    <p style={{ fontSize: 19, color: "#666", lineHeight: 1.7, maxWidth: 300 }}>
                                        Curated footwear for every occasion — from the streets to the summit.
                                    </p>
                                    </div>
                                    <div  className="hidden lg:flex lg:justify-center overflow-hidden relative items-center bg-[#e8e4dc]">
                                    <span className="fa-solid fa-shop text-7xl text-gray-black/70"></span>
                                    <span style={{
                                        position: "absolute", bottom: "1.5rem", right: "1.5rem",
                                        fontSize: 12, color: "#fff", background: "rgba(0,0,0,0.45)",
                                        padding: "6px 14px", borderRadius: 20, backdropFilter: "blur(4px)",
                                        uppercase: "uppercase", letterSpacing: "0.1em",margin: 3,
                                    
                                    }}>
                                        124 styles available
                                    </span>
                                    </div>
                                </div>
                            </div> 
                            <div className="part3 min-w-full slide">
                                <section 
                                    className="min-h-full bg-black flex items-center justify-center  flex-wrap flex-col-reverse lg:flex-row lg:justify-between lg:p-7 py-5">
                                    <div style={{ position: "relative", padding: "3rem 4rem" }}>
                                        <p style={{ fontSize: 17, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A882", marginBottom: "1rem" }}>Limited time offer</p>
                                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 700, color: "#F0ECE4", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                                        Up to 40% off<br /><em style={{ fontStyle: "italic", color: "rgba(240,236,228,0.6)" }}>selected styles.</em>
                                        </h2>
                                        <button style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: 15, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
                                        padding: "13px 34px", borderRadius: 4,
                                        background: "#C8A882", color: "#0D0D0D",
                                        border: "none", cursor: "pointer",
                                        }}>
                                        Shop the sale
                                        </button>
                                    </div>
                                    <div>
                                        <Card></Card>
                                    </div>
                                </section>
                            </div>  
                        </div>
                    </div>
                    <div className="bg-black border-t-orange-50">
                    <Marquee text="Handcrafted Footwear · Cairo · Est. 2012 · Walk Further" speed={35} />
                    </div>
                    <section style={{ padding: "6rem 3.5rem", borderBottom: "0.5px solid rgba(255,255,255,0.08)", position: "relative" }} className="bg-black">
                            <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
                                <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C8A882", marginBottom: "2rem" }}>
                                Manifesto
                                </p>
                                <p style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 36, fontWeight: 400,
                                color: "#F0ECE4", lineHeight: 1.5,
                                marginBottom: "2.5rem",
                                }}>
                                "We make shoes for <em style={{ color: "#C8A882" }}>people who notice</em> — the weight of a sole, the grain of the leather, the way a heel sits."
                                </p>
                                <p style={{ fontSize: 14, color: "rgba(240,236,228,0.4)", letterSpacing: "0.08em" }}>
                                — Layla Hassan, Founder
                                </p>
                            </div>
                    </section>
            </section>
        </div>
    );
}