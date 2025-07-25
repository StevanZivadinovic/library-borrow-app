import type { Metadata } from "next";
import {  Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LibraryBorrowBook",
  description: "Web application for borrowing books from a library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased font-IBM-Plex bg-[var(--basic-dark)] text-white`}
      >
        <SessionProvider>
        {children}
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
