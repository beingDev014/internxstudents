"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-20 pb-20 pt-10">
      <section className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-outfit mb-6"
          >
            Get In <span className="text-gradient">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Have questions about our programs or partnerships? We'd love to hear from you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-[2rem]">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 text-muted-foreground">
                  <div className="p-3 bg-secondary rounded-xl text-primary"><MapPin className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Our Headquarters</h4>
                    <p>123 Innovation Drive, Silicon Valley,<br />California, USA 94025</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-muted-foreground">
                  <div className="p-3 bg-secondary rounded-xl text-primary"><Mail className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email Us</h4>
                    <p>hello@edulumos.com<br />support@edulumos.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-muted-foreground">
                  <div className="p-3 bg-secondary rounded-xl text-primary"><Phone className="w-5 h-5" /></div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Call Us</h4>
                    <p>+1 (555) 123-4567<br />Mon-Fri, 9am - 6pm PST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="glass p-2 rounded-[2rem] h-64 overflow-hidden relative">
              <div className="absolute inset-0 bg-secondary/50 flex flex-col items-center justify-center text-muted-foreground rounded-[1.8rem]">
                <MapPin className="w-10 h-10 mb-2 opacity-50" />
                <span>Interactive Map Component</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-8 md:p-10 rounded-[2rem] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium mb-2 pl-1">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 pl-1">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 pl-1">Message</label>
                <textarea
                  placeholder="How can we help you?"
                  rows={4}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium resize-none"
                />
              </div>
              <button className="w-full py-4 bg-primary text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 mt-4">
                Send Message <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
