import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { RootProvider } from "./context/createContext";
import Navbar from "./Components/Navigation/Navbar";
import Footer from "./Components/Footer/Footer";
import ThemeProvider from "./context/themeProvider";
import ChatBot from "./Components/Chatbot/ChatBot";





const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
   
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans">
        <ThemeProvider>
        <RootProvider>
        <Navbar />
        <main className="w-full min-h-screen">{children}</main>
        <ChatBot />
        <Footer />
        </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


