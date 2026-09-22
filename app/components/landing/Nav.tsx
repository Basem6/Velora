import MobileMenu from "./Nav/MobileMenu";
import DesktopNav from "./Nav/DesktopNav";
import ActionsNav from "./Nav/ActionsNav";
import SearchBar from "../ui/SearchBar/SearchBar"
export default function Nav() {
  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-stone-200/80 bg-white/90 text-stone-900 backdrop-blur-md">
        <div className="mx-auto grid h-15 w-full grid-cols-[1fr_auto_1fr] items-center px-5 md:px-14">
          <MobileMenu></MobileMenu>
          <DesktopNav></DesktopNav>
          <div className="flex items-center justify-self-end gap-1">
            <SearchBar></SearchBar>
            <ActionsNav></ActionsNav>
          </div>
        </div>
      </nav>
    </>
  );
}

