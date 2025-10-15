'use client';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

function CartContent() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-16 md:py-24 bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-md border border-slate-200">
          <svg className="w-16 h-16 md:w-24 md:h-24 text-slate-300 mb-4 md:mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <h3 className="text-lg md:text-2xl font-bold text-slate-900 mb-2 md:mb-3">Your cart is empty</h3>
          <p className="text-slate-600 text-sm md:text-base mb-6 md:mb-8">Start adding items to your cart</p>
          <Link
            href="/"
            className="inline-block px-6 md:px-8 py-2.5 md:py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6 md:mb-12">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-1 md:mb-2">Shopping Cart</h1>
        <p className="text-slate-600 text-xs md:text-sm">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>
      
      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-md p-4 md:p-8 border border-slate-200">
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-slate-50 rounded-lg md:rounded-xl border border-slate-200 p-4 md:p-5"
              >
                <div className="flex gap-3 md:gap-4">
                  <Link href={`/product/${item.id}`} className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg bg-white border border-slate-200 p-2 hover:border-indigo-300 transition-colors">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </Link>
                  
                  <div className="flex-1 min-w-0 flex flex-col">
                    <Link href={`/product/${item.id}`} className="hover:text-indigo-600 transition-colors">
                      <h3 className="font-medium text-slate-900 mb-1 text-sm md:text-base line-clamp-2">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-base md:text-xl font-semibold text-indigo-600 mb-3 md:mb-4">
                      ${item.price.toFixed(2)}
                    </p>
                    
                    <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 md:w-8 md:h-8 rounded border border-gray-300 hover:bg-gray-50 text-gray-600 transition-colors flex items-center justify-center text-sm"
                        >
                          −
                        </button>
                        <span className="w-8 md:w-10 text-center font-medium text-slate-900 text-sm md:text-base">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 md:w-8 md:h-8 rounded border border-gray-300 hover:bg-gray-50 text-gray-600 transition-colors flex items-center justify-center text-sm"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="px-3 py-1.5 rounded text-red-600 hover:bg-red-50 transition-colors text-xs md:text-sm font-medium flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-slate-50 rounded-lg md:rounded-xl border border-slate-200 p-4 md:p-6 lg:sticky lg:top-24">
              <h2 className="text-base md:text-lg font-semibold text-slate-900 mb-4 md:mb-5">Order Summary</h2>
              
              <div className="space-y-3 mb-5 md:mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="text-slate-900 font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t border-slate-300 pt-3 flex justify-between">
                  <span className="font-semibold text-slate-900 text-base md:text-lg">Total</span>
                  <span className="font-semibold text-slate-900 text-base md:text-lg">${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
              
              <button className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-2.5 md:py-3 font-medium text-sm transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20 md:pt-24 pb-12 px-4">
      <Suspense fallback={
        <div className="container mx-auto py-16 text-center">
          <div className="text-xl md:text-2xl font-bold text-slate-800">Loading cart...</div>
        </div>
      }>
        <CartContent />
      </Suspense>
    </div>
  );
}