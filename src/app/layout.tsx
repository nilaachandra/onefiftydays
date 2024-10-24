import type { Metadata } from "next";
import "./globals.css";
import { Bellota } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";
import QueryProvider from "./_provider";
import dynamic from "next/dynamic";
import { PostHogWrapper } from "./PostHogWrapper";
import ProgressBarWrapper from "./ProgressBarWrapper";

const bellota = Bellota({ subsets: ["latin"], weight: ["700"] });

export const metadata: Metadata = {
  title: "One Fifty Days",
  description: "My personal journal",
};

const PostHogPageView = dynamic(() => import("@/app/PostHogPageView"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${bellota.className} antialiased`}>
        <PostHogWrapper>
          <body className={cn(`bg-[#fae3cf] min-h-screen scroll-smooth`)}>
            <QueryProvider>
              <PostHogPageView />
              <ProgressBarWrapper>
                <div className="w-full max-w-[778px] mx-auto px-4 py-2">
                  <Navbar />
                  {children}
                  <Footer />
                  <Toaster position="top-center" richColors />
                </div>
              </ProgressBarWrapper>
            </QueryProvider>
          </body>
        </PostHogWrapper>
      </html>
    </ViewTransitions>
  );
}
