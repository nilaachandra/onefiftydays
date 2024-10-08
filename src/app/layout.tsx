import type { Metadata } from "next";
import "./globals.css";
import { Bellota } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import QueryProvider from "./_provider";

const bellota = Bellota({ subsets: ["latin"], weight: ["700"] });

export const metadata: Metadata = {
  title: "One Fifty Days",
  description: "My personal journal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${bellota.className} antialiased`}>
        <body className={cn(`bg-[#fae3cf] min-h-screen scroll-smooth`)}>
          <QueryProvider>
            <div className="w-full max-w-[778px] mx-auto px-4 py-2">
              <Navbar />
              {children}
              <Footer />
              <Toaster position="top-center" richColors />
            </div>
          </QueryProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
