"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("students_applications")
      .select("*")
      .eq("email", user.email)
      .not("certificate_url", "is", null);

    if (!error) {
      setCertificates(data || []);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading Certificates...
      </div>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Certificates 🎓
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {certificates.length===0 && (
          <div className="bg-white p-6 rounded-xl shadow">
            No certificates issued yet
          </div>
        )}

        {certificates.map((item)=>(
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h2 className="font-bold text-xl">
              Internship Certificate
            </h2>

            <p className="text-gray-500 mt-2">
              Student: {item.email}
            </p>

            <a
              href={item.certificate_url}
              target="_blank"
              className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
            >
              View Certificate
            </a>
          </div>
        ))}

      </div>

    </div>
  );
}