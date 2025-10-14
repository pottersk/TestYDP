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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-96 bg-white rounded-2xl p-8">
              <Image
                src={product.image}
                alt={product.title}
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>

            <div className="flex flex-col justify-center">
              <span className="inline-block w-fit px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm mb-4">
                {product.category}
              </span>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.title}
              </h1>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>
              
              <div className="flex items-center gap-2 mb-6">
                <span className="text-yellow-500">⭐</span>
                <span className="font-semibold">{product.rating?.rate}</span>
                <span className="text-gray-500">({product.rating?.count} reviews)</span>
              </div>
              
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
                ${product.price.toFixed(2)}
              </div>
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Add to Cart 🛒
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
  );
}