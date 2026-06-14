"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, LogOut } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Internships", href: "/internships" },
  { name: "Services", href: "/services" },
  { name: "Verify", href: "/verify" },
  { name: "Contact", href: "/contact" },
  { name: "Admin", href: "/admin/login" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [user, setUser] = useState<any>(null);

  // 🔥 Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  // 🔥 Safe auth check
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } =
          await supabase.auth.getUser();

        if (!error) {
          setUser(data.user || null);
        }
      } catch (err) {
        console.log("Auth error:", err);
      }
    };

    getUser();

    // 🔥 Auto update auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // 🔥 Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();

    window.location.href = "/";
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-3" : "py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">

        <div
          className={cn(
            "flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300",
            isScrolled
              ? "bg-white shadow-lg"
              : "bg-white/30 backdrop-blur-md"
          )}
        >

          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>

            <span className="font-bold text-lg">
              InternX
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-3">

            {navLinks.map((link) => {

              const active =
                pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm transition",

                    active
                      ? "bg-indigo-100 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            <ThemeToggle />

            {user ? (
              <>
                <Link
                  href="/student/dashboard"
                  className="hidden md:inline-flex bg-indigo-600 text-white px-5 py-2 rounded-full text-sm"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center gap-2 text-red-500"
                >
                  <LogOut className="w-4 h-4"/>
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/student/login"
                className="hidden md:inline-flex bg-black text-white px-5 py-2 rounded-full text-sm"
              >
                Login
              </Link>
            )}

            <Link
              href="/apply"
              className="hidden md:inline-flex border px-5 py-2 rounded-full text-sm hover:bg-gray-100"
            >
              Apply
            </Link>

            {/* MOBILE BUTTON */}
            <button
              className="md:hidden"
              onClick={() =>
                setMobileMenuOpen(
                  !mobileMenuOpen
                )
              }
            >
              {mobileMenuOpen ? (
                <X />
              ) : (
                <Menu />
              )}
            </button>

          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (

            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="bg-white shadow-lg rounded-xl mt-2 p-4 flex flex-col gap-2 md:hidden"
            >

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="py-2 px-3 rounded hover:bg-gray-100"
                >
                  {link.name}
                </Link>
              ))}

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
}