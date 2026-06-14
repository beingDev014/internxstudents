"use client";

import { motion } from "framer-motion";
import { Target, Eye, Award, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-20 pb-20 pt-10">
      {/* Header */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto align-middle flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-6 text-sm font-semibold"
          >
            About EduLumos
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold font-outfit mb-6"
          >
            Empowering the Next Generation of <span className="text-gradient">Tech Leaders</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            We are on a mission to democratize elite tech education and bridge the gap between academic learning and real-world industry demands.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-[2rem] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20"><Target className="w-32 h-32 text-primary" /></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-3xl font-bold font-outfit mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To provide accessible, high-quality, and practical tech education that equips students with the exact skills required by top-tier tech companies. We believe that hands-on experience is the ultimate catalyst for career growth.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-[2rem] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20"><Eye className="w-32 h-32 text-purple-500" /></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-purple-500" />
              </div>
              <h2 className="text-3xl font-bold font-outfit mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the global standard for entry-level tech talent pipeline. We envision a world where every student, regardless of their background, has the opportunity to build products that impact millions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary/30 border border-border/50 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="w-full md:w-1/3 flex justify-center relative z-10">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-primary/20 overflow-hidden bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
              {/* Fallback avatar if no image */}
              <Award className="w-32 h-32 text-primary/40" />
            </div>
          </div>

          <div className="w-full md:w-2/3 relative z-10">
            <div className="inline-flex items-center gap-2 text-primary font-semibold mb-4 text-sm">
              <Award className="w-4 h-4" /> 15+ Years Industry Experience
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-6">Led by Industry Veterans</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              "After conducting over 500+ technical interviews at FAANG companies, I realized an incredible disparity between academic curriculums and what the industry actually expects. EduLumos was built to bridge that exact gap."
            </p>
            <div className="space-y-3">
              {[
                "Ex-Senior Engineering Leader at Top Tech Firms",
                "Built and scaled platforms serving millions of users",
                "Passionate about mentoring the next generation of builders"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
