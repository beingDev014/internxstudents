"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import StudentSidebar from "@/components/student/StudentSidebar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // ✅ Public student pages (no auth required)
        const publicRoutes = [
          "/student/login",
          "/student/forgot-password",
          "/student/reset-password",
        ];

        if (publicRoutes.includes(pathname)) {
          setLoading(false);
          return;
        }

        // ✅ Check auth for protected pages
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.replace("/student/login");
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log("Auth Error:", error);
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Loading...
        </p>
      </div>
    );
  }

  // ✅ Hide sidebar on login/reset pages
  const hideSidebar = [
    "/student/login",
    "/student/forgot-password",
    "/student/reset-password",
  ].includes(pathname);

  return (
    <div className="flex min-h-screen">

      {!hideSidebar && (
        <div className="w-64 flex-shrink-0">
          <StudentSidebar />
        </div>
      )}

      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}