'use client';
import Link from 'next/link';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-100 pt-20 pb-10 mt-32 relative border-t border-slate-200">
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900" style={{fontFamily: "'Space Grotesk', sans-serif"}}>
              YDP Shop
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Your trusted online marketplace for quality products at great prices. Shop with confidence.
            </p>
            <div className="flex items-center space-x-3 pt-4">
              <a 
                href="#" 
                className="w-11 h-11 flex items-center justify-center rounded-lg bg-slate-800 text-white hover:bg-slate-700 hover:scale-105 transition-all duration-300"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 11-2.88-2.88c.37 0 .72.07 1.04.21v-3.5a6.13 6.13 0 00-1.04-.09A6.37 6.37 0 003 15.77a6.37 6.37 0 0012.74 0v-6.87a8.2 8.2 0 004.85 1.52v-3.73z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/potter.x09" 
                className="w-11 h-11 flex items-center justify-center rounded-lg bg-slate-800 text-white hover:bg-slate-700 hover:scale-105 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 21h9a4.5 4.5 0 004.5-4.5V7.5A4.5 4.5 0 0016.5 3h-9A4.5 4.5 0 003 7.5v9A4.5 4.5 0 007.5 21z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-11 h-11 flex items-center justify-center rounded-lg bg-slate-800 text-white hover:bg-slate-700 hover:scale-105 transition-all duration-300"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Customer Service</h4>
            <div className="grid grid-cols-1 gap-1">
              <Link href="/shipping" className="text-slate-600 hover:text-indigo-600 text-sm py-1.5 transition-colors">
                Shipping Information
              </Link>
              <Link href="/returns" className="text-slate-600 hover:text-indigo-600 text-sm py-1.5 transition-colors">
                Returns & Refunds
              </Link>
              <Link href="/faq" className="text-slate-600 hover:text-indigo-600 text-sm py-1.5 transition-colors">
                FAQs
              </Link>
              <Link href="/size-guide" className="text-slate-600 hover:text-indigo-600 text-sm py-1.5 transition-colors">
                Size Guide
              </Link>
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Company</h4>
            <div className="grid grid-cols-1 gap-1">
              <Link href="/about" className="text-slate-600 hover:text-indigo-600 text-sm py-1.5 transition-colors">
                About Us
              </Link>
              <Link href="/careers" className="text-slate-600 hover:text-indigo-600 text-sm py-1.5 transition-colors">
                Careers
              </Link>
              <Link href="/contact" className="text-slate-600 hover:text-indigo-600 text-sm py-1.5 transition-colors">
                Contact
              </Link>
              <Link href="/stores" className="text-slate-600 hover:text-indigo-600 text-sm py-1.5 transition-colors">
                Store Locator
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-600 text-sm">
              © {year} YDP Shop. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/privacy" className="text-slate-600 hover:text-indigo-600 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-slate-600 hover:text-indigo-600 transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-slate-600 hover:text-indigo-600 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;