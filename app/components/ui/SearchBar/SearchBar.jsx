"use client";
import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import {products} from '@/app/data/products';
import gsap from 'gsap';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
const router = useRouter()
const [searchQuery, setSearchQuery] = useState('');
const [results, setResults] = useState([]);
const [isOpen, setIsOpen] = useState(false);
const dropdownRef = useRef(null);

const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
    
    setResults(filtered);
    setIsOpen(true);
    } else {
    setResults([]);
    setIsOpen(false);
    }
};

useEffect(() => {
    if (isOpen && dropdownRef.current) {
    gsap.fromTo(dropdownRef.current,
        { opacity: 0, y: -5 },
        { opacity: 1, y: 0, duration: 0.2 }
    );
    }
}, [isOpen]);

useEffect(() => {
    const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
    }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
}, []);

return (
    <div className="mr-5 hidden border px-4 relative rounded-full border-stone-400 transition md:block">
    <Search 
        size={16} 
        strokeWidth={1} 
        className="text-stone-500 absolute left-2 top-1/2 -translate-y-1/2" 
    />
    <input 
        type="text" 
        name="query" 
        placeholder="Search" 
        aria-label="Search products"
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={() => searchQuery.trim() && setIsOpen(true)}
        className="w-45 bg-transparent px-4 py-2 text-xs text-stone-900 outline-none placeholder:text-stone-400" 
    />

    {/* Dropdown */}
    {isOpen && results.length > 0 && (
        <div
        ref={dropdownRef}
        className="absolute top-full mt-2 w-60 left-0 bg-white border border-stone-200 rounded-lg shadow-lg z-50"
        >
        {results.map(product => (
            
            <div
            key={product.id}
            className="px-4 py-3 border-b border-stone-100 last:border-b-0 hover:bg-stone-50 cursor-pointer transition"
            onClick={() => {
                setSearchQuery('');
                setIsOpen(false);
                router.push(`/products/${product.category.toLowerCase()}/${product.id}`)
                
            }}
            >
            <div className="flex items-center gap-3">
                {product.image && (
                <Image
                    src={product.image}
                    alt={product.name}
                    width={20}
                    height={20}
                    className="object-contain"
                />
                )}
                <div className="flex-1 min-w-0">
                <p className="text-stone-900 font-medium text-xs truncate">
                    {product.name}
                </p>
                <p className="text-stone-500 text-xs">
                    {product.brand}
                </p>
                </div>
            </div>
            </div>
        ))}

        {/* {results.length >= 5 && (
            <div className="p-3 text-center border-t border-stone-100">
            
                href={`/search?q=${searchQuery}`}
                className="text-stone-600 hover:text-stone-900 text-xs font-medium"
            >
                View all results →
            </a>
            </div>
        )} */}
        </div>
    )}

    {isOpen && searchQuery.trim() && results.length === 0 && (
        <div
        ref={dropdownRef}
        className="absolute top-full mt-2 w-60 left-0 bg-white border border-stone-200 rounded-lg p-4 text-center text-stone-500 text-xs"
        >
        No results found
        </div>
    )}
    </div>
);
}