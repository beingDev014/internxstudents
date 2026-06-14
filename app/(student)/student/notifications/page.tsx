"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("student_email", user.email)
      .order("created_at", { ascending: false });

    setNotifications(data || []);
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        🔔 Notifications
      </h1>

      <div className="space-y-4">

        {notifications.length === 0 && (
          <div className="bg-white p-5 rounded-xl shadow">
            No notifications
          </div>
        )}

        {notifications.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <h2 className="font-bold">
              {item.title}
            </h2>

            <p className="text-gray-500 mt-2">
              {item.message}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}