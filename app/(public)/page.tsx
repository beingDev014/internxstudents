"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, Database, BrainCircuit, ShieldCheck, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-8 border border-primary/20 text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Admissions Open for Summer 2026 Batch
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight font-outfit mb-6 max-w-4xl mx-auto"
          >
            Accelerate Your Tech Career with <span className="text-gradient">Real-World</span> Internships
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Bridge the gap between academic learning and industry demands. Join 10,000+ students mastering Data Science, AI, and Web Development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/apply"
              className="px-8 py-4 bg-primary text-white rounded-full font-medium shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:shadow-[0_0_40px_rgba(79,70,229,0.7)] transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/internships"
              className="px-8 py-4 glass text-foreground rounded-full font-medium hover:bg-secondary/50 transition-all duration-300 flex items-center gap-2"
            >
              Explore Internships
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: "Students Enrolled", value: "10,000+" },
            { label: "Internships Completed", value: "8,500+" },
            { label: "Partner Companies", value: "150+" },
            { label: "Success Rate", value: "94%" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center border-t border-l border-white/5"
            >
              <h3 className="text-3xl md:text-5xl font-bold text-foreground font-outfit mb-2">
                {stat.value}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Logos Strip */}
      <section className="py-10 border-y border-border/40 bg-secondary/20 overflow-hidden flex relative">
        <div className="w-[200%] flex items-center gap-12 animate-[scroll_20s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 sm:gap-24 items-center whitespace-nowrap min-w-full justify-around opacity-50 dark:opacity-40">
              <span className="text-xl font-bold font-outfit">Stanford Univ</span>
              <span className="text-xl font-bold font-outfit text-primary">MIT</span>
              <span className="text-xl font-bold font-outfit">Oxford</span>
              <span className="text-xl font-bold font-outfit text-purple-500">Harvard</span>
              <span className="text-xl font-bold font-outfit">IIT Delhi</span>
              <span className="text-xl font-bold font-outfit text-indigo-400">Google Dev</span>
              <span className="text-xl font-bold font-outfit">AI Alliance</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Top Domains */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">Master In-Demand Skills</h2>
          <p className="text-muted-foreground">Choose from our industry-vetted internship domains designed to make you job-ready from day one.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            { icon: <Database className="w-8 h-8 text-blue-500" />, title: "Data Science", desc: "Analyze data, build models, and drive decisions." },
            { icon: <BrainCircuit className="w-8 h-8 text-purple-500" />, title: "AI & ML", desc: "Build intelligent systems and neural networks." },
            { icon: <Code className="w-8 h-8 text-emerald-500" />, title: "Full Stack Dev", desc: "Create robust web apps from front to back." },
          ].map((domain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-3xl p-8 group transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-all" />
              <div className="mb-6 p-4 bg-secondary/50 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                {domain.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{domain.title}</h3>
              <p className="text-muted-foreground mb-6">{domain.desc}</p>
              <Link href={`/internships?domain=${domain.title.toLowerCase()}`} className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                View Internships <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/internships" className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors">
            See all domains <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. Success Stories */}
      <section className="container mx-auto px-4 md:px-6 bg-secondary/30 rounded-[3rem] py-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">Student Success Stories</h2>
          <p className="text-muted-foreground">Hear from the thousands of students who launched their careers with us.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {[
            { name: "Sarah J.", role: "Data Scientist at Meta", review: "The projects I worked on during the internship were exactly what interviewers asked about. Truly an industry-grade experience." },
            { name: "Rahul K.", role: "Frontend Dev at Startup", review: "I learned more in 3 months here than in my entire college degree. The mentorship was invaluable." },
            { name: "Emily C.", role: "AI Engineer", review: "The hands-on ML tasks gave me the confidence to build my own portfolio. Highly recommend EduLumos!" },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-background rounded-3xl p-8 shadow-xl border border-border/50 relative"
            >
              <div className="flex gap-1 text-amber-400 mb-4">
                {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.review}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* 6. Call to Action */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border-primary/20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 opacity-50" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold font-outfit mb-6">Ready to start your journey?</h2>
            <p className="text-lg text-muted-foreground mb-8">Join the elite network of tech professionals. Apply now for the upcoming cohort and secure your career.</p>
            <Link
              href="/apply"
              className="inline-flex h-14 items-center justify-center rounded-full bg-primary px-10 py-3 text-lg font-medium text-white shadow-xl transition-all hover:bg-primary/90 hover:scale-105"
            >
              Apply for Internship
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
