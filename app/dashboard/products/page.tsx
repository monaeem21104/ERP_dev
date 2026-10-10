// app/dashboard/products/page.tsx
'use client';

import { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, X } from 'lucide-react';

// Initial mock data
const initialProducts = [
  { id: 'PRD-001', name: 'MacBook Pro 16"', sku: 'APP-MBP-16', category: 'Electronics', stock: 45, price: '$2,499.00', status: 'In Stock' },
  { id: 'PRD-002', name: 'Ergonomic Office Chair', sku: 'FUR-EOC-01', category: 'Furniture', stock: 12, price: '$349.00', status: 'Low Stock' },
  { id: 'PRD-003', name: 'Wireless Noise-Cancelling', sku: 'AUD-WNC-02', category: 'Audio', stock: 0, price: '$299.00', status: 'Out of Stock' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', sku: '', category: '', stock: 0, price: '', status: 'In Stock'
  });

  // Open Modal for Adding
  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ name: '', sku: '', category: '', stock: 0, price: '', status: 'In Stock' });
    setIsModalOpen(true);
  };

  // Open Modal for Editing
  const handleEditClick = (product: any) => {
    setEditingId(product.id);
    setFormData(product);
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  // Delete Product
  const handleDeleteClick = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    setActiveDropdown(null);
  };

  // Submit Form (Add or Edit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Update existing
      setProducts(products.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
    } else {
      // Create new (generate a random ID for mock purposes)
      const newId = `PRD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      setProducts([{ ...formData, id: newId }, ...products]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Products</h2>
          <p className="text-zinc-400 text-sm mt-1">Manage your inventory and product catalog.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl overflow-visible">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/[0.05] flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all"
            />
          </div>
          <button className="px-4 py-2 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] rounded-xl text-zinc-300 text-sm font-medium flex items-center gap-2 transition-colors">
            <Filter size={16} /> Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-500 uppercase bg-white/[0.02] border-b border-white/[0.05]">
              <tr>
                <th className="px-6 py-4 font-medium">Product Name</th>
                <th className="px-6 py-4 font-medium">SKU</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 font-medium text-zinc-200">{product.name}</td>
                  <td className="px-6 py-4 text-zinc-400">{product.sku}</td>
                  <td className="px-6 py-4 text-zinc-400">{product.category}</td>
                  <td className="px-6 py-4 text-zinc-300">{product.stock}</td>
                  <td className="px-6 py-4 text-zinc-300">{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      product.status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-400' : 
                      product.status === 'Low Stock' ? 'bg-amber-500/10 text-amber-400' : 
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === product.id ? null : product.id)}
                      className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/[0.1] rounded-lg transition-colors focus:outline-none"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    
                    {/* Action Dropdown Menu */}
                    {activeDropdown === product.id && (
                      <div className="absolute right-8 top-10 w-36 bg-[#121212] border border-white/[0.1] rounded-xl shadow-2xl z-20 py-1 overflow-hidden">
                        <button 
                          onClick={() => handleEditClick(product)}
                          className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-white/[0.05] hover:text-white flex items-center gap-2 transition-colors"
                        >
                          <Edit size={14} /> Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(product.id)}
                          className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/[0.1] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01]">
              <h3 className="text-lg font-semibold text-white">
                {editingId ? 'Edit Product' : 'Add New Product'}
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
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Product Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all"
                  placeholder="e.g. Mechanical Keyboard"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">SKU</label>
                  <input 
                    required
                    type="text" 
                    value={formData.sku}
                    onChange={(e) => setFormData({...formData, sku: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all"
                    placeholder="e.g. KEY-001"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Price</label>
                  <input 
                    required
                    type="text" 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all"
                    placeholder="e.g. $149.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Stock</label>
                  <input 
                    required
                    type="number" 
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all appearance-none"
                  >
                    <option value="In Stock" className="bg-[#121212]">In Stock</option>
                    <option value="Low Stock" className="bg-[#121212]">Low Stock</option>
                    <option value="Out of Stock" className="bg-[#121212]">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Category</label>
                <input 
                  required
                  type="text" 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all"
                  placeholder="e.g. Electronics"
                />
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
                  {editingId ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}