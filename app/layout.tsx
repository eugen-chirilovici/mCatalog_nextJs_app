import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ProductContextProvider } from "@/context/ProductContext";
import ToastWrapper from "@/components/home/ToastWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sport Club E-Commerce",
  description: "Discover modern quality craftsmanship and design.",
};

export default function RootLayout({ children, modal }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
        <ProductContextProvider>
          <Header />
          <main className="flex-grow flex flex-col">{children}</main>
          {modal}
          <Footer />
          <ToastWrapper />
        </ProductContextProvider>
      </body>
    </html>
  );
}