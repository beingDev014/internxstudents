'use client';
import { motion } from "framer-motion";
import React, { useState } from 'react';
import Link from 'next/link';

import {
  ArrowRight,
  CheckCircle,
  Briefcase,
  Users,
  Award,
  BookOpen,
  ChevronDown,
  Code,
  LineChart,
  Brain,
  Palette,
  ShieldCheck,
  Cloud,
  Layers,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

const stats = [
  { label: 'Students Trained', value: '15,000+', icon: Users, color: 'text-indigo-600 dark:text-indigo-400' },
  { label: 'Projects Completed', value: '45,000+', icon: Layers, color: 'text-emerald-500' },
  { label: 'Certificates Issued', value: '12,000+', icon: Award, color: 'text-amber-500' },
  { label: 'Internship Batches', value: '180+', icon: Briefcase, color: 'text-blue-500' },
];

const steps = [
  { number: '01', title: 'Apply', desc: 'Select your preferred tech domain and submit your application.' },
  { number: '02', title: 'Get Selected', desc: 'Our mentors review your profile and academic background.' },
  { number: '03', title: 'Receive Offer Letter', desc: 'Get a formal internship offer letter verifying your cohort role.' },
  { number: '04', title: 'Access Training', desc: 'Unlock hands-on guides, video modules, and codebase assets.' },
  { number: '05', title: 'Complete Tasks', desc: 'Solve real-world engineering and design milestones.' },
  { number: '06', title: 'Get Evaluated', desc: 'Mentor reviews, grades, and provides feedback on submissions.' },
  { number: '07', title: 'Earn Certificate', desc: 'Secure your verifiable digital completion certificate.' },
];

const domains = [
  {
    title: 'Web Development',
    desc: 'Build scalable full-stack applications with React, Next.js, and Node.js.',
    icon: Code,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Data Science',
    desc: 'Analyze complex data patterns and deploy predictive stats workflows.',
    icon: LineChart,
    color: 'from-emerald-400 to-teal-600',
  },
  {
    title: 'AI & ML',
    desc: 'Train deep neural networks and integrate large language models.',
    icon: Brain,
    color: 'from-violet-500 to-purple-700',
  },
  {
    title: 'UI/UX',
    desc: 'Design beautiful, interactive user flows and glassmorphism web styles.',
    icon: Palette,
    color: 'from-pink-500 to-rose-600',
  },
  {
    title: 'Cyber Security',
    desc: 'Audit system architectures, perform pen-testing, and patch vulnerabilities.',
    icon: ShieldCheck,
    color: 'from-red-500 to-orange-600',
  },
  {
    title: 'Cloud Computing',
    desc: 'Architect AWS, Docker, and Kubernetes pipeline configurations.',
    icon: Cloud,
    color: 'from-cyan-400 to-blue-600',
  },
];

const testimonials = [
  {
    quote: "InternX bridged the gap between college and industry. The tasks were challenging, and my mentor's code reviews helped me land my first junior frontend developer role.",
    author: "Alex Rivera",
    role: "Frontend Engineer at Vercel",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
    domain: "Web Development"
  },
  {
    quote: "The practical nature of the Data Science project batch taught me more than my college semester course. Structuring real ML models felt extremely rewarding.",
    author: "Priya Sharma",
    role: "Data Analyst at Snowflake",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    domain: "Data Science"
  }
];

const faqs = [
  {
    q: "Is the internship self-paced?",
    a: "Yes! While each batch has recommended deadlines and task due dates to help you finish in 8-12 weeks, you can learn and code at your own speed."
  },
  {
    q: "Do I get a certificate at the end?",
    a: "Absolutely. Upon completing and passing all the assigned curriculum tasks, your mentor will unlock and sign your verified digital Completion Certificate containing a unique verifiable hash."
  },
  {
    q: "Who evaluates my submissions?",
    a: "Submissions are reviewed by our network of senior engineering mentors who provide custom comments, feedback points, and approve/reject status changes."
  },
  {
    q: "Is there any fee to apply?",
    a: "No, applying to InternX cohorts is completely free. We review all applications and select candidates based on their coding potential."
  }
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleStudentLogin = () => {
  window.location.href = "/student/login";
};


  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:py-32 overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Info */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50"
              >
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Next Cohort Starting Soon
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight"
              >
                Transform Learning Into{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  Real Internship Experience
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 font-medium"
              >
                Build real projects, gain practical skills, receive expert mentor guidance, and earn verified internship certificates.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none rounded-xl transition-all hover:-translate-y-0.5"
                >
                  Apply Now
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <button
                  onClick={handleStudentLogin}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-200 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all hover:-translate-y-0.5"
                >
                  <GraduationCap className="h-5 w-5 text-indigo-500" />
                  Student Dashboard
                </button>

                <button
                  onClick={() => window.location.href="/admin/login"}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-200 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all hover:-translate-y-0.5"
                >
                  Admin Portal
                </button>
              </motion.div>
            </div>

            {/* Dashboard Mockup Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6"
            >
              <div className="relative mx-auto max-w-[500px] lg:max-w-none bg-slate-950/5 dark:bg-slate-900/40 p-3 sm:p-4 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-2xl backdrop-blur-md">
                {/* Glass Window Header */}
                <div className="flex justify-between items-center pb-3 border-b border-slate-200/50 dark:border-slate-800/60 px-2">
                  <div className="flex gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-rose-500/80" />
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-400/80" />
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="text-xs font-semibold text-slate-400 dark:text-slate-500">internx-dashboard.app</div>
                  <div className="w-10" />
                </div>

                {/* Dashboard Grid Mockup */}
                <div className="grid grid-cols-12 gap-3 pt-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                  {/* Left Mock Sidebar */}
                  <div className="col-span-3 space-y-2 border-r border-slate-200/50 dark:border-slate-800/50 pr-2">
                    <div className="h-6 rounded-md bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold px-2 py-1 flex items-center gap-1.5">
                      <Layers className="h-3 w-3" /> Dashboard
                    </div>
                    <div className="h-6 rounded-md hover:bg-slate-200/50 dark:hover:bg-slate-800/50 px-2 py-1 flex items-center gap-1.5 cursor-pointer">
                      <BookOpen className="h-3 w-3" /> Materials
                    </div>
                    <div className="h-6 rounded-md hover:bg-slate-200/50 dark:hover:bg-slate-800/50 px-2 py-1 flex items-center gap-1.5 cursor-pointer">
                      <CheckCircle className="h-3 w-3" /> Tasks
                    </div>
                    <div className="h-6 rounded-md hover:bg-slate-200/50 dark:hover:bg-slate-800/50 px-2 py-1 flex items-center gap-1.5 cursor-pointer">
                      <Award className="h-3 w-3" /> Certificates
                    </div>
                  </div>

                  {/* Main Panel */}
                  <div className="col-span-9 space-y-3 pl-2">
                    {/* Welcome Header */}
                    <div className="p-3 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-cyan-500/10 dark:from-indigo-500/20 dark:via-purple-500/10 dark:to-cyan-500/20 rounded-xl border border-indigo-500/20 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-slate-800 dark:text-white text-sm">Welcome back, John Doe!</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">Domain: Web Development Cohort A</div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/20">
                        Active
                      </span>
                    </div>

                    {/* Content split */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Left: Progress Circle Mock */}
                      <div className="bg-white/80 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 flex flex-col items-center justify-center text-center">
                        <div className="relative w-16 h-16 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-95" viewBox="0 0 36 36">
                            <path className="text-slate-100 dark:text-slate-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path className="text-indigo-500 dark:text-indigo-400" strokeDasharray="65, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          </svg>
                          <span className="absolute text-xs font-bold text-slate-800 dark:text-white">65%</span>
                        </div>
                        <span className="text-[10px] font-bold mt-2 text-slate-400">Total Internship Progress</span>
                      </div>

                      {/* Right: Quick Stats & Mentor Feedback */}
                      <div className="space-y-2">
                        <div className="p-2 bg-white/80 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800/80 flex justify-between items-center">
                          <span className="text-[10px] text-slate-400">Tasks Completed</span>
                          <span className="font-bold text-slate-800 dark:text-white">2 / 3</span>
                        </div>
                        
                        {/* Mentor Note Mock */}
                        <div className="p-2.5 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 rounded-xl">
                          <div className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 text-[10px]">
                            <CheckCircle className="h-3 w-3" /> Mentor Reviewed
                          </div>
                          <p className="text-[9px] text-slate-400 dark:text-slate-400 mt-1 leading-normal">
                            "Excellent clean layout and Tailwind custom toggles. Keep it up!" - Sarah C.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col items-center justify-center text-center space-y-2 p-4"
                >
                  <div className={`p-3 rounded-full bg-slate-100 dark:bg-slate-800 ${stat.color} bg-opacity-20`}>
                    <IconComp className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-black tracking-tight">{stat.value}</div>
                  <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
              Cohort Roadmap
            </h2>
            <p className="text-3xl sm:text-4xl font-black tracking-tight">
              How InternX Training Works
            </p>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              We guide you from simple applications to verified completion credentials in seven structured phases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group overflow-hidden"
              >
                {/* Step index overlay */}
                <div className="absolute top-2 right-4 text-4xl font-black text-indigo-500/10 group-hover:text-indigo-500/20 transition-all font-mono">
                  {step.number}
                </div>
                <div className="space-y-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-sm font-bold">
                    {idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-slate-800 dark:text-white">{step.title}</h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internship Domains Section */}
      <section id="domains" className="py-20 md:py-28 bg-white dark:bg-slate-900 scroll-mt-16 border-y border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
              Specialized Tracks
            </h2>
            <p className="text-3xl sm:text-4xl font-black tracking-tight">
              Internship Training Domains
            </p>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Choose your specialization track. Each program is curated with structured modules and mentor guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.map((dom, idx) => {
              const IconComp = dom.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl flex flex-col justify-between transition-all"
                >
                  <div className="space-y-4">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${dom.color} text-white`}>
                      <IconComp className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">{dom.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {dom.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700">
                    <span>Explore Track syllabus</span>
                    <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
              Success Stories
            </h2>
            <p className="text-3xl sm:text-4xl font-black tracking-tight">
              Loved by Hundreds of Interns
            </p>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Read how InternX graduates transitioned from academic learners to enterprise engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((test, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-sm flex flex-col justify-between"
              >
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 italic leading-relaxed">
                  "{test.quote}"
                </p>
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <img src={test.avatar} alt={test.author} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{test.author}</h4>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{test.role}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md">
                      {test.domain}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Showcase */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                Verifiable Credentials
              </h2>
              <p className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Earn Your Verified Completion Certificate
              </p>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Every graduate receives an official, shareable certificate containing a unique credential ID and blockchain hash. Share it directly to LinkedIn or include it on your resume.
              </p>
              <ul className="space-y-3 text-sm font-semibold text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" /> Unique Credential Verification Hash
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" /> Shareable on LinkedIn & Portfolios
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" /> Verifies Batch Domain & Mentor Signatures
                </li>
              </ul>
            </div>

            {/* Certificate Render */}
            <div className="lg:col-span-7 flex justify-center">
              <motion.div
                initial={{ opacity: 0, rotateY: 10 }}
                whileInView={{ opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-[580px] bg-slate-50 dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border-4 border-double border-slate-300 dark:border-slate-800 shadow-xl relative overflow-hidden"
              >
                {/* Border frames */}
                <div className="absolute inset-2 border border-slate-200 dark:border-slate-800 pointer-events-none" />
                
                {/* Certificate Content */}
                <div className="space-y-6 text-center">
                  <div className="flex justify-between items-center px-4">

                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">ID: IX-COMP-88239A</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                      Certificate of Completion
                    </span>
                    <h3 className="font-serif text-3xl font-bold italic text-slate-800 dark:text-slate-100">
                      John Doe
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed font-medium">
                      has successfully completed the intensive training syllabus and practical milestone projects for the virtual internship program in
                    </p>
                    <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      Web Development Track
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200 dark:border-slate-800 px-6">
                    <div className="text-left space-y-1">
                      <div className="font-serif text-xs italic font-semibold text-slate-600 dark:text-slate-300">
                        Sarah Connor
                      </div>
                      <div className="h-0.5 bg-slate-200 dark:bg-slate-800" />
                      <div className="text-[9px] text-slate-400 font-bold uppercase">
                        Lead Program Director
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-[9px] font-mono text-slate-400 dark:text-slate-500">
                        Verification Hash:
                      </div>
                      <div className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 select-all">
                        8e4a9e52cf8a221fb02
                      </div>
                      <div className="text-[9px] text-slate-400 font-bold uppercase">
                        Status: Verified
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-28 bg-slate-50 dark:bg-slate-950 scroll-mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
              Got Questions?
            </h2>
            <p className="text-3xl sm:text-4xl font-black tracking-tight">
              Frequently Asked Questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center p-5 text-left font-bold text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 border-t border-slate-100 dark:border-slate-800' : 'max-h-0'} overflow-hidden`}
                  >
                    <p className="p-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
