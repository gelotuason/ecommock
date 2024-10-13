import Nav from "@/components/nav/nav";
import Footer from "@/components/footer";
import StoreProvider from "./StoreProvider";
import ToastWrapper from "./ToastWrapper";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster"
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
  auth
}: {
  children: React.ReactNode
  auth: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${jost.className} ${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-full bg-background`}
      >
        <StoreProvider>
          <ToastWrapper>
            <Nav />
            {children}
            {auth}
            <Footer />
            <Toaster />
          </ToastWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
