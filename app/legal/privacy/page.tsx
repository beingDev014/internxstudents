"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: April 12, 2026</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-slate dark:prose-invert max-w-none space-y-8"
        >
          <div className="glass p-8 rounded-[2rem]">
            <h2 className="text-2xl font-bold mb-4 font-outfit">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect information that you provide directly to us, such as when you create an account, apply for an internship, or communicate with us. This may include your name, email address, phone number, resume data, and payment information.
            </p>

            <h2 className="text-2xl font-bold mb-4 font-outfit mt-8">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect to operate, maintain, and improve our services. This includes processing your application, providing mentorship, issuing certificates, and communicating with you regarding updates or support inquiries.
            </p>

            <h2 className="text-2xl font-bold mb-4 font-outfit mt-8">3. Information Sharing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not sell your personal data to third parties. We may share your information with our trusted hiring partners strictly for placement assistance purposes, provided you have explicitly opted into our placement program.
            </p>

            <h2 className="text-2xl font-bold mb-4 font-outfit mt-8">4. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or disclosure. However, no internet transmission is ever completely secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold mb-4 font-outfit mt-8">5. Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies and similar tracking technologies to track activity on our platform and hold certain information to enhance your user experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>

            <h2 className="text-2xl font-bold mb-4 font-outfit mt-8">6. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact our Data Protection Officer at privacy@edulumos.com.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
