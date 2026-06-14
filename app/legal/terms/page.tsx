"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="flex flex-col gap-10 pb-20 pt-10">
      <section className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 border-b border-border/50 pb-10"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-6 text-sm font-semibold">
            Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground">Last updated: April 12, 2026</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-slate dark:prose-invert max-w-none space-y-8"
        >
          <div className="glass p-8 rounded-[2rem]">
            <h2 className="text-2xl font-bold mb-4 font-outfit">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Welcome to EduLumos. By accessing or using our platform, you agree to be bound by these Terms and Conditions. Please read them carefully. If you do not agree with these terms, you must not use our services.
            </p>
            
            <h2 className="text-2xl font-bold mb-4 font-outfit mt-8">2. Enrollment and Fees</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Enrollment in our internship programs is subject to availability and our approval. Fees must be paid in full prior to the commencement of the program unless a payment plan has been explicitly agreed upon. All fees are non-refundable after the first 7 days of the program.
            </p>

            <h2 className="text-2xl font-bold mb-4 font-outfit mt-8">3. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All materials provided during the internship, including but not limited to code templates, architectural designs, and curriculum documentation, are the intellectual property of EduLumos. You may not distribute, sell, or reproduce these materials without prior written consent.
            </p>

            <h2 className="text-2xl font-bold mb-4 font-outfit mt-8">4. Code of Conduct</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We expect all participants to maintain a professional and respectful demeanor. Harassment, plagiarism, or any form of academic dishonesty will result in immediate termination from the program without a refund.
            </p>

            <h2 className="text-2xl font-bold mb-4 font-outfit mt-8">5. Certifications</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Certificates are awarded entirely at the discretion of the instructing team. Students must complete all capstone projects and pass the final evaluation to receive an authenticated certificate.
            </p>

            <h2 className="text-2xl font-bold mb-4 font-outfit mt-8">6. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              EduLumos reserves the right to modify these terms at any time. We will notify users of significant changes via email or system notification. Your continued use of the platform constitutes your acceptance of the revised terms.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
