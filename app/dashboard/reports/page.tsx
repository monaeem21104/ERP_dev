import { BarChart3, TrendingUp, PieChart, Calendar } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Analytics & Reports</h2>
          <p className="text-zinc-400 text-sm mt-1">Detailed insights into your business performance.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] text-white text-sm font-medium rounded-xl transition-all">
          <Calendar size={16} /> Last 30 Days
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placeholder Chart Card 1 */}
        <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-6 h-80 flex flex-col relative group">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-violet-400" /> Revenue Growth
            </h3>
          </div>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/[0.05] rounded-xl bg-white/[0.01]">
             <p className="text-zinc-500 text-sm font-medium">Chart visualization goes here</p>
          </div>
        </div>

        {/* Placeholder Chart Card 2 */}
        <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-6 h-80 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <PieChart size={18} className="text-fuchsia-400" /> Sales by Category
            </h3>
          </div>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/[0.05] rounded-xl bg-white/[0.01]">
             <p className="text-zinc-500 text-sm font-medium">Chart visualization goes here</p>
          </div>
        </div>
      </div>
    </div>
  );
}