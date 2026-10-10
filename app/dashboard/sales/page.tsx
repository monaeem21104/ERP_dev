// app/dashboard/sales/page.tsx
'use client';

import { useState } from 'react';
import { Receipt, Download, ArrowRight, MoreHorizontal, Edit, Trash2, X, Plus } from 'lucide-react';

const initialSales = [
  { id: 'INV-2026-001', customer: 'Global Industries', date: 'May 1, 2026', amount: '$12,450.00', status: 'Paid' },
  { id: 'INV-2026-002', customer: 'Stark Enterprises', date: 'Apr 28, 2026', amount: '$8,200.00', status: 'Pending' },
  { id: 'INV-2026-003', customer: 'Wayne Corp', date: 'Apr 25, 2026', amount: '$45,000.00', status: 'Overdue' },
];

export default function SalesPage() {
  const [sales, setSales] = useState(initialSales);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customer: '', date: '', amount: '', status: 'Pending'
  });

  // Get today's date formatted nicely (e.g., "May 1, 2026")
  const getTodayDate = () => {
    return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Open Modal for Adding
  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ customer: '', date: getTodayDate(), amount: '', status: 'Pending' });
    setIsModalOpen(true);
  };

  // Open Modal for Editing
  const handleEditClick = (sale: any) => {
    setEditingId(sale.id);
    setFormData({ customer: sale.customer, date: sale.date, amount: sale.amount, status: sale.status });
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  // Delete Sale
  const handleDeleteClick = (id: string) => {
    setSales(sales.filter(s => s.id !== id));
    setActiveDropdown(null);
  };

  // Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure amount starts with a $ if not provided
    const formattedAmount = formData.amount.startsWith('$') ? formData.amount : `$${formData.amount}`;

    if (editingId) {
      // Update existing
      setSales(sales.map(s => 
        s.id === editingId ? { ...formData, id: editingId, amount: formattedAmount } : s
      ));
    } else {
      // Create new with random ID
      const newId = `INV-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      setSales([{ ...formData, id: newId, amount: formattedAmount }, ...sales]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Sales & Invoices</h2>
          <p className="text-zinc-400 text-sm mt-1">Track revenue and manage customer invoices.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
        >
          <Plus size={16} /> Create Invoice
        </button>
      </div>

      {/* Transactions List */}
      <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl overflow-visible min-h-[400px]">
        <div className="p-6 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01]">
          <h3 className="font-semibold text-white">Recent Transactions</h3>
          <button className="text-sm text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 transition-colors">
            View Report <ArrowRight size={14} />
          </button>
        </div>
        
        <div className="divide-y divide-white/[0.05]">
          {sales.map((sale) => (
            <div key={sale.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors relative group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center shrink-0">
                  <Receipt size={18} className="text-zinc-400 group-hover:text-violet-400 transition-colors" />
                </div>
                <div>
                  <h4 className="text-zinc-200 font-medium">{sale.customer}</h4>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                    <span className="font-mono text-zinc-400">{sale.id}</span>
                    <span>•</span>
                    <span>{sale.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-6 pl-14 sm:pl-0">
                <div className="text-left sm:text-right">
                  <p className="text-white font-semibold">{sale.amount}</p>
                  <p className={`text-xs mt-1 font-medium ${
                    sale.status === 'Paid' ? 'text-emerald-400' :
                    sale.status === 'Pending' ? 'text-amber-400' : 'text-red-400'
                  }`}>{sale.status}</p>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2 relative">
                  <button className="p-2 text-zinc-500 hover:text-white hover:bg-white/[0.1] rounded-lg transition-colors" title="Download PDF">
                    <Download size={18} />
                  </button>
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === sale.id ? null : sale.id)}
                    className="p-2 text-zinc-500 hover:text-white hover:bg-white/[0.1] rounded-lg transition-colors focus:outline-none"
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {/* Dropdown Menu */}
                  {activeDropdown === sale.id && (
                    <div className="absolute right-0 top-10 w-36 bg-[#121212] border border-white/[0.1] rounded-xl shadow-2xl z-20 py-1 overflow-hidden">
                      <button 
                        onClick={() => handleEditClick(sale)}
                        className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-white/[0.05] hover:text-white flex items-center gap-2 transition-colors"
                      >
                        <Edit size={14} /> Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(sale.id)}
                        className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Invoice Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/[0.1] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01]">
              <h3 className="text-lg font-semibold text-white">
                {editingId ? 'Edit Invoice' : 'Create New Invoice'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Customer / Company Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.customer}
                  onChange={(e) => setFormData({...formData, customer: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all"
                  placeholder="e.g. Acme Corp"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Amount</label>
                  <input 
                    required
                    type="text" 
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all"
                    placeholder="e.g. 5000.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Date</label>
                  <input 
                    required
                    type="text" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all"
                    placeholder="e.g. May 1, 2026"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Payment Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all appearance-none"
                >
                  <option value="Pending" className="bg-[#121212]">Pending</option>
                  <option value="Paid" className="bg-[#121212]">Paid</option>
                  <option value="Overdue" className="bg-[#121212]">Overdue</option>
                </select>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 flex justify-end gap-3 mt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
                >
                  {editingId ? 'Save Changes' : 'Generate Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}