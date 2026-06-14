"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Do I need prior coding experience?",
    answer: "It depends on the domain. Our Full Stack and Data Science bootcamps are designed for absolute beginners, though a basic understanding of computer logic helps. Advanced ML courses require prior Python knowledge."
  },
  {
    question: "Are the internships paid or unpaid?",
    answer: "Our core training programs are tuition-based to cover the cost of elite mentorship. However, top-performing students in the cohort are often placed in stipended internships with our hiring partners."
  },
  {
    question: "How are the projects structured?",
    answer: "You will work on 3-5 major capstone projects per domain. These are not toy applications; they are scaled architectures mimicking real industry problems, managed via Git, Agile, and Jira workflows."
  },
  {
    question: "Will I get a certificate?",
    answer: "Yes, upon successful evaluation of your capstone projects, you will receive an industry-recognized certificate with a unique Verification ID."
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 7-day money-back guarantee. If you feel the program isn't right for you within the first week, you can request a full refund, no questions asked."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-20 pb-20 pt-10">
      <section className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 text-primary mb-6">
            <HelpCircle className="w-8 h-8" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-outfit mb-6"
          >
            Frequently Asked <span className="text-gradient">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Everything you need to know about the product and billing.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass rounded-2xl overflow-hidden border border-border/50 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/20 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold pr-8">{faq.question}</span>
                <div
                  className={`w-8 h-8 rounded-full border border-border flex items-center justify-center shrink-0 transition-all duration-300 ${
                    openIndex === index ? "bg-primary text-white border-primary" : "text-muted-foreground"
                  }`}
                >
                  {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-0 text-muted-foreground leading-relaxed border-t border-border/10 mt-2 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
        
        <div className="mt-16 text-center bg-secondary/50 rounded-[2rem] p-8 border border-border/50">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">Can't find the answer you're looking for? Please chat to our friendly team.</p>
          <a href="/contact" className="inline-flex px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors">
            Get in touch
          </a>
        </div>
      </section>
    </div>
  );
}
