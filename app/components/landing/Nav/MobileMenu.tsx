"use client";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import {navItems} from "../../../data/navItems"
import { usePathname } from "next/navigation";
import { WishlistContext } from "@/app/context/WishlistContext";
export default function MobileMenu() {
const { items: wishlistItems } = useContext(WishlistContext) || { items: [] };
const wishlistCount = Array.isArray(wishlistItems) ? wishlistItems.length : 0;
const pathname = usePathname();
const isActive = (path:string) => pathname === path || (path !== "/" && pathname.startsWith(path));
const mobilePanelRef = useRef<HTMLDivElement | null>(null);
const [mobileOpen, setMobileOpen] = useState(false);
useEffect(() => {
    if(mobileOpen){
      document.body.classList.add("noscroll")
    }
    if (!mobileOpen) {
      document.body.classList.remove("noscroll")
      return undefined;
    }

    const handleOutsidePointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (mobilePanelRef.current && !mobilePanelRef.current.contains(target)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsidePointer);
    document.addEventListener("touchstart", handleOutsidePointer);

    return () => {
      document.removeEventListener("mousedown", handleOutsidePointer);
      document.removeEventListener("touchstart", handleOutsidePointer);
      document.body.classList.remove("noscroll");
    };
  }, [mobileOpen]);

return (
    <>
    <button
                className="justify-self-start rounded-full p-2 text-stone-700 transition hover:bg-stone-100 hover:text-[#a47b4c] md:hidden"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((current) => !current)}
    >
    <Menu size={21} strokeWidth={1.7} />
    </button>
    {mobileOpen && (
            <div className="fixed inset-0  min-h-screen bg-stone-950/40  backdrop-blur-[1px] md:hidden">
            <div ref={mobilePanelRef} className="absolute left-0 top-0 flex h-full w-[min(86vw,360px)] flex-col bg-[#fbf8f3] px-6 py-7 shadow-2xl">
                <div className="flex items-center justify-between border-b border-stone-200 pb-5">
                <div className="flex flex-col">
                    <Link href="/" className="text-2xl font-semibold tracking-[0.22em] text-stone-950" onClick={() => setMobileOpen(false)}>
                    VELORA
                    </Link>
                    <span className="mt-2 text-[10px] uppercase tracking-[0.26em] text-stone-500">The Edit</span>
                </div>
                <button type="button" aria-label="Close menu" className="rounded-full p-2 text-stone-700 transition hover:bg-stone-950 hover:text-white" onClick={() => setMobileOpen(false)}>
                    <X size={21} strokeWidth={1.7} />
                </button>
                </div>
    
                <div className="mt-8 flex flex-col gap-3">
                {navItems.map(([label, path], i) => (
                    <Link
                    key={i}
                    href={path}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center justify-between border-b border-stone-200 py-3 text-sm font-medium uppercase tracking-[0.22em] transition ${
                        isActive(path) ? "text-[#a47b4c]" : "text-stone-800 hover:text-[#a47b4c]"
                    }`}
                    >
                    <span>{label}</span>
                    <ArrowRight size={14} strokeWidth={1.3} className="opacity-0 transition group-hover:opacity-100" />
                    </Link>
                ))}
                <div className="mt-auto">
                <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="mb-4 flex items-center justify-between gap-3 py-2 text-sm font-medium uppercase tracking-[0.2em] text-stone-800 transition hover:text-[#a47b4c]">
                    <span>Wishlist</span>
                    {wishlistCount > 0 && <span className="bg-stone-950 size-6 text-center flex items-center pl-0.5 justify-center rounded-full text-xs text-white">{wishlistCount}</span>}
                </Link>
                </div>
                </div>
            </div>
            </div>
        )}
    </>
);
}