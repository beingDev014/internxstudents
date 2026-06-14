"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, Award, ArrowRight, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const domains = ["All", "Data Science", "Machine Learning", "Artificial Intelligence", "Web Development", "Business Analytics"];

const internships = [
  { id: 1, domain: "Data Science", title: "Data Science & Analytics", duration: "3 Months", desc: "Master Python, Pandas, SQL, and Tableau. Work on 5+ real-world datasets." },
  { id: 2, domain: "Machine Learning", title: "Applied Machine Learning", duration: "4 Months", desc: "Build predictive models, recommendation systems, and deploy ML models." },
  { id: 3, domain: "Artificial Intelligence", title: "Deep Learning & Generative AI", duration: "6 Months", desc: "Dive deep into Neural Networks, NLP, Computer Vision, and LLMs." },
  { id: 4, domain: "Web Development", title: "Full Stack MERN", duration: "4 Months", desc: "Build scalable web applications from scratch using React and Node.js." },
  { id: 5, domain: "Web Development", title: "Frontend Engineering", duration: "2 Months", desc: "Focus purely on React, Next.js, and advanced CSS for stunning UIs." },
  { id: 6, domain: "Business Analytics", title: "Business Strategy Analytics", duration: "3 Months", desc: "Learn to drive business growth using Excel, PowerBI, and data-driven tactics." },
];

export default function InternshipsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInternships = internships.filter(i => {
    const matchesFilter = activeFilter === "All" || i.domain === activeFilter;
    const matchesSearch = i.title.toLowerCase().includes(searchQuery.toLowerCase()) || i.domain.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-10 pb-20 pt-10">
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-outfit mb-4">Explore <span className="text-gradient">Internships</span></h1>
          <p className="text-muted-foreground text-lg">Kickstart your career with industry-recognized real-world experience.</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="glass rounded-2xl p-4 md:p-6 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-24 z-30">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search domains or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <Filter className="w-5 h-5 text-muted-foreground mr-2 shrink-0 hidden md:block" />
            {domains.map((domain) => (
              <button
                key={domain}
                onClick={() => setActiveFilter(domain)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                  activeFilter === domain
                    ? "bg-primary text-white shadow-lg"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                )}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>

        {/* Internships Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[400px]">
          <AnimatePresence>
            {filteredInternships.length > 0 ? (
              filteredInternships.map((internship) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={internship.id}
                  className="glass rounded-3xl p-6 flex flex-col group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-all duration-500" />
                  
                  <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full bg-secondary text-xs font-semibold text-primary w-fit">
                    {internship.domain}
                  </div>
                  <h3 className="text-2xl font-bold font-outfit mb-2 group-hover:text-primary transition-colors">{internship.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 font-medium">
                    <Clock className="w-4 h-4" /> {internship.duration}
                    <span className="mx-2">•</span>
                    <Award className="w-4 h-4" /> Certification
                  </div>
                  <p className="text-muted-foreground mb-8 flex-1">{internship.desc}</p>
                  
                  <Link
                    href={`/apply?domain=${encodeURIComponent(internship.domain)}`}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/10 text-primary font-medium group-hover:bg-primary group-hover:text-white transition-all duration-300"
                  >
                    Apply Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                No internships found matching your criteria. Try adjusting your filters.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}
