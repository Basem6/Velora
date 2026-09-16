import { Search} from "lucide-react";
import MobileMenu from "./Nav/MobileMenu";
import DesktopNav from "./Nav/DesktopNav";
import ActionsNav from "./Nav/ActionsNav";
export default function Nav() {
  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-stone-200/80 bg-white/90 text-stone-900 backdrop-blur-md">
        <div className="mx-auto grid h-15 w-full grid-cols-[1fr_auto_1fr] items-center px-5 md:px-14">
          <MobileMenu></MobileMenu>
          <DesktopNav></DesktopNav>
          <div className="flex items-center justify-self-end gap-1">
            <div className="mr-5 hidden border px-4 relative rounded-full border-stone-400 transition md:block">
              <Search size={16} strokeWidth={1} className="text-stone-500 absolute left-2 top-1/2 -translate-y-1/2" />
              <input type="text" name="query" placeholder="Search" aria-label="Search products" className="w-45 bg-transparent px-4 py-2 text-xs text-stone-900 outline-none placeholder:text-stone-400" />
            </div>
            <ActionsNav></ActionsNav>
          </div>
        </div>
      </nav>
    </>
  );
}

