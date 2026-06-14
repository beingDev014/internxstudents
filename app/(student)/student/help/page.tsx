"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function HelpPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const submitTicket = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login again ❌");
        return;
      }

      if (!subject || !message) {
        alert("Fill all fields ❌");
        return;
      }

      const { data, error } = await supabase
        .from("help_tickets")
        .insert([
          {
            student_email: user.email,
            subject,
            message,
          },
        ])
        .select();

      console.log("Inserted:", data);

      if (error) {
        console.log(error);
        alert(error.message);
        return;
      }

      alert("Ticket submitted successfully ✅");

      setSubject("");
      setMessage("");

    } catch (err) {
      console.log(err);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl">

      <h1 className="text-3xl font-bold mb-6">
        Help Desk 💬
      </h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-4">

        <input
          placeholder="Subject"
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value)
          }
          className="w-full border p-3 rounded-xl"
        />

        <textarea
          placeholder="Describe your issue..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          className="w-full border p-3 rounded-xl h-32"
        />

        <button
          onClick={submitTicket}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl disabled:opacity-50"
        >
          {loading
            ? "Submitting..."
            : "Submit Ticket"}
        </button>

      </div>

    </div>
  );
}