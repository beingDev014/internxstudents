"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ResetPassword() {
  const [password, setPassword] = useState("");

  const handleUpdate = async () => {
    if (!password) {
      alert("Enter new password ❌");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Password updated successfully ✅");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="p-8 border rounded-xl w-[350px] space-y-4 bg-white shadow">

        <h1 className="text-xl font-bold text-center">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleUpdate}
          className="w-full bg-black text-white py-2 rounded"
        >
          Update Password
        </button>

      </div>
    </div>
  );
}