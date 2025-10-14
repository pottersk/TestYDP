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
    { id: '', name: 'All Products', icon: '🛍️' },
    { id: 'electronics', name: 'Electronics', icon: '💻' },
    { id: 'jewelery', name: 'Jewelry', icon: '💎' },
    { id: "men's clothing", name: "Men's Clothing", icon: '👔' },
    { id: "women's clothing", name: "Women's Clothing", icon: '👗' }
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

  const getCurrentCategoryIcon = () => {
    const current = categories.find(cat => cat.id === activeCategory);
    return current ? current.icon : '🛍️';
  };
  
  return (
    <header className="w-full fixed top-0 z-10 p-2 md:p-5">
      <nav className="container mx-auto">
        <div className="w-full bg-white/90 backdrop-blur-sm rounded-full border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-pink-200">
          <div className="flex items-center justify-between px-4 py-1.5 md:px-6 md:py-3">
            <div className="hidden md:flex w-full items-center">
              <div className="w-1/4 flex justify-start">
                <Link href="/" className="font-bold text-2xl text-gray-900 hover:text-gray-700 transition-colors pl-[40px]">
                  YDP
                </Link>
              </div>

              <div className="w-2/4 flex items-center justify-center gap-4">
                <div className="relative">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg transition-all duration-200"
                  >
                    <span>{getCurrentCategoryIcon()}</span>
                    <span>{getCurrentCategoryName()}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showFilters && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryClick(category.id)}
                          className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-all duration-200
                            ${activeCategory === category.id 
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium' 
                              : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                          <span className="text-xl">{category.icon}</span>
                          <span>{category.name}</span>
                          {activeCategory === category.id && (
                            <svg className="w-5 h-5 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <form onSubmit={handleSearch} className="flex-grow max-w-md">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all shadow-sm"
                    />
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </form>
              </div>

              <div className="w-1/4 flex items-center justify-end pr-6 space-x-4">
                <Link href="/profile" className="p-2 text-gray-700 hover:text-pink-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
                <Link href="/wishlist" className="relative p-2 text-gray-700 hover:text-pink-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {wishlistItems?.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs font-bold text-white shadow-lg">
                      {wishlistItems.length}
                    </span>
                  )}
                </Link>
                <Link href="/cart" className="relative p-2 text-gray-700 hover:text-pink-500 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white shadow-lg">
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
              
              <Link href="/" className="font-bold text-xl text-gray-900 hover:text-gray-700 transition-colors">
                YDP
              </Link>
              
              <div className="flex items-center gap-2">
                <Link href="/wishlist" className="p-1 text-gray-700 hover:text-pink-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
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
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white shadow-lg">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {open && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg md:hidden mx-2">
            <div className="p-3 flex flex-col gap-2">
              <div className="border-b border-gray-100 pb-2 mb-2">
                <p className="text-xs font-semibold text-gray-500 uppercase px-4 mb-2">Categories</p>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => {
                      handleCategoryClick(category.id);
                      setOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-full transition-all duration-200 mb-1 font-medium
                      ${activeCategory === category.id 
                        ? 'bg-purple-500 text-white shadow-md' 
                        : 'text-gray-600 hover:text-white hover:bg-purple-400'}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-white px-4 py-2 rounded-full hover:bg-purple-500 transition-all duration-200 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Profile</span>
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-white px-4 py-2 rounded-full hover:bg-purple-500 transition-all duration-200 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Wishlist</span>
              </Link>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-white px-4 py-2 rounded-full hover:bg-purple-500 transition-all duration-200 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
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