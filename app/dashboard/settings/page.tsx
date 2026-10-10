import { Building2, Bell, Shield, Paintbrush } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Settings</h2>
        <p className="text-zinc-400 text-sm mt-1">Manage your organization preferences and configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation */}
        <nav className="w-full md:w-64 space-y-1 shrink-0">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-violet-500/10 text-violet-300 font-medium text-sm">
            <Building2 size={18} /> Organization Info
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.02] font-medium text-sm transition-colors">
            <Shield size={18} /> Security
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.02] font-medium text-sm transition-colors">
            <Bell size={18} /> Notifications
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.02] font-medium text-sm transition-colors">
            <Paintbrush size={18} /> Appearance
          </a>
        </nav>

        {/* Settings Content Area */}
        <div className="flex-1 bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-white mb-6">Organization Details</h3>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Company Name</label>
                <input 
                  type="text" 
                  defaultValue="Acme Corp" 
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Contact Email</label>
                <input 
                  type="email" 
                  defaultValue="admin@acme.com" 
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Address</label>
              <textarea 
                rows={3}
                defaultValue="123 Innovation Drive, Tech District, San Francisco, CA" 
                className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all resize-none"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button type="button" className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}