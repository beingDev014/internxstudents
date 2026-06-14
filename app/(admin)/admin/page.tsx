"use client";

import { useState, useEffect } from "react";
import { Users, FileText, CheckSquare, Award, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { format, subDays, isSameDay, formatDistanceToNow } from "date-fns";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({ applications: 0, offers: 0, tasks: 0, certificates: 0 });
  const [recentApps, setRecentApps] = useState<any[]>([]);
  const [chartData, setChartData] = useState<{date: string, count: number, height: number}[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);

    const [appsRes, certsRes] = await Promise.all([
      supabase.from("students_applications").select("*").order("created_at", { ascending: false }),
      supabase.from("certificates").select("id", { count: "exact" })
    ]);

    const apps = appsRes.data || [];
    const certsCount = certsRes.count || 0;

    // Calculate Top Level Metrics
    const totalApps = apps.length;
    const pendingOffers = apps.filter(a => a.status === 'pending').length;
    const pendingTasks = apps.filter(a => a.status === 'approved').length;

    setMetrics({
      applications: totalApps,
      offers: pendingOffers,
      tasks: pendingTasks,
      certificates: certsCount
    });

    // Recent Submissions (Latest 4)
    setRecentApps(apps.slice(0, 4));

    // Distribution Chart (Trailing 7 Days)
    const trailingDays = Array.from({ length: 7 }).map((_, i) => subDays(new Date(), 6 - i));
    
    let maxCount = 0;
    const distribution = trailingDays.map(day => {
      const count = apps.filter(a => isSameDay(new Date(a.created_at), day)).length;
      if (count > maxCount) maxCount = count;
      return {
        date: format(day, "EEE"), // e.g., Mon, Tue
        count,
        height: 0 // to be calculated relative to maxCount
      };
    });

    const normalizedDistribution = distribution.map(d => ({
      ...d,
      height: maxCount === 0 ? 0 : Math.max(10, (d.count / maxCount) * 100) // minimum visual height 10%
    }));

    setChartData(normalizedDistribution);
    setLoading(false);
  };

  const statCards = [
    { label: "Total Applications", value: metrics.applications, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Pending Offers", value: metrics.offers, icon: FileText, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Task Candidates", value: metrics.tasks, icon: CheckSquare, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Certificates Issued", value: metrics.certificates, icon: Award, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div>
        <h1 className="text-4xl font-bold font-outfit tracking-tight mb-2">
          System Overview
        </h1>
        <p className="text-muted-foreground">Monitor real-time metrics and platform telemetry.</p>
      </div>

      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, i) => (
              <div key={i} className="p-6 border border-border bg-background rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
                  <h3 className="text-4xl font-bold font-outfit">{stat.value}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Native CSS Telemetry Chart */}
            <div className="p-8 border border-border bg-background rounded-3xl shadow-sm min-h-[400px] flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold font-outfit mb-1">Application Velocity</h3>
                <p className="text-xs text-muted-foreground">Trailing 7-day conversion distribution.</p>
              </div>
              
              <div className="flex-1 flex items-end justify-between px-2 pt-8 pb-4 relative">
                {/* Background grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pt-14 pb-8 pointer-events-none opacity-20">
                  {[0, 1, 2, 3].map(i => <div key={i} className="w-full border-t border-border border-dashed h-0" />)}
                </div>

                {chartData.map((data, i) => (
                  <div key={i} className="relative flex flex-col items-center group w-full">
                    {/* Tooltip */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-secondary text-foreground text-xs py-1 px-2 rounded-md font-bold z-10 pointer-events-none">
                      {data.count}
                    </div>
                    {/* Bar */}
                    <div 
                      className="w-12 bg-primary/20 group-hover:bg-primary/50 transition-colors rounded-t-lg border-t-2 border-primary relative z-0"
                      style={{ height: `${data.height}%` }}
                    />
                    {/* Label */}
                    <span className="text-xs text-muted-foreground mt-4 font-medium uppercase tracking-wider">{data.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Latest Submissions */}
            <div className="p-8 border border-border bg-background rounded-3xl shadow-sm min-h-[400px] flex flex-col">
              <h3 className="text-xl font-bold mb-6 font-outfit">Recent Submissions</h3>
              <div className="space-y-4 flex-1">
                {recentApps.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-sm opacity-60">
                    <FileText className="w-8 h-8 mb-4 opacity-50" />
                    <p>No applications logged yet.</p>
                  </div>
                ) : (
                  recentApps.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/20 hover:bg-secondary/50 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                          {app.full_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 pr-4">
                          <p className="font-semibold text-foreground truncate max-w-[180px]">{app.full_name}</p>
                          <p className="text-xs text-muted-foreground truncate">{app.domain}</p>
                          <p className="text-[10px] uppercase font-bold text-muted-foreground mt-1 opacity-70">
                            {formatDistanceToNow(new Date(app.created_at), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase shrink-0 ${
                        app.status === 'approved' ? 'bg-emerald-500/10 text-emerald-600' :
                        app.status === 'rejected' ? 'bg-red-500/10 text-red-600' :
                        'bg-amber-500/10 text-amber-600'
                      }`}>
                        {app.status}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
