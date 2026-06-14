"use client";

import { motion } from "framer-motion";
import { Laptop, Award, Users, Briefcase } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: <Laptop className="w-10 h-10 text-blue-500" />,
    title: "Real-World Projects",
    desc: "Stop building to-do apps. Work on architecture-grade projects that solve actual industry problems. Build a portfolio that stands out to recruiters.",
    color: "from-blue-500/20 to-transparent",
    border: "group-hover:border-blue-500/50"
  },
  {
    icon: <Award className="w-10 h-10 text-purple-500" />,
    title: "Verified Certification",
    desc: "Earn a globally recognized certificate upon successful completion. Each certificate comes with a unique ID that recruiters can verify instantly on our platform.",
    color: "from-purple-500/20 to-transparent",
    border: "group-hover:border-purple-500/50"
  },
  {
    icon: <Users className="w-10 h-10 text-emerald-500" />,
    title: "1:1 Mentorship",
    desc: "Get unblocked faster. Receive personalized guidance and code reviews from industry experts who have worked at top tech companies.",
    color: "from-emerald-500/20 to-transparent",
    border: "group-hover:border-emerald-500/50"
  },
  {
    icon: <Briefcase className="w-10 h-10 text-amber-500" />,
    title: "Placement Assistance",
    desc: "We don't just teach you; we help you get hired. Exclusive access to our hiring partners, resume reviews, and mock interview sessions.",
    color: "from-amber-500/20 to-transparent",
    border: "group-hover:border-amber-500/50"
  }
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col gap-20 pb-20 pt-10">
      <section className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-outfit mb-6"
          >
            What We <span className="text-gradient">Offer</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            A comprehensive ecosystem designed to transform beginners into highly paid tech professionals. 
            We provide everything you need to succeed in the modern tech landscape.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass rounded-[2rem] p-8 md:p-10 group relative overflow-hidden border border-border/50 transition-all duration-300 ${service.border}`}
            >
              <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10`} />
              
              <div className="mb-8 p-4 bg-secondary/50 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h2 className="text-2xl font-bold font-outfit mb-4">{service.title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 border border-primary/20 rounded-[3rem] p-12 text-center">
          <h2 className="text-3xl font-bold font-outfit mb-4">Experience the EduLumos Advantage</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ready to upgrade your skills and build a portfolio that recruiters can't ignore?
          </p>
          <Link
            href="/internships"
            className="inline-block px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30"
          >
            Explore Programs
          </Link>
        </div>
      </section>
    </div>
  );
}
