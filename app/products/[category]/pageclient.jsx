'use client';
import ProductCard from  "@/app/components/ui/productcard"
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';


const colors = ['Black', 'Blue', 'Green', 'Neutral'];
const sizes = ['XS', 'S', 'M', 'L', 'XL'];
function FilterPanel({ selectedCategories, setSelectedCategories, selectedColors, setSelectedColors, selectedSizes, setSelectedSizes, priceRange, setPriceRange, onReset , categories}) {
    const toggleValue = (value, selected, setSelected) => {
        setSelected(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
    };

    return (
        <div className="space-y-7">
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-950">Category</h2>
                    <button type="button" onClick={onReset} className="text-[10px] uppercase tracking-[0.16em] text-stone-500 transition hover:text-stone-950">Clear all</button>
                </div>
                <div className="space-y-3">
                    {categories.map((item) => <Checkbox key={item} label={item} checked={selectedCategories.includes(item)} onChange={() => toggleValue(item, selectedCategories, setSelectedCategories)} />)}
                </div>
            </div>


            <div className="border-t border-stone-200 pt-7">
                <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-950">Size</h2>
                <div className="grid grid-cols-4 gap-2">
                    {sizes.map((item) => <Checkbox key={item} label={item} checked={selectedSizes.includes(item)} onChange={() => toggleValue(item, selectedSizes, setSelectedSizes)} compact />)}
                </div>
            </div>

            <div className="border-t border-stone-200 pt-7">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-950">Price</h2>
                    <span className="text-xs text-stone-500">${priceRange[0]} - ${priceRange[1]}</span>
                </div>
                <div className="relative px-1 pt-2">
                    <div className="h-1 rounded-full bg-stone-200"><div className="h-1 rounded-full bg-stone-950" style={{ marginLeft: `${(priceRange[0] / 2500) * 100}%`, width: `${((priceRange[1] - priceRange[0]) / 2500) * 100}%` }} /></div>
                    <input type="range" min="0" max="2500" value={priceRange[0]} onChange={(event) => setPriceRange([Math.min(Number(event.target.value), priceRange[1] - 1), priceRange[1]])} className="range-input" aria-label="Minimum price" />
                    <input type="range" min="0" max="2500" value={priceRange[1]} onChange={(event) => setPriceRange([priceRange[0], Math.max(Number(event.target.value), priceRange[0] + 1)])} className="range-input" aria-label="Maximum price" />
                </div>
                
            </div>
            <div className="border-t border-stone-200 pt-7">
                <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-stone-950">Color</h2>
                <div className="flex flex-wrap gap-4">
                    {colors.map((item) => <ColorSwatch key={item} color={item} checked={selectedColors.includes(item)} onChange={() => toggleValue(item, selectedColors, setSelectedColors)} />)}
                </div>
            </div>
        </div>
    );
}

function Checkbox({ label, checked, onChange, swatch, compact }) {
    return (
        <label className={`flex cursor-pointer items-center gap-2 text-sm transition hover:text-stone-950 ${compact ? 'justify-center border border-stone-200 px-2 py-2' : 'text-stone-600'} ${checked && compact ? 'border-stone-950 bg-stone-950 text-white' : ''}`}>
            <input type="checkbox" checked={checked} onChange={onChange} className={`${compact ? 'sr-only' : 'h-4 w-4'} accent-stone-950`} />
            {swatch && <span className={`h-3 w-3 rounded-full border border-stone-300 ${swatch === 'Black' ? 'bg-stone-950' : swatch === 'Blue' ? 'bg-blue-800' : swatch === 'Green' ? 'bg-emerald-700' : 'bg-[#d8d0c3]'}`} aria-hidden="true" />}
            {label}
        </label>
    );
}

function ColorSwatch({ color, checked, onChange }) {
    const colorClass = color === 'Black' ? 'bg-stone-950' : color === 'Blue' ? 'bg-blue-800' : color === 'Green' ? 'bg-emerald-700' : 'bg-[#d8d0c3]';

    return (
        <label className="group flex  cursor-pointer flex-col items-center gap-2 text-[10px] text-stone-500 transition hover:text-stone-950">
            <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
            <span className={`flex size-6 items-center justify-center rounded-full border transition ${checked ? 'border-stone-950 p-1' : 'border-transparent group-hover:border-stone-300'}`}>
                <span className={`h-full w-full rounded-full border border-stone-300 ${colorClass}`} aria-hidden="true" />
            </span>
        </label>
    );
}
function Pagination({ currentPage, totalPages, goToPage }) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav aria-label="Product pages" className="mt-12 flex items-center justify-center gap-2">
            <button
                type="button"
                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-10 border border-stone-300 px-3 text-xs uppercase tracking-[0.12em] text-stone-700 transition hover:border-stone-950 disabled:cursor-not-allowed disabled:opacity-35"
            >
                Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                    type="button"
                    key={page}
                    onClick={() => goToPage(page)}
                    aria-current={currentPage === page ? 'page' : undefined}
                    className={`h-10 min-w-10 border px-3 text-sm transition ${currentPage === page ? 'border-stone-950 bg-stone-950 text-white' : 'border-stone-300 text-stone-700 hover:border-stone-950'}`}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="h-10 border border-stone-300 px-3 text-xs uppercase tracking-[0.12em] text-stone-700 transition hover:border-stone-950 disabled:cursor-not-allowed disabled:opacity-35"
            >
                Next
            </button>
        </nav>
    );
}

export default function CategoryPage({ category , products }) {
    const categorySubCategories = {
    clothing: ['Women', 'Men', 'Kids', 'T-shirts',"Pants","Jackets'"],
    shoes: ['Women', 'Men', 'Kids', 'Sports'],
    accessories: ['Women', 'Men', 'Bags', 'Watches', 'Glasses']
    };

    let categories = [];
    if (category) {
    categories = categorySubCategories[category.toLowerCase()] || [];
    }
    const [search, setSearch] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 2500]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const displayCategory = category === 'all' ? 'All products' : category || 'Collection';
    const productGridRef = useRef(null);
    const pageNavigationRequestedRef = useRef(false);

    useEffect(() => {
        document.body.style.overflow = drawerOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [drawerOpen]);

    useEffect(() => {
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setDrawerOpen(false);
        };
        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, []);

    const filteredProducts = useMemo(() => {
        const visible = products.filter((product) => {
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchesColor = selectedColors.length === 0 || selectedColors.includes(product.color);
            const matchesSize = selectedSizes.length === 0 || product.sizes.some((size) => selectedSizes.includes(size));
            const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
            const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
            return   matchesCategory && matchesColor && matchesSize && matchesPrice && matchesSearch;
        });
        return visible;
    }, [products, search, selectedCategories, selectedColors, selectedSizes, priceRange]);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

    const goToPage = (page) => {
        const targetPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));

        if (targetPage === currentPage || targetPage < 1) {
            return;
        }

        pageNavigationRequestedRef.current = true;
        setCurrentPage(targetPage);
    };

    useEffect(() => {
        if (!pageNavigationRequestedRef.current || !productGridRef.current) {
            return;
        }

        pageNavigationRequestedRef.current = false;

        const elementTop = productGridRef.current.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({
            top: Math.max(elementTop, 0),
            behavior: 'smooth',
        });
    }, [currentPage]);

    const resetFilters = () => {
        setSelectedCategories([]);
        setSelectedColors([]);
        setSelectedSizes([]);
        setPriceRange([0, 2500]);
        setCurrentPage(1);
    };

    const updateFilter = (setter, value) => {
        setCurrentPage(1);
        setter(value);
    };

    return (
        <main className="min-h-screen  px-5 py-18  text-stone-950 md:px-12 md:py-10">
            <div className="mx-auto max-w-7xl">
                <header className="mb-12 border-b border-stone-200 pb-10 md:mb-16 md:flex md:items-end md:justify-between">
                    <div>
                        <p className="mb-4 text-xs uppercase tracking-[0.28em] text-amber-800">The collection</p>
                        <h1 className="font-serif text-5xl leading-none md:text-7xl">all {displayCategory}</h1>
                        <p className="mt-5 max-w-md text-sm leading-6 text-stone-500">Considered pieces for everyday living, selected with intention.</p>
                    </div>
                    <p className="mt-8 text-xs uppercase tracking-[0.18em] text-stone-500 md:mt-0">{filteredProducts.length} pieces</p>
                </header>

                <div className="mb-8 flex items-center gap-3 border-b border-stone-200 pb-5 lg:hidden">
                    <button type="button" onClick={() => setDrawerOpen(true)} className="flex min-h-11 shrink-0 items-center gap-2 border border-stone-300 px-4 text-xs uppercase tracking-[0.16em] text-stone-950 transition hover:border-stone-950 active:bg-stone-100"><SlidersHorizontal size={16} strokeWidth={1.5} /> Filters</button>
                    <label className="relative flex min-w-0 flex-1 items-center border-b border-stone-300 py-2 text-stone-500 focus-within:border-stone-950">
                        <Search size={16} strokeWidth={1.5} />
                        <span className="sr-only">Search products</span>
                        <input value={search} onChange={(event) => { setCurrentPage(1); setSearch(event.target.value); }} placeholder="Search" className="w-full bg-transparent pl-3 text-sm text-stone-950 outline-none placeholder:text-stone-400" />
                    </label>
                </div>

                <div className="grid grid-cols-1  gap-10 lg:grid-cols-[190px_1fr] lg:gap-12">
                    <aside className="hidden lg:block">
                        <FilterPanel
                            {...{
                                selectedCategories,
                                setSelectedCategories: (value) => updateFilter(setSelectedCategories, value),
                                selectedColors,
                                setSelectedColors: (value) => updateFilter(setSelectedColors, value),
                                selectedSizes,
                                setSelectedSizes: (value) => updateFilter(setSelectedSizes, value),
                                priceRange,
                                setPriceRange: (value) => updateFilter(setPriceRange, value),
                                onReset: resetFilters,
                                categories
                            }}
                        />
                    </aside>

                    <section>
                        {filteredProducts.length ? (
                            <>
                                <div
                                    ref={productGridRef}
                                    className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-5"
                                >
                                    {paginatedProducts.map((product , index) => (
                                        <ProductCard key={index} product={product} displayCategory={product.category} priority={currentPage === 1 && index === 0} />
                                    ))}
                                </div>

                                <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
                            </>
                        ) : (
                            <p className="py-20 text-center text-sm text-stone-500">
                                No pieces found for these filters.
                            </p>
                        )}
                    </section>
                </div>
            </div>

            {drawerOpen && <div className="fixed inset-0 z-60 lg:hidden" role="dialog" aria-modal="true" aria-label="Product filters"><button type="button" aria-label="Close filters" onClick={() => setDrawerOpen(false)} className="absolute inset-0 bg-stone-950/30" /><aside className="absolute left-0 top-0 flex h-full w-[min(88vw,380px)] flex-col overflow-y-auto bg-white px-5 pb-6 pt-5 shadow-2xl sm:px-7"><div className="mb-8 flex shrink-0 items-center justify-between border-b border-stone-200 pb-5"><h2 className="font-serif text-2xl">Filters</h2><button type="button" aria-label="Close filters" onClick={() => setDrawerOpen(false)} className="flex h-11 w-11 items-center justify-center text-stone-600 transition hover:bg-stone-100 hover:text-stone-950"><X size={21} strokeWidth={1.5} /></button></div><FilterPanel {...{ selectedCategories, setSelectedCategories: (value) => updateFilter(setSelectedCategories, value), selectedColors, setSelectedColors: (value) => updateFilter(setSelectedColors, value), selectedSizes, setSelectedSizes: (value) => updateFilter(setSelectedSizes, value), priceRange, setPriceRange: (value) => updateFilter(setPriceRange, value), onReset: resetFilters }} /><button type="button" onClick={() => setDrawerOpen(false)} className="mt-8 min-h-12 w-full shrink-0 bg-stone-950 px-5 py-4 text-xs uppercase tracking-[0.2em] text-white active:bg-stone-800">View {filteredProducts.length} pieces</button></aside></div>}
        </main>
    );
}
