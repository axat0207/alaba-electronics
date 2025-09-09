import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Alaba Electronics Hub - Electronics & Office Equipment",
  description: "Your trusted partner for quality electronics and office equipment in Alaba International Market. POS systems, computers, printers, and more.",
  keywords: "electronics, office equipment, POS systems, computers, printers, Alaba market, Lagos, Nigeria",
  authors: [{ name: "Alaba Electronics Hub" }],
  openGraph: {
    title: "Alaba Electronics Hub - Electronics & Office Equipment",
    description: "Your trusted partner for quality electronics and office equipment in Alaba International Market.",
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
