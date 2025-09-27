import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { RootProvider } from "./context/createContext";

import Navbar from "./components/Navigation/Navbar";  //footer
import Footer2 from "./components/Footer/Footer";   //navbar

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
   
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans">
        <Navbar />
        <RootProvider>
        <main className="w-full min-h-screen">{children}</main>
        </RootProvider>
        <Footer2 />
      </body>
    </html>
  );
}


