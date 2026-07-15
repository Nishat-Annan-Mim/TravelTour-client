import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "TrailNest | Discover Curated Travel Experiences",
  description: "Book unique tours and travel experiences around the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="trailnest">
      <body className="flex flex-col min-h-screen">
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
