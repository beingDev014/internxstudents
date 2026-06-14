"use client";

import { useState, useRef, useEffect } from "react";
import { UploadCloud, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function OfferLettersPage() {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  // 🔥 FETCH TEMPLATES
  const fetchTemplates = async () => {
    console.log("📦 Fetching templates...");

    const { data, error } = await supabase
      .from("offer_templates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("FETCH ERROR:", error);
    }

    if (data) {
      console.log("✅ Templates:", data);
      setUploadedFiles(data);
    }
  };

  // 🔥 HANDLE UPLOAD
  const handleFile = async (file: File) => {
    try {
      if (!file.name.endsWith(".docx")) {
        alert("Upload only .docx file ❌");
        return;
      }

      const fileName = `${Date.now()}-${file.name}`;
      console.log("📤 Uploading:", fileName);

      // 1️⃣ UPLOAD
      const { error: uploadError } = await supabase.storage
        .from("offer-templates")
        .upload(fileName, file, { upsert: true });

      if (uploadError) {
        console.error("UPLOAD ERROR:", uploadError);
        alert("Upload failed ❌");
        return;
      }

      console.log("✅ Upload success");

      // 2️⃣ GET PUBLIC URL
      const { data } = supabase.storage
        .from("offer-templates")
        .getPublicUrl(fileName);

      const fileUrl = data.publicUrl;
      console.log("🔗 File URL:", fileUrl);

      // 3️⃣ INSERT INTO DB (VERY IMPORTANT 🔥)
      const { error: dbError } = await supabase
        .from("offer_templates")
        .insert([{ file_url: fileUrl }]);

      if (dbError) {
        console.error("DB ERROR:", dbError);
        alert("Saved failed ❌");
        return;
      }

      console.log("💾 Saved to DB");

      alert("Template uploaded & saved ✅");

      fetchTemplates();

    } catch (err) {
      console.error("FINAL ERROR:", err);
      alert("Something went wrong ❌");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = async (id: string) => {
    await supabase.from("offer_templates").delete().eq("id", id);
    fetchTemplates();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      <div>
        <h1 className="text-4xl font-bold mb-2">Offer Templates</h1>
        <p className="text-muted-foreground">
          Upload and manage templates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* UPLOAD */}
        <div className="p-8 border rounded-3xl flex flex-col items-center justify-center">

          <UploadCloud className="w-12 h-12 mb-4 text-primary" />

          <input
            ref={fileInputRef}
            type="file"
            accept=".docx"
            className="hidden"
            onChange={handleChange}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2 bg-primary text-white rounded"
          >
            Upload Template
          </button>

        </div>

        {/* LIST */}
        <div className="p-8 border rounded-3xl">

          <h3 className="text-xl font-bold mb-4">
            Active Templates
          </h3>

          <div className="space-y-3">

            {uploadedFiles.length === 0 && (
              <p className="text-muted-foreground">
                No templates uploaded yet ❌
              </p>
            )}

            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between border p-3 rounded"
              >
                <div>
                  <p className="font-semibold">Template</p>
                  <a
                    href={file.file_url}
                    target="_blank"
                    className="text-blue-500 text-sm"
                  >
                    View File
                  </a>
                </div>

                <button
                  onClick={() => removeFile(file.id)}
                  className="text-red-500"
                >
                  <X />
                </button>
              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}