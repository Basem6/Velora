"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {navItems} from "../../data/navItems"

export default function DesktopNavLinks() {
const pathname = usePathname();

const isActive = (path: string) =>
    pathname === path ||
    (path !== "/" && pathname.startsWith(path));

return (
    <div className="hidden items-center gap-5 md:flex">
    {navItems.map(([label, path]) => (
        <Link
        key={path}
        href={path}
        className={`relative py-1 transition after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:origin-left after:bg-[#030303] after:transition-transform ${
            isActive(path)
            ? "text-stone-950 after:scale-x-100"
            : "text-stone-600 after:scale-x-0 hover:text-stone-950 hover:after:scale-x-100"
        }`}
        >
        {label}
        </Link>
    ))}
    </div>
);
}