import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { NewsProvider } from "@/providers/NewsProvider";
import BackToTop from "@/components/ui/BackToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "News Aggregator - Leading News Platform",
  description: "News Aggregator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-gray-100">
          <NewsProvider>
            <Header />
            {children}
          </NewsProvider>
        </div>
        <BackToTop />
        <footer className="row-start-3 py-3 flex gap-6 flex-wrap items-center justify-center text-sm bg-white">
          Copyright @news-aggerator 2025
        </footer>
      </body>
    </html>
  );
}
