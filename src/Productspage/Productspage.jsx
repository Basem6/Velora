import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Slider from '@mui/material/Slider';
import {CartDetailsproduct} from './CardDetailsproduct'
import { Link } from 'react-router-dom';
import { useContext ,useState, useMemo} from "react";
import { CartContext } from "../Context/Productscontext";
export default function Productspage() {
    const {state} = useContext(CartContext)
    const [value, setValue] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('newest');
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 2500]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    // Get unique categories from products
    const categories = [...new Set(state.map(product => product.category))];

    // Handle category checkbox change
    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
        setCurrentPage(1); // Reset to first page on filter change
    };

    // Handle price range change
    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
        setCurrentPage(1); // Reset to first page on filter change
    };

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = state.filter(product => {
            // Search filter
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            
            // Category filter
            const matchesCategory = selectedCategories.length === 0 || 
                selectedCategories.includes(product.category);
            
            // Price filter
            const productPrice = parseInt(product.price);
            const matchesPrice = productPrice >= priceRange[0] && productPrice <= priceRange[1];
            
            // Rating filter - if value is null, show all products
            const matchesRating = value === null || product.Rate === value;

            return matchesSearch && matchesCategory && matchesPrice && matchesRating;
        });

        // Sort products
        switch(sortOption) {
            case 'price-low':
                return filtered.sort((a, b) => parseInt(a.price) - parseInt(b.price));
            case 'price-high':
                return filtered.sort((a, b) => parseInt(b.price) - parseInt(a.price));
            case 'name-asc':
                return filtered.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return filtered.sort((a, b) => b.name.localeCompare(a.name));
            case 'newest':
            default:
                return filtered;
        }
    }, [state, searchTerm, sortOption, selectedCategories, priceRange, value]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    // Handle page navigation
    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <main className="max-w-7xl mx-auto px-6 py-14">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="flex-1">
            <h1 className="text-5xl font-bold text-gray-900 mb-3">
                All Products
            </h1>
            <p className="text-gray-500 max-w-2xl leading-relaxed">
                Discover premium modern essentials crafted with elegance and precision.
            </p>
            </div>
            <div className="mb-8 relative">
            <span className='fa-solid fa-search absolute left-2 top-1/2 -translate-y-1/2 text-gray-400'></span>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                }}
                className="w-full px-6 pl-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-black transition text-gray-700"
            />
        </div>
        </header>
        <div className="flex flex-col lg:flex-row gap-10">
        
            <aside className="w-full lg:w-72 space-y-10">
            <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-5">
                Categories
                </h3>
                <div className="space-y-4 text-gray-600">
                {categories.map((category, i) => (
                    <label
                    key={i}
                    className="flex items-center gap-3 cursor-pointer hover:text-black transition"
                    >
                    <input
                        type="checkbox"
                        className="w-4 h-4 accent-black"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                    />
                    {category}
                    </label>
                ))}
                </div>
            </div>
            {/* PRICE */}
            <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-5">
                Price Range
                </h3>
                <div className="space-y-3">
                <Box sx={{ width: 200 }}>
                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={2500}
                        color="black"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </Box>
                </div>
            </div>
            {/* RATING */}
            <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-5">
                Rating
                </h3>
                <Box sx={{ '& > legend': { mt: 2 } }}>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    setCurrentPage(1); // Reset to first page on rating filter change
                    }}
                />
                </Box>
            </div>
            </aside>
            {/* PRODUCTS */}
            <section className="flex-1">
            {/* SORT DROPDOWN */}
            <div className="mb-8 relative">
                <button 
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl hover:border-black transition bg-white"
                >
                    <span className="font-medium text-gray-700">
                        {sortOption === 'newest' && 'Newest Arrivals'}
                        {sortOption === 'price-low' && 'Price: Low to High'}
                        {sortOption === 'price-high' && 'Price: High to Low'}
                        {sortOption === 'name-asc' && 'Name: A to Z'}
                        {sortOption === 'name-desc' && 'Name: Z to A'}
                    </span>
                    <span className={`text-gray-500 transition ${showSortMenu ? 'rotate-180' : ''}`}>
                        ↓
                    </span>
                </button>
                {showSortMenu && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-300 rounded-xl shadow-lg z-10">
                        <button
                            onClick={() => { setSortOption('newest'); setShowSortMenu(false); setCurrentPage(1); }}
                            className={`w-full text-left px-6 py-3 hover:bg-gray-100 transition ${sortOption === 'newest' ? 'bg-gray-50 font-bold' : ''}`}
                        >
                            Newest Arrivals
                        </button>
                        <button
                            onClick={() => { setSortOption('price-low'); setShowSortMenu(false); setCurrentPage(1); }}
                            className={`w-full text-left px-6 py-3 hover:bg-gray-100 transition ${sortOption === 'price-low' ? 'bg-gray-50 font-bold' : ''}`}
                        >
                            Price: Low to High
                        </button>
                        <button
                            onClick={() => { setSortOption('price-high'); setShowSortMenu(false); setCurrentPage(1); }}
                            className={`w-full text-left px-6 py-3 hover:bg-gray-100 transition ${sortOption === 'price-high' ? 'bg-gray-50 font-bold' : ''}`}
                        >
                            Price: High to Low
                        </button>
                    </div>
                )}
            </div>

            {/* PRODUCTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {paginatedProducts
                .map((product) => {
                    const actualIndex = state.indexOf(product);
                    return (
                        <Link key={actualIndex} to={`/product/${actualIndex + 1}`}>
                        <CartDetailsproduct index={actualIndex} product={product} />
                        </Link>
                    );
                })
                }
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-gray-500 text-lg">No products found matching your search.</p>
                </div>
            )}
            {filteredProducts.length > 0 && (
            <div className="mt-16 flex justify-center gap-4 flex-wrap">

                <button 
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="w-12 h-12 rounded-full border border-gray-300 hover:border-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <button 
                        key={pageNumber}
                        onClick={() => handlePageClick(pageNumber)}
                        className={`w-12 h-12 rounded-full font-bold transition ${
                            currentPage === pageNumber 
                                ? 'bg-black text-white' 
                                : 'border border-gray-300 hover:border-black'
                        }`}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button 
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="w-12 h-12 rounded-full border border-gray-300 hover:border-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                →
                </button>

            </div>
            )}

            </section>

        </div>

        </main>
    );
}