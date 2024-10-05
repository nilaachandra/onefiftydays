import type { Metadata } from "next";
import "./globals.css";
import { Bellota } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "sonner";

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
        <body className="max-w-[778px] bg-[#ede] mx-auto w-full min-h-screen px-4 pb-4">
          <Navbar />
          {children}
          <Footer />
          <Toaster position="top-center" richColors/>
        </body>
      </html>
    </ViewTransitions>
  );
}
