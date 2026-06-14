"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Seed default admin if local storage is empty
    const savedUsers = localStorage.getItem("admin_users");
    if (!savedUsers) {
      localStorage.setItem("admin_users", JSON.stringify([
        { id: "admin", password: "admin" }
      ]));
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Pull dynamic array from browser storage
    const usersData = localStorage.getItem("admin_users");
    const users = usersData ? JSON.parse(usersData) : [{ id: "admin", password: "admin" }];

    // Authenticate
    const match = users.find((u: any) => u.id === id && u.password === password);

    if (match) {
      sessionStorage.setItem("admin_auth", "true");
      sessionStorage.setItem("active_admin_id", match.id);
      router.push("/admin/applications");
    } else {
      setError("Invalid credentials. Access denied.");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-8 md:p-12 rounded-3xl max-w-md w-full border border-border relative overflow-hidden shadow-xl"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10" />

        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4 border border-primary/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold font-outfit mb-2 text-foreground">Admin Command</h1>
          <p className="text-sm text-muted-foreground">Authorized personnel only.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 text-red-600 text-sm font-medium text-center border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Identifier</label>
            <input 
              type="text" 
              value={id}
              onChange={e => setId(e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" 
              placeholder="Enter ID"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Passcode</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" 
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3 mt-4 bg-primary text-primary-foreground rounded-xl font-medium tracking-wide transition-colors hover:bg-primary/90 flex justify-center items-center gap-2 shadow-sm"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authenticate"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
