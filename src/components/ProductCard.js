'use client';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="group relative block overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20 border border-purple-100">
        <div className="relative h-64 w-full overflow-hidden bg-white/80 p-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: 'contain' }}
            className="transition-transform duration-500 ease-out group-hover:scale-110"
          />
          {/* Category Badge */}
          <div className="absolute bottom-2 right-2">
            <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
              {product.category}
            </span>
          </div>
          {/* Rating Stars */}
          <div className="absolute top-2 left-2 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  index < Math.round(product.rating.rate)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-xs font-medium text-gray-600">
              ({product.rating.count})
            </span>
          </div>
        </div>

        <div className="relative p-4 bg-white/40">
          <div className="min-h-[4rem] mb-2">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-purple-700 transition-colors duration-300">
              {product.title}
            </h3>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <div className="flex-shrink-0">
              <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ${product.price.toFixed(2)}
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-purple-500 px-3 py-1.5 text-xs font-medium text-white transform transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/25">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;