'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import TrustBar from "@/components/sections/TrustBar";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    // Admin pages handle their own layout/nav
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>
        {children}
        <TrustBar />
      </main>
      <BottomNav />
      <Footer />
    </>
  );
}
