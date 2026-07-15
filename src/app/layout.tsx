import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TrailNest | Discover Curated Travel Experiences",
  description: "Book unique tours and travel experiences around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="trailnest" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
