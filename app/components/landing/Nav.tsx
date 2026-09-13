
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { Heart, Search, ShoppingCart, Menu, X, ArrowRight, EllipsisVertical } from "lucide-react";
import { CartContext, WishlistContext } from "@/app/context/CartContext";

export default function Nav() {
  const pathname = usePathname();
  const { state } = useContext(CartContext) || { state: { items: [] } };
  const { items: wishlistItems } = useContext(WishlistContext) || { items: [] };
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobilePanelRef = useRef<HTMLDivElement | null>(null);

  const cartCount = Array.isArray(state?.items) ? state.items.length : 0;
  const wishlistCount = Array.isArray(wishlistItems) ? wishlistItems.length : 0;

  const navItems = [
    ["Home", "/"],
    ["Clothing", "/products/clothing"],
    ["Shoes", "/products/shoes"],
    ["Accessories", "/products/accessories"],
    ["About", "/about"],
  ];

  const isActive = (path: string) => pathname === path || (path !== "/" && pathname.startsWith(path));

  useEffect(() => {
    if (!mobileOpen) {
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
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-stone-200/80 bg-white/90 text-stone-900 backdrop-blur-md">
        <div className="mx-auto grid h-15 w-full grid-cols-[1fr_auto_1fr] items-center px-5 md:px-14">
          <button
            className="justify-self-start rounded-full p-2 text-stone-700 transition hover:bg-stone-100 hover:text-[#a47b4c] md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((current) => !current)}
          >
            <Menu size={21} strokeWidth={1.7} />
          </button>

          <div className="hidden items-center gap-5 md:flex">
            {navItems.map(([label, path], i) => (
              <Link
                key={i}
                href={path}
                className={`relative py-1 transition after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:origin-left after:bg-[#030303] after:transition-transform ${
                  isActive(path)
                    ? "after:scale-x-100 text-stone-950"
                    : "text-stone-600 after:scale-x-0 hover:text-stone-950 hover:after:scale-x-100"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="justify-self-center">
            <Link href="/" className="text-xl font-semibold tracking-wide text-stone-950 transition hover:text-[#a47b4c] sm:text-2xl">
              VELORA
            </Link>
          </div>

          <div className="flex items-center justify-self-end gap-1">
            <div className="mr-5 hidden border px-4 relative rounded-full border-stone-400 transition md:block">
              <Search size={16} strokeWidth={1} className="text-stone-500 absolute left-2 top-1/2 -translate-y-1/2" />
              <input type="text" name="query" placeholder="Search" aria-label="Search products" className="w-45 bg-transparent px-4 py-2 text-xs text-stone-900 outline-none placeholder:text-stone-400" />
            </div>

            <div className="flex items-center gap-2 pl-3 md:border-l md:border-stone-300">
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className={`relative hidden rounded-full p-2.5 transition hover:bg-stone-100 hover:text-[#a47b4c] md:block ${
                  isActive("/wishlist") ? "text-[#a47b4c]" : "text-stone-700"
                }`}
              >
                <Heart size={23} strokeWidth={0.8} />
                {wishlistCount > 0 && (
                  <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full border border-white bg-stone-950/90 px-1 text-[9px] font-medium text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                aria-label="Shopping cart"
                className={`relative rounded-full p-2.5 transition hover:bg-stone-100 hover:text-[#a47b4c] ${
                  isActive("/cart") ? "text-[#a47b4c]" : "text-stone-700"
                }`}
              >
                <ShoppingCart size={23} strokeWidth={0.8} />
                {cartCount > 0 && (
                  <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full border border-white bg-stone-950/90 px-1 text-[9px] font-medium text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                href="/"
                aria-label="more"
                className={`relative hidden md:block rounded-full p-2.5 transition hover:bg-stone-100 hover:text-[#a47b4c] ${
                  isActive("/") ? "text-[#a47b4c]" : "text-stone-700"
                }`}
              >
                < EllipsisVertical size={23} strokeWidth={0.8} />
                
              </Link>
            </div>
          </div>
        </div>
      </nav>
    

      {mobileOpen && (
        <div className="fixed inset-0 z-60 bg-stone-950/40 backdrop-blur-[1px] md:hidden">
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
            </div>

            <div className="mt-auto border-t border-stone-200 pt-6">
              <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="mb-4 flex items-center justify-between gap-3 py-2 text-sm font-medium uppercase tracking-[0.2em] text-stone-800 transition hover:text-[#a47b4c]">
                <span className="flex items-center gap-2"><Heart size={17} strokeWidth={1.4} /> Wishlist</span>
                {wishlistCount > 0 && <span className="rounded-full bg-stone-950 px-2 py-1 text-[10px] text-white">{wishlistCount}</span>}
              </Link>
              <Link href="/cart" onClick={() => setMobileOpen(false)} className="flex items-center justify-between gap-3 py-2 text-sm font-medium uppercase tracking-[0.2em] text-stone-800 transition hover:text-[#a47b4c]">
                <span className="flex items-center gap-2"><ShoppingCart size={17} strokeWidth={1.4} /> Bag</span>
                {cartCount > 0 && <span className="rounded-full bg-stone-950 px-2 py-1 text-[10px] text-white">{cartCount}</span>}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

