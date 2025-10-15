'use client';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

function CartContent() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <svg className="w-24 h-24 mx-auto mb-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
        <p className="text-base text-slate-600 mb-8">Start adding items to your cart</p>
        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-2xl md:text-4xl font-bold text-slate-900 mb-6 md:mb-8">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-3 md:space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl md:rounded-2xl border border-slate-200 p-4 md:p-6 shadow-sm"
            >
              <div className="flex gap-3 md:gap-6">
                <div className="relative w-20 h-20 md:w-28 md:h-28 flex-shrink-0 rounded-lg md:rounded-xl bg-white border-2 border-slate-100 p-1 md:p-2">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 mb-2 text-xs md:text-sm line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-lg md:text-2xl font-bold text-indigo-600 mb-3 md:mb-4">
                    ${item.price.toFixed(2)}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors font-bold text-base md:text-lg flex items-center justify-center"
                      >
                        −
                      </button>
                      <span className="w-8 md:w-12 text-center font-bold text-slate-900 text-sm md:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors font-bold text-base md:text-lg flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-white border border-red-200 text-red-600 hover:bg-red-50 transition-colors text-xs font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200 p-5 md:p-8 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4 md:mb-6">Order Summary</h2>
            
            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              <div className="flex justify-between text-slate-600 font-medium">
                <span className="text-sm">Subtotal</span>
                <span className="text-slate-900 font-bold text-sm md:text-base">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span className="text-sm">Shipping</span>
                <span className="text-green-600 font-bold text-sm md:text-base">Free</span>
              </div>
              <div className="border-t-2 border-slate-200 pt-3 md:pt-4 flex justify-between">
                <span className="font-bold text-slate-900 text-base md:text-xl">Total</span>
                <span className="font-bold text-indigo-600 text-lg md:text-xl">${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-medium text-sm transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <Suspense fallback={
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-2xl font-bold text-slate-800">Loading cart...</div>
        </div>
      }>
        <CartContent />
      </Suspense>
    </div>
  );
}