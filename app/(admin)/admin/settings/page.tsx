"use client";

import { useState, useEffect } from "react";
import { Settings, KeyRound, UserPlus, Eye, EyeOff, Save, Loader2, ShieldCheck, CheckCircle } from "lucide-react";

export default function AdminSettingsPage() {
  const [activeAdminId, setActiveAdminId] = useState("");
  
  // States for password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ text: "", type: "" });

  // States for new admin creation
  const [newAdminId, setNewAdminId] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [creationLoading, setCreationLoading] = useState(false);
  const [creationMessage, setCreationMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const id = sessionStorage.getItem("active_admin_id");
    if (id) setActiveAdminId(id);
  }, []);

  const getUsers = () => {
    const data = localStorage.getItem("admin_users");
    return data ? JSON.parse(data) : [{ id: "admin", password: "admin" }];
  };

  const saveUsers = (users: any) => {
    localStorage.setItem("admin_users", JSON.stringify(users));
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage({ text: "", type: "" });
    
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ text: "New passwords do not match.", type: "error" });
      return;
    }

    setPasswordLoading(true);
    await new Promise(r => setTimeout(r, 600)); // Simulate delay

    const users = getUsers();
    const userIndex = users.findIndex((u: any) => u.id === activeAdminId);

    if (userIndex === -1 || users[userIndex].password !== currentPassword) {
      setPasswordMessage({ text: "Incorrect current password.", type: "error" });
    } else {
      users[userIndex].password = newPassword;
      saveUsers(users);
      setPasswordMessage({ text: "Password successfully updated.", type: "success" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    setPasswordLoading(false);
  };

  const handleAdminCreation = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreationMessage({ text: "", type: "" });
    setCreationLoading(true);

    await new Promise(r => setTimeout(r, 600));

    const users = getUsers();
    if (users.find((u: any) => u.id === newAdminId)) {
      setCreationMessage({ text: "This Admin ID already exists.", type: "error" });
    } else {
      users.push({ id: newAdminId, password: newAdminPassword });
      saveUsers(users);
      setCreationMessage({ text: `Account '${newAdminId}' actively registered.`, type: "success" });
      setNewAdminId("");
      setNewAdminPassword("");
    }
    setCreationLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold font-outfit tracking-tight mb-2 flex items-center gap-3">
          <Settings className="w-8 h-8 text-primary" /> Core Settings
        </h1>
        <p className="text-muted-foreground">Manage administrative security, tokens, and multi-user access permissions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Passcode Reset Box */}
        <div className="p-8 border border-border bg-background rounded-3xl shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-outfit">Security Key</h3>
              <p className="text-sm text-muted-foreground">Modify passcode for <b className="text-foreground">{activeAdminId}</b></p>
            </div>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4 flex-1">
            {passwordMessage.text && (
              <div className={`p-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
                passwordMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
              }`}>
                {passwordMessage.type === 'success' ? <CheckCircle className="w-4 h-4"/> : null}
                {passwordMessage.text}
              </div>
            )}
            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Current Passcode</label>
              <input 
                type="password" 
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" 
                placeholder="Verify identity"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">New Passcode</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" 
                  placeholder="Set minimum 8 bits"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Confirm Encryption</label>
              <input 
                type={showPassword ? "text" : "password"} 
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" 
                placeholder="Re-enter verification"
                required
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={passwordLoading}
                className="w-full py-3 bg-secondary text-foreground hover:bg-secondary/80 rounded-xl font-medium transition-colors flex justify-center items-center gap-2"
              >
                {passwordLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-4 h-4"/> Append Key</>}
              </button>
            </div>
          </form>
        </div>

        {/* Multi-admin Box */}
        <div className="p-8 border border-border bg-background rounded-3xl shadow-sm flex flex-col h-full">
           <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-outfit">Delegate Protocol</h3>
              <p className="text-sm text-muted-foreground">Register multi-admin access accounts.</p>
            </div>
          </div>

          <form onSubmit={handleAdminCreation} className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              {creationMessage.text && (
                <div className={`p-3 rounded-xl text-sm font-medium flex items-center gap-2 ${
                  creationMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
                }`}>
                  {creationMessage.type === 'success' ? <CheckCircle className="w-4 h-4"/> : null}
                  {creationMessage.text}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Sub-Admin Target ID</label>
                <input 
                  type="text" 
                  value={newAdminId}
                  onChange={e => setNewAdminId(e.target.value)}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" 
                  placeholder="e.g. hr_manager"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Deployment Passcode</label>
                <input 
                  type="password" 
                  value={newAdminPassword}
                  onChange={e => setNewAdminPassword(e.target.value)}
                  className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" 
                  placeholder="Generate secure token"
                  required
                />
              </div>

              <div className="mt-4 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Delegated administrators will inherit global read/write privileges over Candidate Applications, Task grading, and Ledger controls.
                </p>
              </div>
            </div>

            <div className="pt-4">
               <button 
                type="submit" 
                disabled={creationLoading}
                className="w-full py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-medium transition-colors flex justify-center items-center gap-2 shadow-sm"
              >
                {creationLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Deploy Sub-Admin"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
