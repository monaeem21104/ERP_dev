// app/dashboard/page.tsx
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, Package, CreditCard, Activity } from 'lucide-react';

// Mock data (You would replace this with real Prisma queries later)
const kpis = [
  { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', isPositive: true, icon: DollarSign },
  { title: 'Active Employees', value: '1,204', change: '+4.5%', isPositive: true, icon: Users },
  { title: 'Products in Stock', value: '12,234', change: '-2.1%', isPositive: false, icon: Package },
  { title: 'Active Customers', value: '573', change: '+12.5%', isPositive: true, icon: CreditCard },
];

const recentActivity = [
  { id: 1, action: 'Invoice Paid', user: 'TechNova Solutions', amount: '+$1,250.00', time: '2 mins ago', status: 'Completed' },
  { id: 2, action: 'New Employee Added', user: 'Sarah Jenkins', amount: '-', time: '1 hour ago', status: 'Processed' },
  { id: 3, action: 'Restock Alert', user: 'Warehouse B', amount: '-$840.00', time: '3 hours ago', status: 'Pending' },
  { id: 4, action: 'Subscription Renewed', user: 'Acme Corp', amount: '+$5,000.00', time: '5 hours ago', status: 'Completed' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 fade-in">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Dashboard Overview</h2>
          <p className="text-zinc-400 text-sm mt-1">Welcome back. Here is what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] text-zinc-300 text-sm font-medium rounded-xl transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all">
            New Transaction
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-[#0a0a0a] border border-white/[0.05] p-6 rounded-2xl relative overflow-hidden group">
            {/* Subtle top border glow on hover */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                <kpi.icon size={20} className="text-zinc-400" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                kpi.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {kpi.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {kpi.change}
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-1">{kpi.value}</h3>
              <p className="text-zinc-500 text-sm font-medium">{kpi.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Wider) - Recent Activity */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <button className="text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center border border-white/[0.05]">
                    <Activity size={18} className="text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-200">{activity.action}</p>
                    <p className="text-xs text-zinc-500">{activity.user}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{activity.amount}</p>
                  <p className="text-xs text-zinc-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Narrower) - Quick Actions / System Status */}
        <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">System Status</h3>
          
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Database Load</span>
                <span className="text-zinc-200 font-medium">32%</span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden">
                <div className="bg-violet-500 h-2 rounded-full w-[32%]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Storage Capacity</span>
                <span className="text-zinc-200 font-medium">78%</span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden">
                <div className="bg-fuchsia-500 h-2 rounded-full w-[78%]" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Server Response</span>
                <span className="text-emerald-400 font-medium">124ms</span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full w-[15%]" />
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-violet-400 animate-pulse" />
              <div>
                <p className="text-sm font-medium text-violet-300">All systems operational</p>
                <p className="text-xs text-violet-400/70 mt-1">Last checked: 2 mins ago</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}