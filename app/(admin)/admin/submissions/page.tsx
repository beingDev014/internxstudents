"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("student_email", user.email)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.log(error);
      }

      setNotifications(data || []);
    } catch (err) {
      console.log("Notification error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Loading Notifications...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          🔔 Notifications
        </h1>

        <p className="text-gray-500 mt-2">
          Stay updated with your internship activity
        </p>

      </div>


      {/* EMPTY */}

      {notifications.length === 0 && (
        <div className="bg-white p-6 rounded-2xl shadow text-center">

          <h2 className="font-semibold text-lg">
            No Notifications
          </h2>

          <p className="text-gray-500 mt-2">
            You're all caught up 🚀
          </p>

        </div>
      )}


      {/* LIST */}

      <div className="space-y-4">

        {notifications.map((item) => (

          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
          >

            <div className="flex justify-between items-start">

              <div>

                <h2 className="font-bold text-lg">
                  {item.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {item.message}
                </p>

              </div>

              <span className="text-xs text-gray-400">
                {new Date(
                  item.created_at
                ).toLocaleDateString()}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}