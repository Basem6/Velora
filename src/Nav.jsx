import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { FilledMarquee } from "./Components/Aboutpage";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MobileMenu from "./Components/MobileMenu";
import CustomizedBadges from "./Components/CartIcon";
import CartDrawer from "./Components/CartDrawer";
export default function Navbar() {
    const nav = useRef();
    const hamburgerRef = useRef();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

    useGSAP(() => {
        gsap.to(nav.current, {
            scrollTrigger: {
                start: "top top",
                scrub: 1,
                end: "10px",
            },
            top: 0,
        });
    });

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        gsap.to(hamburgerRef.current, {
            rotation: mobileMenuOpen ? 0 : 180,
            duration: 0.3,
        });
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        gsap.to(hamburgerRef.current, {
            rotation: 0,
            duration: 0.3,
        });
    };
    return (
        <>
            <div className='max-h-9 min-h-9 flex items-center'>
                <FilledMarquee text="Free shipping on orders over $150 · Handmade in Egypt · 30-day returns · Lifetime resoling" speed={38} />
            </div>
            <nav className="fixed min-w-full top-9 z-50 border-b shadow-sm" style={{ backgroundColor: '#0D0D0D', borderColor: 'rgba(200,168,130,0.1)' }} ref={nav}>
                <div className="flex justify-between items-center w-full py-2 px-4 md:px-8">
                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="block md:hidden p-2 text-gray-300 hover:text-[#C8A882] transition"
                        aria-label="Toggle menu"
                    >
                        <span
                            ref={hamburgerRef}
                            className="fa-solid fa-bars text-xl"
                            style={{
                                display: "inline-block",
                                transformOrigin: "center",
                            }}
                        />
                    </button>
                    {/* Logo */}
                    <div className="text-xl font-bold tracking-tight md:min-w-1/3 " style={{ color: '#C8A882', fontFamily: "'Playfair Display', serif" }}>
                        LUXE
                    </div>
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-14 items-center min-w-1/3 justify-center ">
                        <NavLink to="/" 
                            style={{ fontFamily: "'Playfair Display', serif" }}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-[#C8A882] pointer-events-none link"
                                    : "text-gray-200 hover:text-[#C8A882] link"
                            }>
                            Home
                        </NavLink>
                        <NavLink to='/Shop'
                            style={{ fontFamily: "'Playfair Display', serif" }}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-[#C8A882] pointer-events-none link"
                                    : "text-gray-200 hover:text-[#C8A882] link"
                            }> 
                            Shop
                        </NavLink>
                        <NavLink to="/about"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                            className={({ isActive }) =>
                                isActive
                                    ? "text-[#C8A882] pointer-events-none link"
                                    : "text-gray-200 hover:text-[#C8A882] link"
                            }>
                            About
                        </NavLink>
                    </div>
                    {/* Desktop Icons */}
                    <div className="hidden md:flex gap-2 items-center min-w-1/3 justify-end">
                        <NavLink to="/Wishlist">
                            {({ isActive }) => (
                                <button className="p-2 rounded-full transition mx-1 cursor-pointer" style={{ color: isActive ? '#C8A882' : 'white' }}>
                                    <FavoriteBorderIcon />
                                </button>
                            )}
                        </NavLink>
                        <NavLink to="/Cart" >
                            {({ isActive }) => (
                                <button  style={{ color: isActive ? '#C8A882' : 'white' }} style={{ color: isActive ? '#C8A882' : 'white' }}>
                                    <CustomizedBadges style={{ color: isActive ? '#C8A882' : 'white' }}></CustomizedBadges>
                                </button>
                                
                            )}
                        </NavLink>
                        <NavLink to="/login" >
                            {({ isActive }) => (
                                <button className="p-2 rounded-full transition mx-1 cursor-pointer" style={{ color: isActive ? '#C8A882' : 'white' }}>
                                    <Person2OutlinedIcon  />
                                </button>
                            )}
                        </NavLink>
                    </div>
                    <div className="block md:hidden">
                        <CustomizedBadges 
                            style={'white'} 
                            onClick={() => setCartDrawerOpen(true)}
                        />
                    </div>
                </div>
            </nav>
            {/* Mobile Menu */}
            <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
            {/* Cart Drawer */}
            <CartDrawer open={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
        </>
    );
}