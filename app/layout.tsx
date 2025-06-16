import type { Metadata } from "next";
import { Bebas_Neue, Geist, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";


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
        className={`${geistSans.variable} antialiased font-IBM-Plex bg-[var(--basic-dark)]`}
      >
        {children}
      </body>
    </html>
  );
}
