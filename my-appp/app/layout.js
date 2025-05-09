'use client';

import { usePathname } from 'next/navigation';
import "./globals.css";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from './providers';
export default function Layout({ children }) {
  const pathName = usePathname();

  const page = pathName === '/Signin' || pathName === '/Signup' || pathName === '/songolt' || pathName === '/student-signup' 
  || pathName === '/Info'
  return (
    <html lang="en"> 
      <body>
        <Providers>
        {!page && <Navbar />}
        {children}
        {!page && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
