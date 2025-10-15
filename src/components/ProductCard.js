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
    e.preventDefault(); // Prevent Link navigation
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault(); // Prevent Link navigation
    setIsModalOpen(true);
  };

  return (
    <>
      <Link href={`/product/${product.id}`}>
      <div className="group relative block overflow-hidden rounded-lg bg-white transition-all duration-200 hover:shadow-lg border border-slate-200">
        <div className="relative h-64 w-full overflow-hidden bg-slate-50 p-4">
          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-white hover:bg-slate-50 transition-colors duration-200 shadow-sm"
            aria-label={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 ${
                inWishlist
                  ? 'text-rose-500 fill-current'
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
          
          {/* White rounded frame for product image */}
          <div className="absolute inset-4 bg-white rounded-2xl border-2 border-slate-100 shadow-sm p-3 flex items-center justify-center">
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
          
          <div className="absolute bottom-3 right-3 z-10">
            <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 border border-slate-200">
              {product.category}
            </span>
          </div>
          <div className="absolute top-3 left-3 z-10 flex items-center bg-white rounded-lg px-2.5 py-1 shadow-sm border border-slate-100">
            <span className="text-amber-500">⭐</span>
            <span className="ml-1 text-sm font-medium text-slate-700">
              {product.rating.rate}
            </span>
          </div>
        </div>

        <div className="relative p-4 bg-white">
          <div className="min-h-[3rem] mb-3">
            <h3 className="text-sm font-medium text-slate-900 line-clamp-2 leading-relaxed group-hover:text-indigo-600 transition-colors duration-200">
              {product.title}
            </h3>
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-xl font-semibold text-indigo-600">
                ${product.price.toFixed(2)}
              </p>
              <button
                onClick={handleAddToCartClick}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-3 py-2 text-xs font-medium text-white transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>

    {/* Add to Cart Modal */}
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