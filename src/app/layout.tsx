import Nav from "@/components/nav";
import Footer from "@/components/footer";
import StoreProvider from "./StoreProvider";
import localFont from "next/font/local";
import { Jost } from 'next/font/google';
import type { Metadata } from "next";
import "./globals.css";

const jost = Jost({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Ecommock",
  description: "A web-based application simulating an e-commerce platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jost.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <Nav />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
