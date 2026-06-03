import {CartDetailsproduct} from './CardDetailsproduct'
import { Link } from 'react-router-dom';
import { useContext ,useState, useMemo} from "react";
import { CartContext } from "../../Context/Productscontext";
import TemporaryDrawer from '../Drawer';
import { AsideCategory } from '../AsideCategory';
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
        <main className="max-w-7xl mx-auto px-6 py-14 mt-12" >
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                <div className="flex-1">
                <h1 className="text-5xl font-bold mb-3" style={{ color: '#F0ECE4', fontFamily: "'Playfair Display', serif" }}>
                    All Products
                </h1>
                <p className="max-w-2xl leading-relaxed" style={{ color: 'rgba(240,236,228,0.6)' }}>
                    Discover premium modern essentials crafted with elegance and precision.
                </p>
                </div>
            </header>
            <div className="flex flex-col lg:flex-row gap-10">
                <div className='hidden md:block'>
                    <AsideCategory categories={categories} selectedCategories={selectedCategories} handleCategoryChange ={handleCategoryChange} priceRange ={priceRange} handlePriceChange ={handlePriceChange} value ={value} setValue ={setValue} setCurrentPage={setCurrentPage}></AsideCategory>
                </div>
                {/* PRODUCTS */}
                <section className="flex-1">
                {/* SORT DROPDOWN */}
                <div className='flex justify-between items-center gap-3  mb-7'>
                    <div className="hidden  relative md:block">
                        <button 
                            onClick={() => setShowSortMenu(!showSortMenu)}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl transition border-gray-200/20 border-1"
                            style={{ backgroundColor: 'rgba(13,13,13,0.5)', color: '#F0ECE4' }}
                        >
                            <span className="font-medium">
                                {sortOption === 'newest' && 'Newest Arrivals'}
                                {sortOption === 'price-low' && 'Price: Low to High'}
                                {sortOption === 'price-high' && 'Price: High to Low'}
                                {sortOption === 'name-asc' && 'Name: A to Z'}
                                {sortOption === 'name-desc' && 'Name: Z to A'}
                            </span>
                            <span className={`transition ${showSortMenu ? 'rotate-180' : ''} fa-solid fa-chevron-down text-sm` } style={{ color: 'rgba(240,236,228,0.4)' }}>
                                
                            </span>
                        </button>
                        {showSortMenu && (
                            <div className="absolute top-full left-0 mt-2 w-56 rounded-xl shadow-lg z-10" style={{ backgroundColor: '#1a1a1a', borderColor: 'rgba(200,168,130,0.2)', border: '1px solid' }}>
                                <button
                                    onClick={() => { setSortOption('newest'); setShowSortMenu(false); setCurrentPage(1); }}
                                    className={`w-full mb-1 text-left px-6 py-3 transition rounded-t-lg duration-300  cursor-pointer hover:text-[#ffd39e] hover:bg-[#C8A882]/10  ${sortOption==='newest'?"text-[#C8A882] bg-[#C8A882]/10":"text-[rgba(240,236,228,0.6)] bg-transparent"}`}

                                >
                                    Newest Arrivals
                                </button>
                                <button
                                    onClick={() => { setSortOption('price-low'); setShowSortMenu(false); setCurrentPage(1); }}
                                    className={`w-full text-left px-6 py-3 transition  duration-300  cursor-pointer hover:text-[#ffd39e] hover:bg-[#C8A882]/10  ${sortOption==='price-low'?"text-[#C8A882] bg-[#C8A882]/10":"text-[rgba(240,236,228,0.6)] bg-transparent"}`}
                                >
                                    Price: Low to High
                                </button>
                                <button
                                    onClick={() => { setSortOption('price-high'); setShowSortMenu(false); setCurrentPage(1); }}
                                    className={`w-full mt-1 text-left px-6 py-3 transition rounded-b-lg duration-300  cursor-pointer hover:text-[#ffd39e] hover:bg-[#C8A882]/10  ${sortOption==='price-high'?"text-[#C8A882] bg-[#C8A882]/10":"text-[rgba(240,236,228,0.6)] bg-transparent"}`}
                                >
                                    Price: High to Low
                                </button>
                            </div>
                        )}
                    </div>
                    <div className='md:hidden flex gap-2 relative  bg-[#f1c48d] rounded-md items-center'>
                        <TemporaryDrawer>
                        <AsideCategory
                            categories={categories}
                            selectedCategories={selectedCategories}
                            handleCategoryChange={handleCategoryChange}
                            priceRange={priceRange}
                            handlePriceChange={handlePriceChange}
                            value={value}
                            setValue={setValue}
                            setCurrentPage={setCurrentPage}
                        />
                    </TemporaryDrawer>
                    </div>
                    <div className="flex items-center px-4 py-2 rounded-full border" style={{ borderColor: 'rgba(200,168,130,0.2)', backgroundColor: 'rgba(13,13,13,0.5)' }}>
                                            <span className="fa-solid fa-search" style={{ color: 'rgba(240,236,228,0.4)' }}></span>
                                            <input
                                            type="text"
                                            placeholder="Search products..."
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="bg-transparent border-none outline-none ml-2 w-38 md:w-48 text-sm"
                                            style={{ color: 'rgba(240,236,228,0.7)' }}
                                            />
                    </div>
                </div>

                {/* PRODUCTS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {paginatedProducts
                    .map((product) => {
                        const actualIndex = state.indexOf(product);
                        return (
                            <Link key={actualIndex} to={`/product/${actualIndex + 1}`} className='card'>
                            <CartDetailsproduct index={actualIndex} product={product} />
                            </Link>
                        );
                    })
                    }
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-lg" style={{ color: 'rgba(240,236,228,0.5)' }}>No products found matching your search.</p>
                    </div>
                )}
                {filteredProducts.length > 0 && (
                <div className="mt-16 flex justify-center gap-4 flex-wrap">

                    <button 
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="w-12 h-12 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ borderColor: 'rgba(200,168,130,0.2)', border: '1px solid', color: '#F0ECE4' }}
                    >
                    ←
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                        <button 
                            key={pageNumber}
                            onClick={() => handlePageClick(pageNumber)}
                            className={`w-12 h-12 rounded-full font-bold transition`}
                            style={{
                                backgroundColor: currentPage === pageNumber ? '#C8A882' : 'transparent',
                                color: currentPage === pageNumber ? '#0D0D0D' : '#F0ECE4',
                                borderColor: 'rgba(200,168,130,0.2)',
                                border: currentPage === pageNumber ? '1px solid #C8A882' : '1px solid'
                            }}
                        >
                            {pageNumber}
                        </button>
                    ))}
                    <button 
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="w-12 h-12 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ borderColor: 'rgba(200,168,130,0.2)', border: '1px solid', color: '#F0ECE4' }}
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