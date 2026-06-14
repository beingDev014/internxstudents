"use client";

import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { format } from "date-fns";
import emailjs from "@emailjs/browser";

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsLoading(true);

    const { data } = await supabase
      .from("students_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setApplications(data);
    setIsLoading(false);
  };

  // ✅ APPROVE
  const handleApprove = async (app: any) => {
    setActionLoading(app.id);

    try {
      const { error } = await supabase
        .from("students_applications")
        .update({ status: "approved" })
        .eq("id", app.id);

      if (error) {
        alert("Approval failed ❌");
        return;
      }

      const res = await fetch("/api/generate-offer-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: app.full_name,
          email: app.email,
          domain: app.domain,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Approved & Offer Letter Generated ✅");

        await emailjs.send(
          "service_oc2flal",
          "template_4ql9hka",
          {
            name: app.full_name,
            link: data.url,
            email: app.email,
          },
          "7xGcysJjYHd89b6PA"
        );
      }

      fetchApplications();

    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }

    setActionLoading(null);
  };

  // ❌ REJECT
  const handleReject = async (app: any) => {
    setActionLoading(app.id);

    await supabase
      .from("students_applications")
      .update({ status: "rejected" })
      .eq("id", app.id);

    fetchApplications();
    setActionLoading(null);
  };

  const filteredApps = applications.filter(
    (app) =>
      app.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      app.domain?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      <div>
        <h1 className="text-4xl font-bold mb-2">Applications</h1>
        <p className="text-muted-foreground">
          Manage student applications
        </p>
      </div>

      <div className="p-6 border rounded-3xl">

        {/* SEARCH */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or domain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border pl-10 p-2 rounded-lg"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ) : (
          <table className="w-full text-left">

            <thead>
              <tr className="border-b">
                <th>Name</th>
                <th>Domain</th>
                <th>Date</th>
                <th>Status</th>
                <th>Offer</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredApps.map((app) => (
                <tr key={app.id} className="border-b">

                  <td>
                    <p className="font-semibold">{app.full_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {app.email}
                    </p>
                  </td>

                  <td>{app.domain}</td>

                  <td>{format(new Date(app.created_at), "MMM d, yyyy")}</td>

                  <td>
                    <span className={`px-2 py-1 rounded text-xs ${
                      app.status === "approved"
                        ? "bg-green-100 text-green-600"
                        : app.status === "rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {app.status}
                    </span>
                  </td>

                  {/* OFFER */}
                  <td>
                    {app.offer_letter_url ? (
                      <a
                        href={app.offer_letter_url}
                        target="_blank"
                        className="text-blue-500 underline"
                      >
                        View Offer
                      </a>
                    ) : (
                      <span className="text-gray-400">No Offer</span>
                    )}
                  </td>

                  {/* 🚀 ACTION COLUMN */}
                  <td className="space-x-2">

                    {actionLoading === app.id ? (
                      <Loader2 className="animate-spin inline" />
                    ) : (
                      <>
                        {/* 👁 VIEW RESUME (✅ FIXED) */}
                        {app.resume_link ? (
                          <a
                            href={app.resume_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-blue-500 text-white rounded"
                          >
                            View
                          </a>
                        ) : (
                          <span className="px-3 py-1 bg-gray-300 text-gray-600 rounded text-sm">
                            No Resume
                          </span>
                        )}

                        {/* STATUS ACTION */}
                        {app.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(app)}
                              className="px-3 py-1 bg-green-500 text-white rounded"
                            >
                              Approve
                            </button>

                            <button
                              onClick={() => handleReject(app)}
                              className="px-3 py-1 bg-red-500 text-white rounded"
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {app.status === "approved" && (
                          <span className="px-3 py-1 bg-green-100 text-green-600 rounded text-sm">
                            ✔ Approved
                          </span>
                        )}

                        {app.status === "rejected" && (
                          <span className="px-3 py-1 bg-red-100 text-red-600 rounded text-sm">
                            Rejected
                          </span>
                        )}
                      </>
                    )}

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