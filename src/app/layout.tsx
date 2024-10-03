import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Bellota } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

const bellota = Bellota({ subsets: ["latin"], weight: ["700"] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
    <html lang="en" className={`${bellota.className} antialiased`}>
      <body className="max-w-[712px] mx-auto w-full min-h-screen px-4 pb-4">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
