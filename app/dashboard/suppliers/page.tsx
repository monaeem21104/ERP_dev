'use client';

import { useState } from 'react';
import { Truck, Search, MoreHorizontal, Edit, Trash2, X, Plus, Mail, Phone, MapPin } from 'lucide-react';

const initialSuppliers = [
  { id: 'SUP-001', name: 'Apex Electronics Mfg', email: 'orders@apexelectronics.com', phone: '+1 (555) 992-1020', address: 'Shenzhen, China' },
  { id: 'SUP-002', name: 'OfficeStyle Furniture', email: 'wholesale@officestyle.net', phone: '+1 (555) 443-2211', address: 'Grand Rapids, MI' },
];

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ name: '', email: '', phone: '', address: '' });
    setIsModalOpen(true);
  };

  const handleEditClick = (s: any) => {
    setEditingId(s.id);
    setFormData({ name: s.name, email: s.email, phone: s.phone, address: s.address });
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const handleDeleteClick = (id: string) => {
    setSuppliers(suppliers.filter(s => s.id !== id));
    setActiveDropdown(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setSuppliers(suppliers.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
    } else {
      const newId = `SUP-00${suppliers.length + 1}`;
      setSuppliers([{ ...formData, id: newId }, ...suppliers]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Suppliers</h2>
          <p className="text-zinc-400 text-sm mt-1">Manage vendor details and supply chain contacts.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
        >
          <Plus size={16} /> Add Supplier
        </button>
      </div>

      <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl overflow-visible">
        <div className="p-4 border-b border-white/[0.05]">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Search suppliers..." 
              className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-violet-500/50 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-500 uppercase bg-white/[0.02] border-b border-white/[0.05]">
              <tr>
                <th className="px-6 py-4 font-medium">Vendor Name</th>
                <th className="px-6 py-4 font-medium">Contact Details</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {suppliers.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/[0.05] flex items-center justify-center shrink-0">
                        <Truck size={14} className="text-zinc-400" />
                      </div>
                      <div>
                        <p className="font-medium text-zinc-200">{s.name}</p>
                        <p className="text-xs text-zinc-500">{s.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-zinc-400"><Mail size={12} /> {s.email}</div>
                      <div className="flex items-center gap-2 text-zinc-400"><Phone size={12} /> {s.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">
                    <div className="flex items-center gap-2"><MapPin size={12} /> {s.address}</div>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === s.id ? null : s.id)}
                      className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/[0.1] rounded-lg transition-colors focus:outline-none"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {activeDropdown === s.id && (
                      <div className="absolute right-8 top-10 w-36 bg-[#121212] border border-white/[0.1] rounded-xl shadow-2xl z-20 py-1 overflow-hidden">
                        <button onClick={() => handleEditClick(s)} className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-white/[0.05] hover:text-white flex items-center gap-2"><Edit size={14} /> Edit</button>
                        <button onClick={() => handleDeleteClick(s.id)} className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"><Trash2 size={14} /> Delete</button>
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
              <h3 className="text-lg font-semibold text-white">{editingId ? 'Edit Supplier' : 'Add New Supplier'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Supplier / Company Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email Address</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Phone Number</label>
                  <input required type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Location / Address</label>
                  <input required type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50" />
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