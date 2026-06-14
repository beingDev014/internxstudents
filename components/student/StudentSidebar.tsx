"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  BookOpen,
  Award,
  HelpCircle,
  User,
  LogOut,
  Bell,
  BarChart3,
} from "lucide-react";

import { supabase } from "@/lib/supabaseClient";

export default function StudentSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  // 🔥 Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();

    localStorage.clear();
    sessionStorage.clear();

    window.location.href = "/";
  };

  const menu = [
    {
      label: "Dashboard",
      path: "/student/dashboard",
      icon: LayoutDashboard,
    },

    {
      label: "My Tasks",
      path: "/student/tasks",
      icon: CheckSquare,
    },

    {
      label: "Progress",
      path: "/student/progress",
      icon: BarChart3,
    },

    {
      label: "Notifications",
      path: "/student/notifications",
      icon: Bell,
    },

    {
      label: "Courses",
      path: "#",
      icon: BookOpen,
    },

    {
      label: "Certificates",
      path: "/student/certificates",
      icon: Award,
    },

    {
      label: "Help Desk",
      path: "/student/help",
      icon: HelpCircle,
    },

    {
      label: "Profile",
      path: "/student/profile",
      icon: User,
    },
  ];

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-black to-gray-900 text-white p-6 flex flex-col justify-between shadow-xl">

      <div>

        {/* LOGO */}

        <div className="mb-8">

          <h2 className="text-2xl font-bold tracking-tight">
            InternX
          </h2>

          <p className="text-xs text-gray-400">
            Student Portal
          </p>

        </div>

        {/* MENU */}

        <ul className="space-y-2">

          {menu.map((item) => {

            const active =
              pathname === item.path;

            const Icon = item.icon;

            return (
              <li
                key={item.label}
                onClick={() =>
                  item.path !== "#" &&
                  router.push(item.path)
                }
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300

                ${
                  active
                    ? "bg-white text-black font-medium shadow"
                    : "text-gray-300 hover:bg-gray-800"
                }
                `}
              >
                <Icon className="w-5 h-5" />

                <span>
                  {item.label}
                </span>

              </li>
            );
          })}

        </ul>

      </div>

      {/* LOGOUT */}

      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl transition"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>

    </aside>
  );
}