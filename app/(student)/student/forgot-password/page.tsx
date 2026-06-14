"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      alert("Enter email ❌");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/student/reset-password",
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Reset link sent to email ✅");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="p-8 border rounded-xl w-[350px] space-y-4 bg-white shadow">

        <h1 className="text-xl font-bold text-center">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

      </div>
    </div>
  );
}