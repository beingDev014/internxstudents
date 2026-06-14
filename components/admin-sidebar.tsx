"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  CheckSquare,
  Award,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Settings,
  Clock,
  FolderOpen,
  HelpCircle,
} from "lucide-react";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    href: "/admin",
  },

  {
    icon: Users,
    label: "Applications",
    href: "/admin/applications",
  },

  {
    icon: FileText,
    label: "Offer Letters",
    href: "/admin/offer-letters",
  },

  {
    icon: CheckSquare,
    label: "Tasks",
    href: "/admin/tasks",
  },

  {
    icon: FolderOpen,
    label: "Submissions",
    href: "/admin/submissions",
  },

  {
    icon: HelpCircle,
    label: "Help Tickets",
    href: "/admin/help",
  },

  {
    icon: Award,
    label: "Certificates",
    href: "/admin/certificates",
  },

  {
    icon: Clock,
    label: "History",
    href: "/admin/history",
  },

  {
    icon: Settings,
    label: "Settings",
    href: "/admin/settings",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    sessionStorage.removeItem("admin_auth");
    localStorage.clear();

    window.location.href = "/admin/login";
  };

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 bg-secondary/30 border-r border-border transition-all duration-300 flex flex-col z-50",
        collapsed ? "w-[80px]" : "w-[260px]"
      )}
    >

      {/* HEADER */}

      <div className="p-6 flex items-center justify-between border-b border-border">

        {!collapsed ? (
          <Link
            href="/admin"
            className="flex items-center gap-2"
          >

            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-md">

              <Sparkles className="w-4 h-4" />

            </div>

            <span className="font-bold tracking-tight">

              InternX
              <span className="text-primary">
                {" "}Admin
              </span>

            </span>

          </Link>
        ) : (

          <Link
            href="/admin"
            className="mx-auto w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-md"
          >
            <Sparkles className="w-4 h-4" />
          </Link>

        )}

      </div>


      {/* COLLAPSE */}

      <button
        onClick={() =>
          setCollapsed(!collapsed)
        }
        className="absolute -right-4 top-8 w-8 h-8 bg-background rounded-full border border-border flex items-center justify-center shadow"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>


      {/* MENU */}

      <div className="flex-1 py-8 px-3 flex flex-col gap-2 overflow-y-auto">

        {menuItems.map((item) => {

          const isActive =
            pathname === item.href ||
            pathname.startsWith(
              item.href + "/"
            );

          return (

            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative",

                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >

              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
              )}

              <item.icon
                className="w-5 h-5 flex-shrink-0"
              />

              {!collapsed && (
                <span>
                  {item.label}
                </span>
              )}

            </Link>

          );
        })}

      </div>


      {/* LOGOUT */}

      <div className="p-4 border-t border-border">

        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-100 transition",
            collapsed &&
              "justify-center"
          )}
        >

          <LogOut className="w-5 h-5" />

          {!collapsed && (
            <span>
              Logout
            </span>
          )}

        </button>

      </div>

    </aside>
  );
}