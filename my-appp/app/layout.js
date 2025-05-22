'use client';

import { usePathname } from 'next/navigation';
import "./globals.css";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
export default function Layout({ children }) {
  const pathName = usePathname();

  const page = pathName === '/Signin' || pathName === '/Signup' || pathName === '/songolt' || pathName === '/student-signup' 
  const page2 = pathName === '/Checkout/success' || pathName === '/Signin' || pathName === '/Signup' || pathName === '/songolt' || pathName === '/student-signup' 
  || pathName === '/Info' || pathName === '/basket' || pathName === '/Checkout'
  return (
    <html lang="en"> 
      <body>
        {!page && <Navbar />}
        {children}
        {!page2 && <Footer />}
      </body>
    </html>
  );
}
