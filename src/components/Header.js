'use client';

import { useCart } from '@/context/CartContext';
import { useState, Suspense } from 'react';
import { useWishlist } from '@/context/WishlistContext';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function HeaderContent() {
  const [open, setOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || '';
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { id: '', name: 'All Products' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'jewelery', name: 'Jewelry' },
    { id: "men's clothing", name: "Men's Clothing" },
    { id: "women's clothing", name: "Women's Clothing" }
  ];
  
  let totalItems = 0;
  for(let item of cartItems) {
    totalItems = totalItems + item.quantity;
  }

  const handleCategoryClick = (categoryId) => {
    const params = new URLSearchParams(searchParams);
    
    if (categoryId === '') {
      params.delete('category');
    } else {
      params.set('category', categoryId);
    }
    
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    
    const queryString = params.toString();
    router.push(queryString ? `/?${queryString}` : '/');
    setShowFilters(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    } else {
      params.delete('search');
    }
    
    const queryString = params.toString();
    router.push(queryString ? `/?${queryString}` : '/');
  };

  const getCurrentCategoryName = () => {
    const current = categories.find(cat => cat.id === activeCategory);
    return current ? current.name : 'All Products';
  };
  
  return (
    <header className="w-full fixed top-0 z-10 p-2 md:p-5">
      <nav className="container mx-auto">
        <div className="w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between px-4 py-2 md:px-6 md:py-4">
            <div className="hidden md:flex w-full items-center justify-between">
              <Link href="/" className="font-semibold text-2xl text-slate-800 hover:text-slate-900 transition-colors">
                YDP Shop
              </Link>

              <div className="flex items-center space-x-2">
                <Link href="/profile" className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-all duration-200 hover:scale-110 active:scale-95">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
                <Link href="/wishlist" className="relative p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-all duration-200 hover:scale-110 active:scale-95">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {wishlistItems?.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-medium text-white transition-all duration-200 animate-pulse">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
                <Link href="/cart" className="relative p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-all duration-200 hover:scale-110 active:scale-95">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-xs font-medium text-white transition-all duration-200 animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            <div className="flex md:hidden items-center justify-between w-full">
              <div className="w-[40px] flex justify-start">
                <button
                  onClick={() => setOpen((s) => !s)}
                  className="p-1 text-gray-700 hover:text-pink-500 transition-colors"
                  aria-label={open ? 'Close menu' : 'Open menu'}
                  aria-expanded={open}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {open ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
              
              <Link href="/" className="font-semibold text-xl text-slate-800 hover:text-slate-900 transition-colors">
                YDP Shop
              </Link>
              
              <div className="flex items-center gap-2">
                <Link href="/wishlist" className="relative p-1 text-gray-700 hover:text-pink-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {wishlistItems?.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
                <Link href="/cart" className="relative p-1 text-gray-700 hover:text-pink-500 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {open && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-slate-200 md:hidden mx-2 animate-slideUp">
            <div className="p-3 flex flex-col gap-2">
              <div className="border-b border-slate-200 pb-2 mb-2">
                <p className="text-xs font-semibold text-slate-500 px-3 mb-2 uppercase tracking-wider">Categories</p>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => {
                      handleCategoryClick(category.id);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 transition-all duration-200 mb-1 font-medium text-sm hover:translate-x-1
                      ${activeCategory === category.id 
                        ? 'bg-slate-100 text-slate-900' 
                        : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="text-slate-700 hover:bg-slate-50 px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 font-medium text-sm hover:translate-x-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Profile</span>
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setOpen(false)}
                className="text-slate-700 hover:bg-slate-50 px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 font-medium text-sm hover:translate-x-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Wishlist</span>
              </Link>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="text-slate-700 hover:bg-slate-50 px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 font-medium text-sm hover:translate-x-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-xs font-medium text-white">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

const Header = () => {
  return (
    <Suspense fallback={<div className="w-full h-16 bg-white/90 backdrop-blur-sm rounded-full border border-gray-100 shadow-lg"></div>}>
      <HeaderContent />
    </Suspense>
  );
};

export default Header;