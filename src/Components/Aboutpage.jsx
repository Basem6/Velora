    import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

    const STATS = [
    { number: "12+", label: "Years of craft" },
    { number: "80K", label: "Pairs sold" },
    { number: "42",  label: "Countries" },
    { number: "98%", label: "Satisfaction" },
    ];

    const TEAM = [
    { name: "Layla Hassan",   role: "Founder & Creative Director", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80" },
    { name: "Marcus Reid",    role: "Head of Design",               image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80" },
    { name: "Yuki Tanaka",    role: "Lead Craftsman",               image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
    ];

    const VALUES = [
    { n: "01", title: "Craft first",      body: "Every pair is built by hand. We believe the time spent on details is never wasted — it's the whole point." },
    { n: "02", title: "Honest materials", body: "No synthetics hiding as leather. What you see is what it is. We source full-grain hides and natural rubber only." },
    { n: "03", title: "Timeless form",    body: "We don't chase seasons. Our silhouettes are designed to look right in ten years as much as they do today." },
    ];

    export function Marquee({ text, speed = 40, reverse = false }) {
    const trackRef = useRef(null);
    const posRef   = useRef(0);
    const rafRef   = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const halfW = track.scrollWidth / 2;

        function step() {
        posRef.current += reverse ? speed / 60 : -(speed / 60);
        if (!reverse && posRef.current <= -halfW) posRef.current = 0;
        if (reverse  && posRef.current >= 0)      posRef.current = -halfW;
        track.style.transform = `translateX(${posRef.current}px)`;
        rafRef.current = requestAnimationFrame(step);
        }
        rafRef.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafRef.current);
    }, [speed, reverse]);

    const repeated = Array(8).fill(text).join("  ·  ");

    return (
        <div style={{ overflow: "hidden", width: "100%" }}>
        <div ref={trackRef} className={"text-[32px] lg:text-[72px]"} style={{ display: "inline-flex", whiteSpace: "nowrap", willChange: "transform" }}>
            <span className={"text-[32px] lg:text-[72px]"} style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: "transparent",
            WebkitTextStroke: "1px rgba(240,236,228,0.18)",
            letterSpacing: "0.02em",
            paddingRight: "2rem",
            userSelect: "none",
            }}>
            {repeated}
            </span>
            <span className={"text-[32px] lg:text-[72px]"} style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: "transparent",
            WebkitTextStroke: "1px rgba(240,236,228,0.18)",
            letterSpacing: "0.02em",
            paddingRight: "2rem",
            userSelect: "none",
            }}>
            {repeated}
            </span>
        </div>
        </div>
    );
    }

    export function FilledMarquee({ text, speed = 30 }) {
    const trackRef = useRef(null);
    const posRef   = useRef(0);
    const rafRef   = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const halfW = track.scrollWidth / 2;
        function step() {
        posRef.current -= speed / 60;
        if (posRef.current <= -halfW) posRef.current = 0;
        track.style.transform = `translateX(${posRef.current}px)`;
        rafRef.current = requestAnimationFrame(step);
        }
        rafRef.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafRef.current);
    }, [speed]);

    const items = Array(10).fill(null).map((_, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 24 }}>
        <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 500,
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#0D0D0D",
        }}>{text}</span>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0D0D0D", flexShrink: 0 }} />
        </span>
    ));

    return (
        <div style={{ overflow: "hidden", width: "100%", background: "#C8A882", padding: "14px 0" }}>
        <div ref={trackRef} style={{ display: "inline-flex", whiteSpace: "nowrap", willChange: "transform", gap: 32 }}>
            {items}{items}
        </div>
        </div>
    );
    }
    
    function HeroBlock() {
    return (
        <section>
        <div className="py-24 px-6 lg:py-24 lg:px-10" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(240,236,228,0.35)" }}>
            Our story · Est. 2012
            </p>
            <div>
            <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 72, fontWeight: 700,
                lineHeight: 1.0, color: "#F0ECE4",
                marginBottom: "2rem",
            }}>
                Built for<br />
                <em style={{ fontStyle: "italic", color: "#C8A882" }}>those who</em><br />
                walk far.
            </h1>
            <p style={{ fontSize: 15, color: "rgba(240,236,228,0.5)", lineHeight: 1.9, maxWidth: 360 }}>
                SOLE began in a small atelier in Cairo with one conviction — that a shoe worth wearing is a shoe worth making properly. Twelve years later, that belief still drives every stitch.
            </p>
            </div>
            <div className="flex flex-wrap min-w-full justify-between" >
            {STATS.map((s, i) => (
                <div key={i} className="min-w-1/2 max-w-1/2 lg:min-w-1/4 lg:max-w-1/4   px-4  border-r-[0.5px] border-r-[#C8A882]/40">
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: "#C8A882", marginBottom: 4 }}>{s.number}</p>
                <p style={{ fontSize: 11, color: "rgba(240,236,228,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</p>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
    }

    function ManifestoBlock() {
    return (
        <section style={{ padding: "6rem 3.5rem", borderBottom: "0.5px solid rgba(255,255,255,0.08)", position: "relative" }}>
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
    );
    }

    function ValuesBlock() {
    const [hovered, setHovered] = useState(null);
    return (
        <section style={{ padding: "5rem 3.5rem", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(240,236,228,0.35)", marginBottom: "3rem" }}>
            What we stand for
        </p>
        <div className="flex-wrap lg:flex-nowrap flex ">
            {VALUES.map((v, i) => (
            <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                padding: "2.5rem",
                borderRight: i < 2 ? "0.5px solid rgba(255,255,255,0.08)" : "none",
                borderTop: "2px solid",
                borderTopColor: hovered === i ? "#C8A882" : "transparent",
                transition: "border-top-color 0.3s",
                }}
            >
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, color: "rgba(240,236,228,0.25)", marginBottom: "1.5rem", letterSpacing: "0.1em" }}>{v.n}</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 400, color: "#F0ECE4", marginBottom: "1rem" }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(240,236,228,0.45)", lineHeight: 1.85 }}>{v.body}</p>
            </div>
            ))}
        </div>
        </section>
    );
    }

    function ProcessBlock() {
    return (
        <section style={{ borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
        <div className="">
            <div style={{ padding: "5rem 3.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(240,236,228,0.35)", marginBottom: "2rem" }}>The process</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 700, color: "#F0ECE4", lineHeight: 1.1, marginBottom: "2.5rem" }}>
                200 steps.<br /><em style={{ color: "#C8A882", fontStyle: "italic" }}>One pair.</em>
            </h2>
            {["Leather selection & inspection", "Pattern cutting by hand", "Lasted construction", "Hand-stitched welt", "Finishing & quality pass"].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: "1.25rem" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: "#C8A882", minWidth: 24, paddingTop: 2 }}>0{i + 1}</span>
                <p style={{ fontSize: 14, color: "rgba(240,236,228,0.6)", lineHeight: 1.6 }}>{step}</p>
                </div>
            ))}
            </div>
            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 0 }}>

            </div>
        </div>
        </section>
    );
    }

    function TeamBlock() {
    return (
        <section style={{ padding: "5rem 3.5rem", borderBottom: "0.5px solid rgba(255,255,255,0.08)" }}>
        <div  className="mb-5 flex justify-between items-center gap-3">
            <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(240,236,228,0.35)" }}>The people</p>
            <h2  className="whitespace-nowrap " style={{ fontFamily: "'Playfair Display', serif", fontSize: 25, fontWeight: 400, color: "#F0ECE4" }}>Meet the team</h2>
        </div>
        <div className="flex gap-20 justify-center flex-wrap">
            {TEAM.map((m, i) => (
            <div key={i} style={{ position: "relative", overflow: "hidden", borderRadius: 10, aspectRatio: "3/4" }}
                onMouseEnter={e => { e.currentTarget.querySelector("img").style.transform = "scale(1.05)"; e.currentTarget.querySelector(".overlay").style.opacity = 1; }}
                onMouseLeave={e => { e.currentTarget.querySelector("img").style.transform = "scale(1)";    e.currentTarget.querySelector(".overlay").style.opacity = 0; }}
            >
                <img src={m.image} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) contrast(1.1)", transition: "transform 0.5s" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,13,13,0.9) 0%, transparent 55%)" }} />
                <div className="overlay" style={{ position: "absolute", inset: 0, background: "rgba(200,168,130,0.1)", opacity: 0, transition: "opacity 0.3s" }} />
                <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#F0ECE4", marginBottom: 4 }}>{m.name}</p>
                <p style={{ fontSize: 11, color: "#C8A882", letterSpacing: "0.1em", textTransform: "uppercase" }}>{m.role}</p>
                </div>
            </div>
            ))}
        </div>
        </section>
    );
    }

    function CtaBlock() {
    return (
        <section style={{ padding: "6rem 3.5rem", textAlign: "center" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(240,236,228,0.35)", marginBottom: "1.5rem" }}>
            Ready to walk with us?
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 56, fontWeight: 700, color: "#F0ECE4", lineHeight: 1.1, marginBottom: "2.5rem" }}>
            Find your pair.
        </h2>
        <NavLink to="/Shop" className={"whitespace-nowrap"}  style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 500,
            letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "16px 48px", borderRadius: 4,
            background: "#C8A882", color: "#0D0D0D",
            border: "none", cursor: "pointer",
        }}>
            Shop the collection
        </NavLink>
        </section>
    );
    }

    export default function AboutSection() {
    return (
        <div className="py-14">
            <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#0D0D0D", color: "#F0ECE4", minHeight: "100vh" } } >
                <div> <HeroBlock /></div>
                {/* Marquee strip 1 — outline */}
                <div  style={{ padding: "2rem 0", borderBottom: "0.5px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <Marquee text="Handcrafted Footwear · Cairo · Est. 2012 · Walk Further" speed={35}/>
                </div>
                <ManifestoBlock />
                <ValuesBlock />

                {/* Filled marquee strip */}
                <FilledMarquee text="Free shipping on orders over $150 · Handmade in Egypt · 30-day returns · Lifetime resoling" speed={38} />

                <ProcessBlock />

                {/* Marquee strip 2 — reverse outline */}
                <div style={{ padding: "2rem 0", borderBottom: "0.5px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <Marquee text="Goodyear Welted · Full Grain · Natural Rubber · Zero Compromise" speed={28} reverse />
                </div>

                <TeamBlock />
                <CtaBlock />
            </div>
        </div>
    );
    }
