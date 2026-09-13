import Link from "next/link";
import { ArrowUpRight, AtSign, Globe2, Play } from "lucide-react";

const shopLinks = ["New arrivals", "Best sellers", "Clothing", "Shoes", "Accessories"];
const helpLinks = ["Contact us", "Shipping & returns", "Size guide", "Track order", "FAQs"];

export default function Footer() {
  return (
    <footer className="w-full  bg-[#11110f] text-stone-100">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-12 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr_1fr_1.4fr] lg:gap-10">
          <div>
            <Link href="/" className="text-3xl font-semibold tracking-[0.18em] text-white transition-opacity hover:opacity-70">
              VELORA
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-6 text-stone-400">
              Considered pieces for everyday living. Designed with intention, made to last.
            </p>
            <div className="mt-8 flex items-center gap-2">
              <Link href="#instagram" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center border border-stone-700 transition hover:border-stone-300 hover:text-white">
                <AtSign size={16} strokeWidth={1.5} />
              </Link>
              <Link href="#facebook" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center border border-stone-700 transition hover:border-stone-300 hover:text-white">
                <Globe2 size={16} strokeWidth={1.5} />
              </Link>
              <Link href="#youtube" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center border border-stone-700 transition hover:border-stone-300 hover:text-white">
                <Play size={16} strokeWidth={1.5} />
              </Link>
            </div>
          </div>

          <FooterLinkGroup title="Shop" links={shopLinks} />
          <FooterLinkGroup title="Need help?" links={helpLinks} />

          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Stay in the know</p>
            <h2 className="mt-4 max-w-sm font-serif text-3xl leading-tight text-white">
              First access to considered things.
            </h2>
            <form className="mt-7 flex border-b border-stone-600 focus-within:border-stone-200">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-stone-500"
              />
              <button type="submit" aria-label="Subscribe to newsletter" className="flex items-center gap-1 py-3 pl-3 text-xs uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-60">
                Join <ArrowUpRight size={15} strokeWidth={1.5} />
              </button>
            </form>
            <p className="mt-3 text-xs leading-5 text-stone-500">By subscribing, you agree to receive Velora news and updates.</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-stone-800 pt-6 text-xs text-stone-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Velora. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#privacy" className="transition hover:text-stone-200">Privacy</Link>
            <Link href="#terms" className="transition hover:text-stone-200">Terms</Link>
            <Link href="#accessibility" className="transition hover:text-stone-200">Accessibility</Link>
          </div>
          <p className="uppercase tracking-[0.14em]">Worldwide shipping</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.24em] text-stone-400">{title}</p>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link}>
            <Link href="#collection" className="text-sm text-stone-200 transition hover:text-white hover:underline hover:underline-offset-4">
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}