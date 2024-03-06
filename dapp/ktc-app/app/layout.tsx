import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({ subsets: ['latin'], weight: "400" });

export const metadata: Metadata = {
  title: "KitCat",
  description: "A cat token",
  icons: [
    {
      url: 'images/cat.png',
      href: 'images/cat.png',
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>{children}</body>
    </html>
  );
}
