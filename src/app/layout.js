import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/context/CartContext";
import ClientMusicPlayer from "@/components/ClientMusicPlayer";

export const metadata = {
  title: "YDP-SHOP",
  description: "Next-gen e-commerce store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <ClientMusicPlayer />
        </CartProvider>
      </body>
    </html>
  );
}