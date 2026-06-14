"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, Search } from "lucide-react";

export default function HistoryPage() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("students_applications")
      .select("*")
      .in("status", ["completed", "rejected"]) // 🔥 ONLY THESE
      .order("created_at", { ascending: false });

    if (data) setData(data);

    setLoading(false);
  };

  const filtered = data.filter(
    (item) =>
      item.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      item.domain?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold mb-2">History</h1>
        <p className="text-muted-foreground">
          Completed and rejected applications
        </p>
      </div>

      {/* SEARCH */}
      <div className="p-6 border rounded-3xl">
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search name or domain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border pl-10 p-2 rounded-lg"
          />
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3">Name</th>
                <th>Domain</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-3">
                    <p className="font-semibold">{item.full_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.email}
                    </p>
                  </td>

                  <td>{item.domain}</td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}