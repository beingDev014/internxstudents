"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function StudentTasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [inputs, setInputs] = useState<any>({}); // ✅ per-task inputs
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await fetchTasks();
    await fetchSubmissions();
    setLoading(false);
  };

  const fetchTasks = async () => {
    const { data } = await supabase.from("tasks").select("*");
    if (data) setTasks(data);
  };

  const fetchSubmissions = async () => {
    const user = await supabase.auth.getUser();

    if (!user.data.user) return;

    const { data } = await supabase
      .from("submissions")
      .select("*")
      .eq("student_email", user.data.user.email);

    if (data) setSubmissions(data);
  };

  const handleChange = (taskId: string, field: string, value: any) => {
    setInputs((prev: any) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (taskId: string) => {
    const input = inputs[taskId] || {};
    const file = input.file;
    const github = input.github;

    if (!file && !github) {
      return alert("Upload file or GitHub link ❌");
    }

    const user = await supabase.auth.getUser();
    if (!user.data.user) return;

    let fileUrl = "";

    try {
      if (file) {
        const fileName = `${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("task-submissions")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("task-submissions")
          .getPublicUrl(fileName);

        fileUrl = data.publicUrl;
      }

      const { error } = await supabase.from("submissions").insert([
        {
          student_email: user.data.user.email,
          task_id: taskId,
          file_url: fileUrl,
          github_link: github,
          status: "pending",
        },
      ]);

      if (error) throw error;

      alert("Submitted successfully ✅");

      // ✅ reset input
      setInputs((prev: any) => ({
        ...prev,
        [taskId]: {},
      }));

      fetchSubmissions();
    } catch (err: any) {
      alert("Submission failed ❌");
      console.log(err);
    }
  };

  const getStatus = (taskId: string) => {
    return submissions.find((s) => s.task_id === taskId);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="p-10 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">My Tasks</h1>

      {tasks.map((task) => {
        const submission = getStatus(task.id);
        const input = inputs[task.id] || {};

        return (
          <div key={task.id} className="bg-white p-6 rounded-xl shadow mb-6">

            <h2 className="text-xl font-semibold">{task.title}</h2>
            <p className="text-gray-600 mb-4">{task.description}</p>

            {/* STATUS */}
            {submission && (
              <p className="mb-3">
                Status:{" "}
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    submission.status === "approved"
                      ? "bg-green-100 text-green-600"
                      : submission.status === "rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {submission.status}
                </span>
              </p>
            )}

            {/* INPUTS */}
            {!submission && (
              <>
                <input
                  type="file"
                  onChange={(e) =>
                    handleChange(task.id, "file", e.target.files?.[0])
                  }
                  className="mb-3"
                />

                <input
                  type="text"
                  placeholder="GitHub link (optional)"
                  value={input.github || ""}
                  onChange={(e) =>
                    handleChange(task.id, "github", e.target.value)
                  }
                  className="w-full border p-2 rounded mb-3"
                />

                <button
                  onClick={() => handleSubmit(task.id)}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                  Submit Task
                </button>
              </>
            )}

          </div>
        );
      })}

    </div>
  );
}