"use client";
import { EllipsisVertical, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useContext} from "react";
import { CartContext } from "@/app/context/CartContext";
import { WishlistContext } from "@/app/context/WishlistContext";
import { usePathname } from "next/navigation";
export default function ActionsNav() {
const pathname = usePathname();
const isActive = (path) => pathname === path || (path !== "/" && pathname.startsWith(path));
const { state } = useContext(CartContext) || { state: { items: [] } };
const { items: wishlistItems } = useContext(WishlistContext) || { items: [] };
const cartCount = Array.isArray(state?.items) ? state.items.length : 0;
const wishlistCount = Array.isArray(wishlistItems) ? wishlistItems.length : 0;
return (
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
);
}