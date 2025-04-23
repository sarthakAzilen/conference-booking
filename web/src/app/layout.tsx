"use client";

// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClientProvider } from "react-query";
import queryClient from "./queryClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Funky Conference Booking",
//   description: "A funky and fun conference booking experience",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white`}
        >
          <header className="text-center bg-opacity-50"></header>
          <main className="">{children}</main>
          <footer className=" text-center bg-opacity-50">
            <p className="text-sm">
              © 2023 Funky Booking. All rights reserved.
            </p>
          </footer>
        </body>
      </html>
    </QueryClientProvider>
  );
}
