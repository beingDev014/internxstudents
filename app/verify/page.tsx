"use client";

import { useState } from "react";
import { Search, ShieldCheck, Download, Award, XCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

export default function VerifyCertificate() {
  const [certId, setCertId] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!certId.trim()) {
      alert("Enter Certificate ID ❗");
      return;
    }

    setIsSearching(true);
    setResult(null);
    setSearched(false);

    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("certificate_id", certId.trim().toUpperCase())
        .single();

      if (error || !data) {
        setResult(null);
      } else {
        setResult(data);
      }
    } catch (err) {
      console.error("VERIFY ERROR:", err);
      setResult(null);
    }

    setSearched(true);
    setIsSearching(false);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[85vh] px-4 py-20">

      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-6 text-sm font-semibold">
          <ShieldCheck className="w-4 h-4" /> Global Verification
        </div>

        <h1 className="text-4xl font-bold mb-6">
          Verify <span className="text-gradient">Certificate</span>
        </h1>

        <p className="text-muted-foreground">
          Enter your certificate ID to verify authenticity.
        </p>
      </div>

      {/* SEARCH BOX */}
      <div className="w-full max-w-2xl">
        <div className="glass p-3 rounded-full flex items-center mb-12">
          <form onSubmit={handleVerify} className="flex w-full gap-3">

            <div className="relative flex-1">
              <Search className="absolute left-4 top-3 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Enter Certificate ID (e.g. CERT-1234)"
                className="w-full pl-12 py-3 bg-transparent outline-none"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="bg-primary text-white px-6 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Certificate"
              )}
            </button>

          </form>
        </div>

        {/* EMPTY STATE */}
        {!searched && (
          <p className="text-center text-muted-foreground">
            Enter a certificate ID to begin verification
          </p>
        )}

        <AnimatePresence mode="wait">

          {/* SUCCESS */}
          {searched && result && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-8 border shadow-lg hover:shadow-xl transition"
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">

                <Award className="w-16 h-16 text-primary" />

                <div className="flex-1 text-center md:text-left">

                  <div className="text-green-600 font-bold text-lg mb-2">
                    ✅ Verified & Authentic Certificate
                  </div>

                  <h3 className="text-2xl font-bold">
                    {result.student_name}
                  </h3>

                  <p className="text-primary">{result.domain}</p>

                  <div className="mt-4 space-y-2 text-sm">

                    {/* COPY ID */}
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <p><b>ID:</b> {result.certificate_id}</p>

                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(result.certificate_id);
                          alert("Copied ID ✅");
                        }}
                        className="text-xs bg-gray-200 px-2 py-1 rounded"
                      >
                        Copy
                      </button>
                    </div>

                    <p>
                      <b>Date:</b>{" "}
                      {new Date(result.issue_date).toLocaleDateString()}
                    </p>

                  </div>

                  {/* DOWNLOAD */}
                  {result.certificate_url && (
                    <a
                      href={result.certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-5 bg-secondary px-4 py-2 rounded"
                    >
                      <Download className="w-4 h-4" />
                      Download Certificate
                    </a>
                  )}

                  {/* VERIFY AGAIN */}
                  <button
                    onClick={() => {
                      setCertId("");
                      setResult(null);
                      setSearched(false);
                    }}
                    className="mt-4 text-sm underline"
                  >
                    Verify another certificate
                  </button>

                </div>
              </div>
            </motion.div>
          )}

          {/* ERROR */}
          {searched && !result && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-3xl p-8 text-center border border-red-500/20"
            >
              <XCircle className="w-10 h-10 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold">Certificate Not Found</h3>
              <p className="text-muted-foreground">
                Please check your ID and try again.
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}