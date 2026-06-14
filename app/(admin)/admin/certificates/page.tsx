"use client";

import { useState, useEffect } from "react";
import { UploadCloud, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function CertificatesPage() {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  useEffect(() => {
    fetchTemplates();
  }, []);

  // 🔥 FETCH
  const fetchTemplates = async () => {
    const { data, error } = await supabase
      .from("certificate_templates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setUploadedFiles(data || []);
  };

  // 🔥 UPLOAD
  const handleFile = async (file: File) => {
    if (!file.name.endsWith(".docx")) {
      alert("Upload .docx only ❌");
      return;
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { error: uploadError } =
      await supabase.storage
        .from("certificate-templates")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

    if (uploadError) {
      console.log(uploadError);
      alert("Upload failed ❌");
      return;
    }

    const { data } =
      supabase.storage
        .from("certificate-templates")
        .getPublicUrl(fileName);

    const fileUrl = data.publicUrl;

    const { error: dbError } =
      await supabase
        .from("certificate_templates")
        .insert([
          {
            file_url: fileUrl,
          },
        ]);

    if (dbError) {
      console.log(dbError);
      alert("Database error ❌");
      return;
    }

    alert("Template uploaded successfully ✅");

    fetchTemplates();
  };

  const handleChange = (e: any) => {
    if (
      e.target.files &&
      e.target.files[0]
    ) {
      handleFile(
        e.target.files[0]
      );
    }
  };

  // 🔥 DELETE
  const removeFile = async (
    id: string
  ) => {
    const { error } =
      await supabase
        .from("certificate_templates")
        .delete()
        .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    fetchTemplates();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Certificate Templates
        </h1>

        <p className="text-gray-500">
          Upload and manage certificate templates
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* UPLOAD */}

        <div className="border rounded-3xl p-8 flex flex-col items-center">

          <UploadCloud className="w-12 h-12 mb-4 text-indigo-500" />

          <h2 className="font-bold text-lg mb-4">
            Upload Template
          </h2>

          <input
            type="file"
            accept=".docx"
            onChange={handleChange}
          />

        </div>

        {/* TEMPLATE LIST */}

        <div className="border rounded-3xl p-8">

          <h2 className="font-bold text-lg mb-4">
            Active Templates
          </h2>

          <div className="space-y-3">

            {uploadedFiles.length === 0 && (
              <p className="text-gray-500">
                No templates uploaded yet
              </p>
            )}

            {uploadedFiles.map(
              (file) => (
                <div
                  key={file.id}
                  className="border p-3 rounded flex justify-between items-center"
                >

                  <div>

                    <p className="font-semibold">
                      Template
                    </p>

                    <a
                      href={file.file_url}
                      target="_blank"
                      className="text-blue-500 text-sm"
                    >
                      View File
                    </a>

                  </div>

                  <button
                    onClick={() =>
                      removeFile(file.id)
                    }
                    className="text-red-500"
                  >
                    <X />
                  </button>

                </div>
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}