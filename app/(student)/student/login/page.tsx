"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function StudentLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);

  // ✅ Redirect ONLY if already logged in
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.replace("/student/dashboard");
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email and password ❌");
      return;
    }

    setLoggingIn(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoggingIn(false);
    } else {
      router.replace("/student/dashboard");
    }
  };

  // 🔄 Loader before auth check
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Checking session...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-[350px] space-y-4">

        <h1 className="text-2xl font-bold text-center">
          Student Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loggingIn}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loggingIn ? "Logging in..." : "Login"}
        </button>

        <p
          onClick={() => router.push("/student/forgot-password")}
          className="text-sm text-blue-500 text-center cursor-pointer hover:underline"
        >
          Forgot Password?
        </p>

      </div>
    </div>
  );
}