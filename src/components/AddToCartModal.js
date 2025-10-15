'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AddToCartModal({ isOpen, onClose, product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

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

  if (!isOpen || !product || !mounted) return null;

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

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
      `}</style>
      
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div
          className="bg-white rounded-2xl shadow-2xl transform transition-all duration-300 animate-scale-in overflow-hidden border border-slate-200"
          onClick={(e) => e.stopPropagation()}
          style={{fontFamily: "'Space Grotesk', sans-serif"}}
        >
          <div className="relative bg-indigo-600 p-8 pb-10 rounded-t-2xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 hover:scale-110 transition-all duration-200 flex items-center justify-center"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6 text-white font-bold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-white pr-8">Add to Cart</h2>
          </div>

          <div className="p-6">
            <div className="bg-slate-50 rounded-xl p-5 mb-6 border border-slate-200">
              <div className="flex gap-4">
                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-white rounded-xl p-3 border-2 border-slate-100">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 text-base md:text-lg">
                    {product.title}
                  </h3>
                  <span className="inline-block px-3 py-1.5 rounded-md bg-slate-100 text-xs font-medium text-slate-600 mb-2 border border-slate-200">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-amber-500 mb-2">
                    <span className="text-lg">⭐</span>
                    <span className="text-sm font-bold text-slate-900">
                      {product.rating?.rate}
                    </span>
                    <span className="text-xs font-bold text-slate-600">
                      ({product.rating?.count})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-lg font-bold text-slate-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4 border border-slate-200">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-white font-bold text-2xl hover:scale-105"
                >
                  −
                </button>
                
                <div className="flex items-center gap-3">
                  <span className="text-3xl md:text-4xl font-bold text-slate-900 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <span className="text-base text-slate-700 font-bold">item{quantity > 1 ? 's' : ''}</span>
                </div>

                <button
                  onClick={incrementQuantity}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center text-white font-bold text-2xl hover:scale-105"
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl border-2 border-slate-200 p-5 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-700 text-base font-bold">Unit Price</span>
                <span className="font-bold text-slate-900 text-lg">${product.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-700 text-base font-bold">Quantity</span>
                <span className="font-bold text-slate-900 text-lg">× {quantity}</span>
              </div>
              <div className="h-px bg-slate-300 my-4"></div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-slate-900">Total</span>
                <span className="text-3xl md:text-4xl font-bold text-indigo-600">
                  ${totalPrice}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 px-6 rounded-lg font-medium text-base transition-colors bg-white text-slate-900 hover:bg-slate-50 border border-slate-300"
              >
                Add to Cart
              </button>

              <button
                onClick={handleCheckout}
                className="w-full py-3 px-6 rounded-lg font-medium text-base transition-colors bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Buy Now
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
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );

  return createPortal(modalContent, document.body);
}
