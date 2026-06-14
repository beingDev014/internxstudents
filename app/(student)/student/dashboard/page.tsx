"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [taskCount, setTaskCount] = useState(0);
  const [certificateCount, setCertificateCount] = useState(0);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const { data, error } =
        await supabase.auth.getUser();

      if (error || !data.user) {
        router.replace("/student/login");
        return;
      }

      const currentUser = data.user;

      setUser(currentUser);

      // 🔥 Total Tasks
      const { count: tasks } =
        await supabase
          .from("tasks")
          .select("*", {
            count: "exact",
            head: true,
          });

      // 🔥 Certificates
      const { count: certs } =
        await supabase
          .from("students_applications")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq(
            "email",
            currentUser.email
          )
          .not(
            "certificate_url",
            "is",
            null
          );

      setTaskCount(tasks || 0);
      setCertificateCount(certs || 0);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const progress =
    taskCount > 0
      ? Math.round(
          (certificateCount /
            taskCount) *
            100
        )
      : 0;

  const pending =
    taskCount - certificateCount;

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 rounded-2xl mb-8 flex justify-between items-center shadow-lg">

        <div>
          <h1 className="text-3xl font-bold">
            Welcome back 👋
          </h1>

          <p className="opacity-90 mt-2">
            Track your internship journey
          </p>
        </div>

        <div className="bg-white/20 p-4 rounded-xl">
          <p className="font-medium">
            {user?.email}
          </p>

          <p className="text-sm opacity-80">
            Student
          </p>
        </div>

      </div>


      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <p className="text-gray-500">
            Total Tasks
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {taskCount}
          </h2>
        </div>


        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <p className="text-gray-500">
            Completed
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-500">
            {certificateCount}
          </h2>
        </div>


        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
          <p className="text-gray-500">
            Pending
          </p>

          <h2 className="text-3xl font-bold mt-2 text-orange-500">
            {pending}
          </h2>
        </div>


        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">

          <p className="text-gray-500">
            Progress
          </p>

          <div className="w-full h-3 bg-gray-200 rounded-full mt-4 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <p className="mt-3 font-semibold">
            {progress}% completed
          </p>

        </div>

      </div>


      {/* QUICK ACTIONS */}

      <div className="bg-white p-6 rounded-2xl shadow">

        <h2 className="font-bold text-xl mb-5">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <button
            onClick={() =>
              router.push(
                "/student/tasks"
              )
            }
            className="bg-indigo-500 text-white p-4 rounded-xl hover:bg-indigo-600"
          >
            📋 View Tasks
          </button>

          <button
            onClick={() =>
              router.push(
                "/student/profile"
              )
            }
            className="bg-purple-500 text-white p-4 rounded-xl hover:bg-purple-600"
          >
            👤 Profile
          </button>

          <button
            className="bg-green-500 text-white p-4 rounded-xl hover:bg-green-600"
          >
            🎓 Certificates
          </button>

        </div>

      </div>

    </div>
  );
}