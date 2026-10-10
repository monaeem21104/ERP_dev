'use client';

import { useState } from 'react';
import { ShieldAlert, Search, MoreHorizontal, Edit, Trash2, X, UserPlus, Shield } from 'lucide-react';

const initialUsers = [
  { id: 'USR-1', firstName: 'Rahim', lastName: 'Khan', email: 'rahim@acme.com', role: 'ADMIN', status: 'Active' },
  { id: 'USR-2', firstName: 'Sarah', lastName: 'Jenkins', email: 'sarah.j@acme.com', role: 'MANAGER', status: 'Active' },
  { id: 'USR-3', firstName: 'Guest', lastName: 'Account', email: 'guest@acme.com', role: 'VIEWER', status: 'Inactive' },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', role: 'MEMBER', status: 'Active' });

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ firstName: '', lastName: '', email: '', role: 'MEMBER', status: 'Active' });
    setIsModalOpen(true);
  };

  const handleEditClick = (u: any) => {
    setEditingId(u.id);
    setFormData({ firstName: u.firstName, lastName: u.lastName, email: u.email, role: u.role, status: u.status });
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const handleDeleteClick = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
    setActiveDropdown(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...formData, id: editingId } : u));
    } else {
      const newId = `USR-${users.length + 1}`;
      setUsers([{ ...formData, id: newId }, ...users]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            System Users
          </h2>
          <p className="text-zinc-400 text-sm mt-1">Manage system logins, roles, and access permissions.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
        >
          <UserPlus size={16} /> Invite User
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl overflow-visible">
        <div className="p-4 border-b border-white/[0.05]">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Search system users..." 
              className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-violet-500/50 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-500 uppercase bg-white/[0.02] border-b border-white/[0.05]">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">System Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-xs font-bold text-white">
                        {u.firstName[0]}{u.lastName[0]}
                      </div>
                      <span className="font-medium text-zinc-200">{u.firstName} {u.lastName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">{u.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-zinc-300">
                      <Shield size={14} className={u.role === 'ADMIN' ? 'text-violet-500' : 'text-zinc-500'} />
                      <span className="text-xs font-bold tracking-wider">{u.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      u.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === u.id ? null : u.id)}
                      className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/[0.1] rounded-lg transition-colors focus:outline-none"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {activeDropdown === u.id && (
                      <div className="absolute right-8 top-10 w-36 bg-[#121212] border border-white/[0.1] rounded-xl shadow-2xl z-20 py-1 overflow-hidden">
                        <button onClick={() => handleEditClick(u)} className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-white/[0.05] hover:text-white flex items-center gap-2"><Edit size={14} /> Manage</button>
                        <button onClick={() => handleDeleteClick(u.id)} className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"><Trash2 size={14} /> Revoke</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/[0.1] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01]">
              <h3 className="text-lg font-semibold text-white">{editingId ? 'Manage User' : 'Invite New User'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">First Name</label>
                  <input required type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Last Name</label>
                  <input required type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Login Email</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Access Role</label>
                  <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 appearance-none">
                    <option value="OWNER" className="bg-[#121212]">Owner</option>
                    <option value="ADMIN" className="bg-[#121212]">Admin</option>
                    <option value="MANAGER" className="bg-[#121212]">Manager</option>
                    <option value="MEMBER" className="bg-[#121212]">Member</option>
                    <option value="VIEWER" className="bg-[#121212]">Viewer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Account Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 appearance-none">
                    <option value="Active" className="bg-[#121212]">Active</option>
                    <option value="Inactive" className="bg-[#121212]">Inactive</option>
                  </select>
                </div>
              </div>
              
              {!editingId && (
                <div className="mt-4 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 flex gap-3 items-start">
                  <ShieldAlert size={16} className="text-violet-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-violet-200">An email invitation will be sent to this user with a temporary password to access the ERP system.</p>
                </div>
              )}

              <div className="pt-4 flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-zinc-300 hover:text-white bg-white/[0.02] border border-white/[0.05] rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                  {editingId ? 'Save Configuration' : 'Send Invite'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}