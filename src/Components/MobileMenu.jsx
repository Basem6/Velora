import { useRef } from "react";
import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function MobileMenu({ isOpen, onClose }) {
    const menuRef = useRef(null);
    const backdropRef = useRef(null);
    useGSAP(() => {
        if (isOpen) {
            // Animate menu sliding in from left
            gsap.to(menuRef.current, {
                x: 0,
                duration: 0.3,
                ease: "power2.out",
            });
            // Fade in backdrop
            gsap.to(backdropRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
            });
            // Prevent body scroll
            document.body.style.overflow = "hidden";
        } else {
            // Animate menu sliding out
            gsap.to(menuRef.current, {
                x: "-100%",
                duration: 0.3,
                ease: "power2.in",
            });
            // Fade out backdrop
            gsap.to(backdropRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
            });
            // Restore body scroll
            document.body.style.overflow = "auto";
        }
    }, { dependencies: [isOpen] });

    // Close menu on route change
    const handleNavClick = () => {
        onClose();
    };

    // Close menu on backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === backdropRef.current) {
            onClose();
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                ref={backdropRef}
                className="fixed inset-0 z-50 bg-black/60 md:hidden opacity-0 pointer-events-none"
                onClick={handleBackdropClick}
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
            />

            {/* Mobile Menu */}
            <div
                ref={menuRef}
                className="fixed left-0 top-9 h-[calc(100vh-36px)] w-72 z-50 overflow-y-auto md:hidden"
                style={{
                    backgroundColor: '#000000',
                    borderRight: '2px solid rgba(200,168,130,0.3)',
                    transform: "translateX(-100%)",
                }}
            >
                {/* Navigation Links */}
                <nav className="flex flex-col gap-2 p-6 border-b" style={{ borderColor: 'rgba(200,168,130,0.3)' }}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `px-5 py-4 rounded-lg transition ${
                                isActive
                                    ? "text-[#C8A882] bg-[rgba(200,168,130,0.1)]"
                                    : "text-gray-100 hover:text-[#C8A882]"
                            }`
                        }
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "20px",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                        }}
                        onClick={handleNavClick}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/Shop"
                        className={({ isActive }) =>
                            `px-5 py-4 rounded-lg transition ${
                                isActive
                                    ? "text-[#C8A882] bg-[rgba(200,168,130,0.1)]"
                                    : "text-gray-100 hover:text-[#C8A882]"
                            }`
                        }
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "20px",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                        }}
                        onClick={handleNavClick}
                    >
                        Shop
                    </NavLink>

                    <NavLink

                        to="/about"
                        className={({ isActive }) =>
                            `px-5 py-4 rounded-lg transition ${
                                isActive
                                    ? "text-[#C8A882] bg-[rgba(200,168,130,0.1)]"
                                    : "text-gray-100 hover:text-[#C8A882]"
                            }`
                        }
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "20px",
                            fontWeight: 600,
                            letterSpacing: "0.05em",
                        }}
                        onClick={handleNavClick}
                    >
                        About
                    </NavLink>
                </nav>

                {/* Icon Links */}
                <div className="flex flex-col gap-1 p-6">
                    <NavLink
                        to="/Wishlist"
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                                isActive
                                    ? "text-[#C8A882]"
                                    : "text-gray-300 hover:text-[#C8A882]"
                            }`
                        }
                        onClick={handleNavClick}
                    >
                        <FavoriteBorderIcon />
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "19px" }}>
                            Wishlist
                        </span>
                    </NavLink>

                    <NavLink
                        to="/Cart"
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                                isActive
                                    ? "text-[#C8A882]"
                                    : "text-gray-300 hover:text-[#C8A882]"
                            }`
                        }
                        onClick={handleNavClick}
                    >
                        <LocalMallOutlinedIcon />
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "19px" }}>
                            Cart
                        </span>
                    </NavLink>

                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-4 py-3 rounded-lg transition ${
                                isActive
                                    ? "text-[#C8A882]"
                                    : "text-gray-300 hover:text-[#C8A882]"
                            }`
                        }
                        onClick={handleNavClick}
                    >
                        <Person2OutlinedIcon />
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "19px" }}>
                            Login
                        </span>
                    </NavLink>
                </div>
            </div>
        </>
    );
}
