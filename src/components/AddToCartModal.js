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
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-white border-b border-gray-200 px-6 py-4">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-gray-900">Add to Cart</h2>
          </div>

          <div className="p-6">
            <div className="bg-gray-50 rounded p-4 mb-5 border border-gray-200">
              <div className="flex gap-4">
                <div className="relative w-20 h-20 flex-shrink-0 bg-white rounded p-2 border border-gray-200">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 text-sm">
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {product.category}
                  </p>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-700">
                      {product.rating?.rate}
                    </span>
                    <span className="text-gray-400 text-xs">
                      ({product.rating?.count})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-gray-600"
                >
                  −
                </button>
                
                <span className="text-base font-medium text-gray-900 min-w-[2rem] text-center">
                  {quantity}
                </span>

                <button
                  onClick={incrementQuantity}
                  className="w-8 h-8 rounded border border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-600"
                >
                  +
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Price</span>
                <span className="text-sm text-gray-900">${product.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Quantity</span>
                <span className="text-sm text-gray-900">× {quantity}</span>
              </div>
              <div className="border-t border-gray-200 mt-3 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-xl font-semibold text-gray-900">
                    ${totalPrice}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-2.5 px-4 rounded border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Add to Cart
              </button>

              <button
                onClick={handleCheckout}
                className="flex-1 py-2.5 px-4 rounded bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
