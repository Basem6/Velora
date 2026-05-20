import { NavLink } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
export default function Navbar() {
    return (
        <nav className="bg-white/80 backdrop-blur-[20px] sticky top-0 z-50   shadow-sm ">
            <div className="flex justify-between items-center w-full px-6 py-4">
                <div className="flex items-center gap-8">
                <div className="text-xl font-bold tracking-tight text-gray-900">
                        LUXE
                </div>
                <div className="hidden md:flex gap-6 items-center">
                    <NavLink to={"/"} 
                    className={({ isActive }) =>
                        isActive
                        ? "text-gray-00 hover:text-gray-900 transition link activeleft"
                        : "text-gray-500 hover:text-gray-900 transition link"
                    }>
                    Home
                    </NavLink>
                    <NavLink to={'/Shop'}
                    className={({ isActive }) =>
                        isActive
                        ? "text-gray-900 hover:text-gray-900 transition link activeleft"
                        : "text-gray-500 hover:text-gray-900 transition link"
                    }> 
                    Shop
                    </NavLink>
                    <NavLink  to={"/Cart"}
                    className={({ isActive }) =>
                        isActive
                        ? "text-gray-900 hover:text-gray-900 transition link activeleft"
                        : "text-gray-500 hover:text-gray-900 transition link"
                    }>
                    Cart
                    </NavLink>
                    <NavLink to={"/About"}
                    className={({ isActive }) =>
                        isActive
                        ? "text-gray-900 hover:text-gray-900 transition link activeleft"
                        : "text-gray-500 hover:text-gray-900 transition link"
                    }>
                    About
                    </NavLink>
                </div>
                </div>
                <div className="hidden md:flex gap-6 items-center">
                <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
                    <span className="fa-solid fa-search text-gray-500"></span>
                    <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent border-none outline-none ml-2 w-48 text-sm text-gray-700"
                    />
                </div>
                <div>
                    <NavLink to={"/Wishlist"}>
                        {({ isActive }) => (
                            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
                                <FavoriteBorderIcon className={isActive ? "text-blue-400" : "text-gray-500 "}></FavoriteBorderIcon>
                            </button>
                        )}
                    </NavLink>
                    <NavLink to={"/cart"} >
                        {({ isActive }) => (
                            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
                                <LocalMallOutlinedIcon className={isActive ? "text-blue-400" : "text-gray-500"}></LocalMallOutlinedIcon>
                            </button>
                        )}
                    </NavLink>
                    <NavLink to={"/login"} >
                    {({ isActive }) => (
                            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition">
                                <Person2OutlinedIcon className={isActive ? "text-blue-400" : "text-gray-500"}></Person2OutlinedIcon>
                            </button>
                        )}
                    </NavLink>
                </div>
                </div>
            </div>
        </nav>
    );
}