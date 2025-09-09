import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CVentures - Electronics & Office Equipment",
  description: "Your trusted partner for quality electronics and office equipment. POS systems, computers, printers, and more from emerging businesses.",
  keywords: "electronics, office equipment, POS systems, computers, printers, emerging businesses, Nigeria",
  authors: [{ name: "CVentures" }],
  openGraph: {
    title: "CVentures - Electronics & Office Equipment",
    description: "Your trusted partner for quality electronics and office equipment from emerging businesses.",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
