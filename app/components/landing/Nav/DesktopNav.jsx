import Link from "next/link";
import DesktopNavLinks from "../../ui/DesktopNavLinks";

export default function DesktopNav() {
return (
    <>
    <DesktopNavLinks />

    <div className="justify-self-center">
        <Link
        href="/"
        className="text-xl font-semibold tracking-wide text-stone-950 transition hover:text-[#a47b4c] sm:text-2xl"
        >
        VELORA
        </Link>
    </div>
    </>
);
}