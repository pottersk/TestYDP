'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import AddToCartModal from '@/components/AddToCartModal';

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

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
      <div className="min-h-screen flex items-center justify-center">
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
      <div className="min-h-screen bg-slate-50 pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-200">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Product Image with White Background */}
              <div className="flex items-center justify-center">
                <div className="relative w-full h-96 bg-white rounded-2xl p-8 shadow-md border-2 border-slate-100">
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
                <span className="inline-block w-fit px-4 py-2 rounded-md bg-slate-100 text-slate-600 text-sm font-medium mb-6 border border-slate-200" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                  {product.category}
                </span>
                
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                  {product.title}
                </h1>
                
                <p className="text-slate-600 mb-8 leading-relaxed font-medium text-base" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                  {product.description}
                </p>
                
                <div className="flex items-center gap-3 mb-8 bg-slate-50 border-2 border-slate-200 px-5 py-4 rounded-2xl w-fit shadow-sm">
                  <span className="text-2xl">⭐</span>
                  <span className="font-bold text-slate-900 text-lg" style={{fontFamily: "'Space Grotesk', sans-serif"}}>{product.rating?.rate}</span>
                  <span className="text-slate-600 font-bold text-sm" style={{fontFamily: "'Space Grotesk', sans-serif"}}>({product.rating?.count} reviews)</span>
                </div>
                
                <div className="text-5xl font-bold text-indigo-600 mb-10" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
                  ${product.price.toFixed(2)}
                </div>
                
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-4 font-medium text-base transition-colors shadow-sm"
                  style={{fontFamily: "'Space Grotesk', sans-serif"}}
                >
                  Add to Cart
                </button>
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