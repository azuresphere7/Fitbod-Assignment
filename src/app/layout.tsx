import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Top Exercise",
  description: "Fitbod Assignment, created by Dustin Lee.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <section>{children}</section>
        <Footer />
      </body>
    </html>
  );
}
