"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminHelpPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  // FETCH TICKETS
  const fetchTickets = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("help_tickets")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.log("Fetch Error:", error);
        alert(error.message);
        return;
      }

      console.log("Fetched Tickets:", data);

      setTickets(data || []);

    } catch (err) {
      console.log("Unexpected Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // RESOLVE TICKET
  const resolveTicket = async (id: string) => {
    try {
      const { error } = await supabase
        .from("help_tickets")
        .update({
          status: "resolved",
        })
        .eq("id", id);

      if (error) {
        console.log("Resolve Error:", error);
        alert(error.message);
        return;
      }

      alert("Ticket resolved ✅");

      fetchTickets();

    } catch (err) {
      console.log(err);
    }
  };

  // DELETE TICKET
  const deleteTicket = async (id: string) => {
    try {

      const confirmDelete =
        confirm(
          "Delete this ticket?"
        );

      if (!confirmDelete) return;

      const { error } = await supabase
        .from("help_tickets")
        .delete()
        .eq("id", id);

      if (error) {
        console.log("Delete Error:", error);
        alert(error.message);
        return;
      }

      alert("Ticket deleted ✅");

      fetchTickets();

    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading Tickets...</p>
      </div>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Help Tickets 💬
      </h1>

      {tickets.length === 0 && (
        <div className="bg-white p-6 rounded-xl shadow">
          No tickets available ❌
        </div>
      )}

      <div className="space-y-5">

        {tickets.map((item) => (

          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow"
          >

            <div className="flex justify-between">

              <div>

                <p className="font-bold">
                  {item.student_email}
                </p>

                <h2 className="text-xl mt-2">
                  {item.subject}
                </h2>

                <p className="text-gray-500 mt-2">
                  {item.message}
                </p>

              </div>

              <span
                className={`px-3 py-1 rounded-full h-fit text-sm ${
                  item.status === "resolved"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.status}
              </span>

            </div>

            <div className="flex gap-3 mt-4">

              {item.status !== "resolved" && (
                <button
                  onClick={() =>
                    resolveTicket(item.id)
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Resolve
                </button>
              )}

              <button
                onClick={() =>
                  deleteTicket(item.id)
                }
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}