import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { RootProvider } from "./context/createContext";
import Navbar from "./Components/Navigation/Navbar";
import Footer from "./Components/Footer/Footer";
import { ThemeProvider } from "../components/themes/theme-provider";





const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
   
    <html lang="en"  suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <RootProvider>
        <Navbar />
        <main className="w-full min-h-screen">{children}</main>
        <Footer />
        </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


