'use client';

import { ShieldCheck, Search, Filter, History } from 'lucide-react';

const auditLogs = [
  { id: 'log-001', user: 'Rahim Khan', action: 'DELETE', resource: 'Product', resourceId: 'PRD-003', date: 'Just now', ip: '192.168.1.45' },
  { id: 'log-002', user: 'Sarah Jenkins', action: 'UPDATE', resource: 'Employee', resourceId: 'EMP-012', date: '10 mins ago', ip: '192.168.1.22' },
  { id: 'log-003', user: 'System', action: 'CREATE', resource: 'Invoice', resourceId: 'INV-2026-003', date: '1 hour ago', ip: '127.0.0.1' },
  { id: 'log-004', user: 'Michael Chen', action: 'LOGIN', resource: 'Auth', resourceId: '-', date: '3 hours ago', ip: '10.0.0.55' },
  { id: 'log-005', user: 'Rahim Khan', action: 'UPDATE', resource: 'Settings', resourceId: 'OrgInfo', date: 'Yesterday', ip: '192.168.1.45' },
];

export default function AuditLogsPage() {
  const getBadgeColor = (action: string) => {
    switch (action) {
      case 'CREATE': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'DELETE': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'UPDATE': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="text-violet-500" /> Security & Audit Logs
          </h2>
          <p className="text-zinc-400 text-sm mt-1">Immutable record of all system events and user actions.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] rounded-xl text-zinc-300 text-sm font-medium transition-colors">
          Export Logs
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/[0.05] flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Search logs by user or resource..." 
              className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-violet-500/50 transition-all"
            />
          </div>
          <button className="px-4 py-2 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] rounded-xl text-zinc-300 text-sm font-medium flex items-center gap-2 transition-colors">
            <Filter size={16} /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-500 uppercase bg-white/[0.02] border-b border-white/[0.05]">
              <tr>
                <th className="px-6 py-4 font-medium">Timestamp</th>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Action</th>
                <th className="px-6 py-4 font-medium">Resource</th>
                <th className="px-6 py-4 font-medium">Target ID</th>
                <th className="px-6 py-4 font-medium">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors font-mono text-xs sm:text-sm">
                  <td className="px-6 py-4 text-zinc-400 flex items-center gap-2">
                    <History size={14} className="text-zinc-500 hidden sm:block" /> {log.date}
                  </td>
                  <td className="px-6 py-4 font-sans font-medium text-zinc-200">{log.user}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 border rounded text-[10px] font-bold tracking-wider ${getBadgeColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-300">{log.resource}</td>
                  <td className="px-6 py-4 text-zinc-500">{log.resourceId}</td>
                  <td className="px-6 py-4 text-zinc-500">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}