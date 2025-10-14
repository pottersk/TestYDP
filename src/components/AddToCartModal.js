'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AddToCartModal({ isOpen, onClose, product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  // Reset quantity when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  const handleCheckout = () => {
    onAddToCart(product, quantity);
    router.push('/cart');
    onClose();
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full pointer-events-auto transform transition-all duration-300 animate-scale-in overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-6 pb-8">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-white pr-8">Add to Cart</h2>
          </div>

          {/* Content */}
          <div className="p-6 -mt-4">
            {/* Product Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 mb-6 shadow-sm">
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-white rounded-xl p-2 shadow-sm">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm md:text-base">
                    {product.title}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-white rounded-full text-xs font-medium text-purple-700 mb-2">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    <span>⭐</span>
                    <span className="text-sm font-semibold text-gray-700">
                      {product.rating?.rate}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({product.rating?.count})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Quantity
              </label>
              <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-3">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-purple-600 font-bold text-xl hover:bg-purple-50"
                >
                  −
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-2xl md:text-3xl font-bold text-gray-800 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <span className="text-sm text-gray-500">item{quantity > 1 ? 's' : ''}</span>
                </div>

                <button
                  onClick={incrementQuantity}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center text-purple-600 font-bold text-xl hover:bg-purple-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm md:text-base">Unit Price:</span>
                <span className="font-semibold text-gray-800">${product.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm md:text-base">Quantity:</span>
                <span className="font-semibold text-gray-800">× {quantity}</span>
              </div>
              <div className="h-px bg-gradient-to-r from-purple-300 to-pink-300 my-3"></div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800">Total:</span>
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ${totalPrice}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 px-6 rounded-full font-semibold transition-all duration-300 bg-white border-2 border-purple-500 text-purple-600 hover:bg-purple-50 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleCheckout}
                className="w-full py-4 px-6 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Checkout Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
