'use client';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerClass = "w-full bg-slate-100 pt-12 md:pt-20 pb-8 md:pb-10 mt-16 md:mt-32 relative border-t border-slate-200";
  const containerClass = "container mx-auto px-4 relative";
  const maxWidthClass = "max-w-4xl mx-auto";
  
  const brandSectionClass = "text-center mb-10 md:mb-12";
  const brandTitleClass = "text-2xl md:text-3xl font-bold text-slate-900 mb-3 md:mb-4";
  const brandDescClass = "text-slate-600 leading-relaxed text-sm md:text-base max-w-2xl mx-auto";
  
  const linksGridClass = "grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-10 md:mb-12 max-w-xl mx-auto";
  const linkColumnClass = "text-center md:text-left";
  const linkTitleClass = "text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4";
  const linkItemClass = "text-slate-600 hover:text-slate-900 text-sm transition-all duration-200 inline-block hover:translate-x-1";
  
  const socialContainerClass = "flex items-center justify-center space-x-3 mb-10 md:mb-12";
  const socialButtonClass = "w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition-all duration-200 hover:scale-110 active:scale-95";
  const socialIconClass = "w-5 h-5";
  
  const bottomSectionClass = "border-t border-slate-200 pt-6 md:pt-8";
  const bottomContainerClass = "flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-8";
  const copyrightClass = "text-slate-600 text-sm";
  const bottomLinksClass = "flex items-center space-x-6 text-sm";
  const bottomLinkClass = "text-slate-600 hover:text-slate-900 transition-all duration-200 hover:translate-x-1";

  return (
    <footer className={footerClass}>
      <div className={containerClass}>
        <div className={maxWidthClass}>
          
          <div className={brandSectionClass}>
            <h3 className={brandTitleClass}>
              YDP Shop
            </h3>
            <p className={brandDescClass}>
              Your trusted online marketplace for quality products at great prices. Shop with confidence.
            </p>
          </div>

          <div className={linksGridClass}>
            
            <div className={linkColumnClass}>
              <h4 className={linkTitleClass}>
                Help & Support
              </h4>
              <div className="space-y-2">
                <div>
                  <Link href="#" className={linkItemClass}>
                    Order & Shipping
                  </Link>
                </div>
                <div>
                  <Link href="#" className={linkItemClass}>
                    Returns & Refunds
                  </Link>
                </div>
                <div>
                  <Link href="#" className={linkItemClass}>
                    FAQs
                  </Link>
                </div>
                <div>
                  <Link href="#" className={linkItemClass}>
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            <div className={linkColumnClass}>
              <h4 className={linkTitleClass}>
                Join Up
              </h4>
              <div className="space-y-2">
                <div>
                  <Link href="#" className={linkItemClass}>
                    Modimal Club
                  </Link>
                </div>
                <div>
                  <Link href="#" className={linkItemClass}>
                    Careers
                  </Link>
                </div>
                <div>
                  <Link href="#" className={linkItemClass}>
                    Visit Us
                  </Link>
                </div>
              </div>
            </div>
            
          </div>

          <div className={socialContainerClass}>
            
            <a 
              href="#" 
              className={socialButtonClass}
              aria-label="TikTok"
            >
              <svg 
                className={socialIconClass} 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 11-2.88-2.88c.37 0 .72.07 1.04.21v-3.5a6.13 6.13 0 00-1.04-.09A6.37 6.37 0 003 15.77a6.37 6.37 0 0012.74 0v-6.87a8.2 8.2 0 004.85 1.52v-3.73z"/>
              </svg>
            </a>
            
            <a 
              href="https://www.instagram.com/potter.x09" 
              className={socialButtonClass}
              aria-label="Instagram"
            >
              <svg 
                className={socialIconClass} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                strokeWidth={2}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 21h9a4.5 4.5 0 004.5-4.5V7.5A4.5 4.5 0 0016.5 3h-9A4.5 4.5 0 003 7.5v9A4.5 4.5 0 007.5 21z"
                />
              </svg>
            </a>
            
            <a 
              href="#" 
              className={socialButtonClass}
              aria-label="Twitter"
            >
              <svg 
                className={socialIconClass} 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </a>
            
          </div>
        </div>

        <div className={bottomSectionClass}>
          <div className={bottomContainerClass}>
            
            <div className={copyrightClass}>
              © {currentYear} YDP Shop. All rights reserved.
            </div>
            
            <div className={bottomLinksClass}>
              <Link href="#" className={bottomLinkClass}>
                Privacy
              </Link>
              <Link href="#" className={bottomLinkClass}>
                Terms
              </Link>
              <Link href="#" className={bottomLinkClass}>
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