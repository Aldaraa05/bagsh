import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
export default function Layout({ children }) {
  return (
    <html lang="en"> 
      <body>
        <Navbar />
        <main>{children}</main> 
        <Footer />
      </body>
    </html>
  );
}
