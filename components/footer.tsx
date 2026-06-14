import Link from "next/link";
import { Sparkles, MessageCircle, Briefcase, Code, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t mt-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-8">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-indigo-500 text-white flex items-center justify-center rounded">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg">InternX</span>
            </div>

            <p className="text-sm text-gray-500">
              Empowering students with real-world internships and skills.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Domains</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Data Science</li>
              <li>AI / ML</li>
              <li>Web Development</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Follow</h3>
            <div className="flex gap-3">
              <MessageCircle />
              <Briefcase />
              <Code />
              <Globe />
            </div>
          </div>

        </div>

        <div className="mt-10 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} InternX. All rights reserved.
        </div>

      </div>
    </footer>
  );
}