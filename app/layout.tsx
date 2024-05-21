import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NavBar } from "./components/nav/navBar";
import { Footer } from "./components/footer/footer";
import { CartProvider } from "@/providers/cartProvider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({ subsets: ["latin"], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: "E-commerce",
  description: "E-commerce app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster toastOptions={{
          style: {
            background: 'rgb(51 65 85)',
            color: '#fff',
          },
        }} />
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
