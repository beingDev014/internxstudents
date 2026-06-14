"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 dark:opacity-40 pointer-events-none rounded-full blur-[120px] bg-gradient-to-b from-indigo-500/50 via-purple-500/20 to-transparent z-[-1]" />

      <Navbar />
      <main className="flex-1 flex flex-col mt-20">{children}</main>
      <Footer />

    </div>
  );
}