import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s - Installment Cart",
    default: "Installment Cart",
  },
  description:
    "Installment Cart is a Online Shopping market place where you can buy almost every thing available in the market on easy monthly or even weekly installments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
