import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/store/cart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Velarte by Cain | Velas de soja artesanales hechas a mano",
  description: "Descubre nuestra colección boutique de velas de soja naturales y wax melts artesanales. Aromas premium diseñados para crear momentos que se sientan en tu hogar.",
  keywords: ["velas de soja", "velas artesanales", "wax melts", "decoración hogar", "aromas naturales", "hecho a mano", "velas perfumadas"],
  authors: [{ name: "Velarte by Cain" }],
  openGraph: {
    title: "Velarte by Cain | Velas de soja artesanales",
    description: "Velas de soja naturales y wax melts hechos a mano con fragancias premium.",
    url: "https://velartebycain.com",
    siteName: "Velarte by Cain",
    images: [
      {
        url: "/images/sundain/velas-encabezado.png",
        width: 1200,
        height: 630,
        alt: "Colección Velarte by Cain",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velarte by Cain | Velas de soja artesanales",
    description: "Velas de soja naturales y wax melts hechos a mano con fragancias premium.",
    images: ["/images/sundain/velas-encabezado.png"],
  },
  icons: {
    icon: '/Logo_velarte_transparente-removebg-preview.png',
    apple: '/Logo_velarte_transparente-removebg-preview.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <CartProvider>
          <Navbar />
          <div className="pt-24 md:pt-28">
            <main className="flex-grow">
              {children}
            </main>
          </div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
