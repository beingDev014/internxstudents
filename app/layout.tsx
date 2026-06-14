import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "InternX | Premium Tech Internships",
  description:
    "Join the top EdTech platform providing real-world internships in Data Science, AI, Web Dev, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* ✅ NAVBAR */}
          <Navbar />

          {/* ✅ MAIN CONTENT */}
          <main className="mt-20 min-h-screen">
            {children}
          </main>

          {/* ✅ FOOTER */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}