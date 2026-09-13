import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/app/components/landing/Nav"
import Footer from "@/app/components/landing/Footer"
import { CartProvider, WishlistProvider, ToastProvider } from "@/app/context/CartContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://velora.example.com"),
  title: {
    default: "VELORA | Modern Clothing, Bags & Accessories",
    template: "%s | VELORA",
  },
  description:
    "VELORA is a modern boutique for clothing, bags, shoes, and accessories designed around a refined everyday uniform.",
  keywords: [
    "VELORA",
    "modern clothing",
    "bags",
    "accessories",
    "luxury essentials",
    "fashion boutique",
    "shop clothing",
    "premium accessories",
  ],
  applicationName: "VELORA",
  category: "fashion",
  authors: [{ name: "VELORA" }],
  creator: "VELORA",
  publisher: "VELORA",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "VELORA | Modern Clothing, Bags & Accessories",
    description:
      "Discover elevated clothing, bags, shoes, and accessories from VELORA.",
    url: "https://velora.example.com",
    siteName: "VELORA",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/photos/premium_photo-1727942419794-aa6412e45686.avif",
        width: 1200,
        height: 900,
        alt: "VELORA modern boutique collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VELORA | Modern Clothing, Bags & Accessories",
    description:
      "Discover elevated clothing, bags, shoes, and accessories from VELORA.",
    images: ["/photos/premium_photo-1727942419794-aa6412e45686.avif"],
    site: "@velora",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <Nav />
              <main className="">
                {children}
              </main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </body> 
    </html>
  );
}
