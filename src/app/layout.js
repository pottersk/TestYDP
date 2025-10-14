import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import ClientMusicPlayer from "@/components/ClientMusicPlayer";

export const metadata = {
  title: "YDP-SHOP",
  description: "Next-gen e-commerce store",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <WishlistProvider>
            <Header />
            {children}
            <Footer />
            <ClientMusicPlayer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}