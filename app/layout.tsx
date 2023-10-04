import { Navbar } from "@/components";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ReactNode } from "react";
const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title: "Pricewise - Web Scraper",
  description:
    "Track product prices effortlessly and sav emoney on your online shopping",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-10xl mx-auto">
          <Navbar/>
          {children}</main>
      </body>
    </html>
  );
};
export default RootLayout;
