import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SakuraPetals } from "@/components/SakuraPetals";
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
  title: "Poems of Love",
  description: "A heartfelt collection of poems expressing the depths of love, devotion, and eternal affection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-black">
        <SakuraPetals />
        {children}
      </body>
    </html>
  );
}
