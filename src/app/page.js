'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';

function SearchParamsHandler({ onCategoryChange }) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    onCategoryChange(category);
  }, [category, onCategoryChange]);

  return null;
}

function ProductList({ products, visibleProducts }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-purple-100/50">
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
    </div>
  );
}

function ProductsContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pt-24 pb-12 px-4">
      <div className="container mx-auto">
        <Suspense fallback={null}>
          <SearchParamsHandler onCategoryChange={setCurrentCategory} />
        </Suspense>
        
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent inline-block mb-4">
            {currentCategory 
              ? currentCategory.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
              : 'All Products'}
          </h1>
          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
              <span className="text-white text-sm font-medium">{products.length}</span>
            </span>
            <p className="text-gray-600 font-medium">
              {products.length === 1 ? 'Product' : 'Products'} Found
            </p>
          </div>
        </div>

        {products.length > 0 ? (
          <ProductList products={products} visibleProducts={visibleProducts} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <svg
              className="w-24 h-24 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}