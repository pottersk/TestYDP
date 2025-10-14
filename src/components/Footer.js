'use client';
import Link from 'next/link';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-r from-purple-600/5 via-pink-500/5 to-purple-600/5 pt-16 pb-8 mt-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-purple-600/20"></div>
      <div className="absolute top-0 left-1/4 w-24 h-24 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute top-12 right-1/3 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6 bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-purple-500/5 border border-purple-100/20">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent inline-flex items-center gap-2">
              <span className="text-3xl">✨</span> Follow Us
            </h3>
            <p className="text-gray-600 leading-relaxed">
              This is my socials. ! 
              <span className="block mt-2 font-medium bg-gradient-to-r from-purple-600/80 to-pink-600/80 bg-clip-text text-transparent">No cap, just pure shopping joy! 🔥</span>
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a 
                href="#" 
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-purple-600 hover:text-pink-500 hover:border-pink-200 border border-purple-100"
                aria-label="TikTok"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 11-2.88-2.88c.37 0 .72.07 1.04.21v-3.5a6.13 6.13 0 00-1.04-.09A6.37 6.37 0 003 15.77a6.37 6.37 0 0012.74 0v-6.87a8.2 8.2 0 004.85 1.52v-3.73z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/potter.x09" 
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-purple-600 hover:text-pink-500 hover:border-pink-200 border border-purple-100"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 21h9a4.5 4.5 0 004.5-4.5V7.5A4.5 4.5 0 0016.5 3h-9A4.5 4.5 0 003 7.5v9A4.5 4.5 0 007.5 21z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-purple-600 hover:text-pink-500 hover:border-pink-200 border border-purple-100"
                aria-label="Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-6 bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-purple-500/5 border border-purple-100/20">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent inline-flex items-center gap-2">
              <span className="text-3xl">💁‍♀️</span> Help & Support
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <Link href="/shipping" className="group flex items-center gap-3 px-4 py-2 rounded-xl bg-white/50 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300">
                <span className="text-xl group-hover:scale-110 transition-transform">🚚</span>
                <span className="text-gray-600 group-hover:text-white">Orders & Shipping</span>
              </Link>
              <Link href="/returns" className="group flex items-center gap-3 px-4 py-2 rounded-xl bg-white/50 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300">
                <span className="text-xl group-hover:scale-110 transition-transform">🔄</span>
                <span className="text-gray-600 group-hover:text-white">Returns & Refunds</span>
              </Link>
              <Link href="/faq" className="group flex items-center gap-3 px-4 py-2 rounded-xl bg-white/50 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300">
                <span className="text-xl group-hover:scale-110 transition-transform">❓</span>
                <span className="text-gray-600 group-hover:text-white">FAQs</span>
              </Link>
              
              <Link href="/size-guide" className="group flex items-center gap-3 px-4 py-2 rounded-xl bg-white/50 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300">
                <span className="text-xl group-hover:scale-110 transition-transform">📏</span>
                <span className="text-gray-600 group-hover:text-white">Contact Us</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative mt-16 pt-8">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-purple-600/0"></div>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3 group">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-lg border border-purple-100 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🛍️</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                YDP Shop
              </span>
            </div>
            <div className="text-gray-500 text-sm text-center md:text-right">
              <p className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-purple-100/20">
                © {year} YDP Shop. All rights reserved.
                <span className="block mt-1">Made with 💜 for you!</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;