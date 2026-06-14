"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, ArrowRight, ArrowLeft, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

const domains = [
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "Web Development",
  "Business Analytics",
];

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    email: "",
    phone: "",
    domain: "",
    resumeLink: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateStepCount = () => {
    if (step === 1)
      return formData.fullName && formData.gender && formData.email;
    if (step === 2)
      return formData.phone && formData.domain && formData.resumeLink;
    return true;
  };

  const handleNext = () => {
    if (validateStepCount()) setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStepCount()) return;

    setIsSubmitting(true);

    const { error } = await supabase.from("students_applications").insert([
      {
        full_name: formData.fullName,
        gender: formData.gender,
        email: formData.email,
        phone: formData.phone,
        domain: formData.domain,
        resume_link: formData.resumeLink,
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      console.error(error);
      alert("Error submitting application");
    } else {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass max-w-md w-full p-10 text-center rounded-[2rem]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12" />
          </motion.div>

          <h2 className="text-3xl font-bold mb-4">
            Application Submitted!
          </h2>

          <p className="text-muted-foreground mb-8">
            Thank you,{" "}
            <span className="font-semibold">{formData.fullName}</span>.  
            We've received your application for{" "}
            <span className="font-semibold">{formData.domain}</span>.
          </p>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full py-3 bg-secondary rounded-xl"
          >
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">
        Join InternX
      </h1>

      <div className="max-w-xl w-full p-6 rounded-2xl glass">
        <div className="flex gap-2 mb-8">
          <div className="h-1.5 flex-1 bg-primary rounded-full transition-all"></div>
          <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step === 2 ? 'bg-primary' : 'bg-secondary'}`}></div>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />

                <button 
                  type="button" 
                  onClick={handleNext}
                  disabled={!validateStepCount()}
                  className="w-full mt-4 py-3 bg-primary text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Next Step <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />

                <select
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select Domain</option>
                  {domains.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>

                <input
                  type="url"
                  name="resumeLink"
                  placeholder="Google Drive Link"
                  value={formData.resumeLink}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                />

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={handleBack} className="p-3 border border-border rounded-xl hover:bg-secondary">
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <button 
                    type="submit" 
                    disabled={isSubmitting || !validateStepCount()}
                    className="flex-1 py-3 bg-primary text-white rounded-xl font-medium flex items-center justify-center disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin"/> Submitting...</span>
                    ) : (
                      <span className="flex items-center gap-2">Submit <Send className="w-5 h-5"/></span>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}