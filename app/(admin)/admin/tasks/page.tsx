"use client";

import { useState, useEffect } from "react";
import { Search, FileSignature, Loader2, Plus } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import emailjs from "@emailjs/browser";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // 🆕 NEW TASK STATES
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    fetchApprovedTasks();
  }, []);

  const fetchApprovedTasks = async () => {
    setIsLoading(true);

    const { data } = await supabase
      .from("students_applications")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (data) {
      const mappedTasks = data.map((candidate) => ({
        ...candidate,
        offer_id: `OFF-${candidate.id.split("-")[0].toUpperCase()}`,
      }));

      setTasks(mappedTasks);
    }

    setIsLoading(false);
  };

  // 🆕 CREATE TASK (NEW FEATURE)
  const createTask = async () => {
    if (!title) return alert("Enter task title ❌");

    const { error } = await supabase.from("tasks").insert([
      {
        title,
        description: desc,
      },
    ]);

    if (error) {
      alert("Task creation failed ❌");
    } else {
      alert("Task created ✅");
      setTitle("");
      setDesc("");
    }
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      task.email?.toLowerCase().includes(search.toLowerCase()) ||
      task.offer_id?.toLowerCase().includes(search.toLowerCase())
  );

  // 🚀 EXISTING FUNCTION (UNCHANGED)
  const handleApproveTasks = async (task: any) => {
    setActionLoading(task.id);

    try {
      const res = await fetch("/api/generate-certificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: task.full_name,
          email: task.email,
          domain: task.domain,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Certificate generation failed ❌");
        setActionLoading(null);
        return;
      }

      if (!task.email) {
        alert("Email missing ❌");
        setActionLoading(null);
        return;
      }

      await emailjs.send(
        "service_oc2flal",
        "template_1923msl",
        {
          to_name: task.full_name,
          to_email: task.email,
          certificate_link: data.url,
          certificate_id: data.certId,
        },
        "7xGcysJjYHd89b6PA"
      );

      await supabase
        .from("students_applications")
        .update({ status: "completed" })
        .eq("id", task.id);

      alert("✅ Certificate Sent 🎉");
      fetchApprovedTasks();

    } catch (err) {
      alert("Something went wrong ❌");
    }

    setActionLoading(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* 🆕 CREATE TASK UI */}
      <div className="p-6 border rounded-2xl bg-white shadow">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Plus /> Create Task
        </h2>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <textarea
          placeholder="Task Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full border p-2 mb-3 rounded"
        />

        <button
          onClick={createTask}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create Task
        </button>
      </div>

      {/* EXISTING UI */}
      <div>
        <h1 className="text-3xl font-bold mb-4">
          Completion Verifications
        </h1>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />
      </div>

      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredTasks.map((task) => (
            <div key={task.id} className="p-6 border rounded-xl">

              <h3 className="font-bold">{task.full_name}</h3>
              <p className="text-sm">{task.email}</p>

              <button
                onClick={() => handleApproveTasks(task)}
                disabled={actionLoading === task.id}
                className="bg-black text-white px-4 py-2 mt-4 w-full"
              >
                {actionLoading === task.id ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Approve & Send Certificate"
                )}
              </button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}