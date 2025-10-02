import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { RootProvider } from "./context/createContext";
import Navbar from "./Components/Navigation/Navbar";
import Footer2 from "./Components/Footer/Footer";



const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
   
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans">
        <RootProvider>
        <Navbar />
        <main className="w-full min-h-screen">{children}</main>
        <Footer2 />
        </RootProvider>
      </body>
    </html>
  );
}


