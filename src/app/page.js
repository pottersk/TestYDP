 'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';

function ProductList({ products, visibleProducts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`transform transition-all duration-500 ${
            visibleProducts.includes(index)
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <ProductCard product={product} priority={index < 4} />
        </div>
      ))}
    </div>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState([]);
  
  const currentCategory = searchParams.get('category') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setVisibleProducts([]); 
      try {
        let url = 'https://fakestoreapi.com/products';
        
        if (currentCategory) {
          url = `https://fakestoreapi.com/products/category/${currentCategory}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentCategory]);

  useEffect(() => {
    if (!loading && products.length > 0) {
      setVisibleProducts([]);
      products.forEach((_, index) => {
        setTimeout(() => {
          setVisibleProducts(prev => [...prev, index]);
        }, index * 100);
      });
    }
  }, [loading, products]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium text-sm">Loading products...</p>
        </div>
      </div>
    );
  }

  const getCategoryDisplayName = () => {
    const categoryMap = {
      'electronics': '💻 Electronics',
      'jewelery': '💎 Jewelry',
      "men's clothing": "👔 Men's Clothing",
      "women's clothing": "👗 Women's Clothing"
    };
    
    if (!currentCategory) return '🛍️ All Products';
    return categoryMap[currentCategory] || currentCategory;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-20 md:pt-32 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-slate-900 mb-1 md:mb-2">
              {currentCategory ? currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1) : 'All Products'}
            </h1>
            <p className="text-xs md:text-sm text-slate-600">
              {products.length} {products.length === 1 ? 'item' : 'items'} available
            </p>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm md:shadow-md p-4 md:p-8">
            <ProductList products={products} visibleProducts={visibleProducts} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 md:py-20 bg-white border border-slate-200 rounded-xl md:rounded-2xl shadow-sm md:shadow-md">
            <svg
              className="w-12 h-12 md:w-16 md:h-16 text-slate-300 mb-3 md:mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-lg md:text-xl font-medium text-slate-700 mb-2">No Products Found</h3>
            <p className="text-slate-500 text-xs md:text-sm">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
}

function HomeContent() {
  return (
    <Suspense fallback={null}>
      <ProductsContent />
    </Suspense>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-2 border-black border-t-transparent animate-spin"></div>
          <p className="text-gray-900 font-light tracking-widest uppercase text-sm">Loading...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}