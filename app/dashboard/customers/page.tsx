'use client';

import { useState } from 'react';
import { Users, Search, MoreHorizontal, Edit, Trash2, X, Plus, Mail, Phone } from 'lucide-react';

const initialCustomers = [
  { id: 'CUST-001', name: 'TechNova Solutions', email: 'billing@technova.io', phone: '+1 (555) 019-2834', creditLimit: '$50,000' },
  { id: 'CUST-002', name: 'Acme Corp', email: 'accounts@acme.com', phone: '+1 (555) 837-1122', creditLimit: '$100,000' },
  { id: 'CUST-003', name: 'Global Industries', email: 'finance@globalind.net', phone: '+44 20 7123 4567', creditLimit: '$25,000' },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', creditLimit: '' });

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ name: '', email: '', phone: '', creditLimit: '' });
    setIsModalOpen(true);
  };

  const handleEditClick = (c: any) => {
    setEditingId(c.id);
    setFormData({ name: c.name, email: c.email, phone: c.phone, creditLimit: c.creditLimit });
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const handleDeleteClick = (id: string) => {
    setCustomers(customers.filter(c => c.id !== id));
    setActiveDropdown(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedLimit = formData.creditLimit.startsWith('$') ? formData.creditLimit : `$${formData.creditLimit}`;

    if (editingId) {
      setCustomers(customers.map(c => c.id === editingId ? { ...formData, id: editingId, creditLimit: formattedLimit } : c));
    } else {
      const newId = `CUST-00${customers.length + 1}`;
      setCustomers([{ ...formData, id: newId, creditLimit: formattedLimit }, ...customers]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Customers</h2>
          <p className="text-zinc-400 text-sm mt-1">Manage your client relationships and credit limits.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
        >
          <Plus size={16} /> Add Customer
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl overflow-visible">
        <div className="p-4 border-b border-white/[0.05]">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-violet-500/50 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-500 uppercase bg-white/[0.02] border-b border-white/[0.05]">
              <tr>
                <th className="px-6 py-4 font-medium">Company / Name</th>
                <th className="px-6 py-4 font-medium">Contact Details</th>
                <th className="px-6 py-4 font-medium">Credit Limit</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/[0.05] flex items-center justify-center shrink-0">
                        <Users size={14} className="text-zinc-400" />
                      </div>
                      <div>
                        <p className="font-medium text-zinc-200">{c.name}</p>
                        <p className="text-xs text-zinc-500">{c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-zinc-400"><Mail size={12} /> {c.email}</div>
                      <div className="flex items-center gap-2 text-zinc-400"><Phone size={12} /> {c.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-medium border border-emerald-500/20">
                      {c.creditLimit}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === c.id ? null : c.id)}
                      className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/[0.1] rounded-lg transition-colors focus:outline-none"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {activeDropdown === c.id && (
                      <div className="absolute right-8 top-10 w-36 bg-[#121212] border border-white/[0.1] rounded-xl shadow-2xl z-20 py-1 overflow-hidden">
                        <button onClick={() => handleEditClick(c)} className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-white/[0.05] hover:text-white flex items-center gap-2"><Edit size={14} /> Edit</button>
                        <button onClick={() => handleDeleteClick(c.id)} className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"><Trash2 size={14} /> Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/[0.1] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01]">
              <h3 className="text-lg font-semibold text-white">{editingId ? 'Edit Customer' : 'Add New Customer'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Company Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email Address</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Phone Number</label>
                  <input required type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Credit Limit</label>
                  <input required type="text" value={formData.creditLimit} onChange={(e) => setFormData({...formData, creditLimit: e.target.value})} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50" placeholder="e.g. 50000" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-zinc-300 hover:text-white bg-white/[0.02] border border-white/[0.05] rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}