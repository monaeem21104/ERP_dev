'use client';

import { useState } from 'react';
import { Building2, MapPin, Plus, MoreHorizontal, Edit, Trash2, X, Package } from 'lucide-react';

const initialWarehouses = [
  { id: 'WH-01', name: 'Central Distribution Hub', location: 'New York, NY', isDefault: true, stockItems: 12450 },
  { id: 'WH-02', name: 'West Coast Transit', location: 'Los Angeles, CA', isDefault: false, stockItems: 8200 },
  { id: 'WH-03', name: 'EU Logistics Center', location: 'Frankfurt, Germany', isDefault: false, stockItems: 4100 },
];

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState(initialWarehouses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', location: '', isDefault: false });

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ name: '', location: '', isDefault: false });
    setIsModalOpen(true);
  };

  const handleEditClick = (wh: any) => {
    setEditingId(wh.id);
    setFormData({ name: wh.name, location: wh.location, isDefault: wh.isDefault });
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const handleDeleteClick = (id: string) => {
    setWarehouses(warehouses.filter(w => w.id !== id));
    setActiveDropdown(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // If setting this as default, remove default from others
    const updatedWarehouses = formData.isDefault 
      ? warehouses.map(w => ({ ...w, isDefault: false })) 
      : warehouses;

    if (editingId) {
      setWarehouses(updatedWarehouses.map(w => w.id === editingId ? { ...w, ...formData } : w));
    } else {
      const newId = `WH-0${warehouses.length + 1}`;
      setWarehouses([{ ...formData, id: newId, stockItems: 0 }, ...updatedWarehouses]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Warehouses</h2>
          <p className="text-zinc-400 text-sm mt-1">Manage storage locations and inventory distribution.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
        >
          <Plus size={16} /> Add Warehouse
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouses.map((wh) => (
          <div key={wh.id} className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-6 hover:border-white/[0.1] transition-colors relative group overflow-hidden">
            <div className="absolute top-4 right-4 z-10">
               <button 
                  onClick={() => setActiveDropdown(activeDropdown === wh.id ? null : wh.id)}
                  className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/[0.1] rounded-lg transition-colors"
               >
                 <MoreHorizontal size={18} />
               </button>
               {activeDropdown === wh.id && (
                  <div className="absolute right-0 top-8 w-36 bg-[#121212] border border-white/[0.1] rounded-xl shadow-2xl z-20 py-1">
                    <button onClick={() => handleEditClick(wh)} className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-white/[0.05] hover:text-white flex items-center gap-2">
                      <Edit size={14} /> Edit
                    </button>
                    <button onClick={() => handleDeleteClick(wh.id)} className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
             </div>

            <div className="flex items-start gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                wh.isDefault ? 'bg-violet-500/10 border-violet-500/20 text-violet-400' : 'bg-white/[0.02] border-white/[0.05] text-zinc-400'
              }`}>
                <Building2 size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">{wh.name}</h3>
                  {wh.isDefault && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-violet-500 text-white uppercase tracking-wider">Default</span>}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-zinc-400 mt-1">
                  <MapPin size={14} /> {wh.location}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-300">
                <Package size={16} className="text-zinc-500" />
                <span className="font-medium text-white">{wh.stockItems.toLocaleString()}</span>
                <span className="text-sm text-zinc-500">items in stock</span>
              </div>
              <button className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">
                View Stock
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/[0.1] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01]">
              <h3 className="text-lg font-semibold text-white">{editingId ? 'Edit Warehouse' : 'Add Warehouse'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Warehouse Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:border-violet-500/50 outline-none" placeholder="e.g. South Wing Storage" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Location / Address</label>
                <input required type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:border-violet-500/50 outline-none" placeholder="e.g. Austin, TX" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer mt-4">
                <input type="checkbox" checked={formData.isDefault} onChange={(e) => setFormData({...formData, isDefault: e.target.checked})} className="w-4 h-4 rounded border-white/[0.1] text-violet-600 focus:ring-violet-500/50 bg-white/[0.02]" />
                <span className="text-sm text-zinc-300">Set as Primary/Default Warehouse</span>
              </label>
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