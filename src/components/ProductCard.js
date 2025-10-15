'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import AddToCartModal from '@/components/AddToCartModal';

const ProductCard = ({ product, priority = false }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <Link href={`/product/${product.id}`}>
      <div className="group relative block overflow-hidden rounded-lg bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-200 h-full">
        <div className="relative h-48 md:h-64 w-full overflow-hidden bg-white p-3 md:p-4">
          <button
            onClick={handleWishlistClick}
            className="absolute top-2 right-2 md:top-3 md:right-3 z-10 p-1.5 md:p-2 rounded-lg bg-white hover:bg-slate-50 transition-all duration-200 shadow-sm hover:scale-110 active:scale-95"
            aria-label={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-200 ${
                inWishlist
                  ? 'text-rose-500 fill-current scale-110'
                  : 'text-slate-400 hover:text-rose-500'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          
          <div className="absolute inset-3 md:inset-4 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={product.image}
                alt={product.title}
                fill
                style={{ objectFit: 'contain' }}
                className="transition-transform duration-300 ease-out group-hover:scale-105"
                priority={priority}
              />
            </div>
          </div>
          
          <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 z-10">
            <span className="inline-flex items-center rounded bg-slate-100 px-1.5 py-0.5 md:px-2.5 md:py-1 text-[10px] md:text-xs font-medium text-slate-600 border border-slate-200">
              {product.category}
            </span>
          </div>
          <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-md border border-slate-200">
            <svg className="w-3 h-3 md:w-4 md:h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs md:text-sm font-semibold text-slate-800">
              {product.rating.rate.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="relative p-3 md:p-4 bg-white">
          <div className="min-h-[2.5rem] md:min-h-[3rem] mb-2 md:mb-3">
            <h3 className="text-sm md:text-base font-medium text-slate-900 line-clamp-2 leading-relaxed group-hover:text-slate-700 transition-colors duration-200">
              {product.title}
            </h3>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-base md:text-xl font-semibold text-slate-800">
                ${product.price.toFixed(2)}
              </p>
              <button
                onClick={handleAddToCartClick}
                className="flex items-center gap-1 md:gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 px-2 py-1.5 md:px-3 md:py-2 text-[10px] md:text-xs font-medium text-white transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="hidden md:inline">Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>

    <AddToCartModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      product={product}
      onAddToCart={(product, quantity) => {
        for (let i = 0; i < quantity; i++) {
          addToCart(product);
        }
      }}
    />
    </>
  );
};

export default ProductCard;