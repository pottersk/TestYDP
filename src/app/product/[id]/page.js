'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import AddToCartModal from '@/components/AddToCartModal';

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center animate-fadeIn">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-4 md:py-12">
          <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-10 shadow-lg md:shadow-xl border border-slate-200/50 animate-fadeIn">
            <div className="grid md:grid-cols-2 gap-6 md:gap-12">
              {/* Product Image with White Background */}
              <div className="flex items-center justify-center">
                <div className="relative w-full h-64 md:h-96 bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-sm md:shadow-md border border-slate-100 md:border-2 transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    style={{ objectFit: 'contain', padding: '20px' }}
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <span className="inline-block w-fit px-3 py-1.5 rounded bg-slate-100 text-slate-600 text-xs md:text-sm font-medium mb-3 md:mb-6 border border-slate-200">
                  {product.category}
                </span>
                
                <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-6 leading-tight">
                  {product.title}
                </h1>
                
                <p className="text-slate-600 mb-4 md:mb-8 leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>
                
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-slate-800 text-base md:text-lg">{product.rating?.rate.toFixed(1)}</span>
                  <span className="text-slate-600 font-medium md:font-bold text-xs md:text-sm">({product.rating?.count} reviews)</span>
                </div>
                
                <div className="text-3xl md:text-5xl font-bold text-slate-800 mb-5 md:mb-10">
                  ${product.price.toFixed(2)}
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 rounded-lg bg-slate-800 hover:bg-slate-900 text-white py-3 md:py-4 font-medium text-sm md:text-base transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
                  >
                    Add to Cart
                  </button>
                  
                  <button
                    onClick={() => {
                      if (isInWishlist(product.id)) {
                        removeFromWishlist(product.id);
                      } else {
                        addToWishlist(product);
                      }
                    }}
                    className={`px-4 md:px-6 rounded-lg border-2 transition-all duration-200 shadow-sm hover:scale-110 active:scale-95 ${
                      isInWishlist(product.id)
                        ? 'bg-rose-50 border-rose-500 text-rose-500 hover:bg-rose-100'
                        : 'bg-white border-slate-300 text-slate-600 hover:border-rose-500 hover:text-rose-500'
                    }`}
                    aria-label={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-5 h-5 md:w-6 md:h-6 ${
                        isInWishlist(product.id) ? 'fill-current' : ''
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
                </div>
              </div>
            </div>
          </div>
        </div>

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
      </div>
    </>
  );
}