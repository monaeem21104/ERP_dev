'use client';

import { useState } from 'react';
import { Shield, Key, Plus, MoreHorizontal, Edit, Trash2, X, Check } from 'lucide-react';

// Mock data based on your Prisma schema
const resources = ['Products', 'Employees', 'Sales', 'Customers', 'Warehouses'];
const actions = ['read', 'create', 'update', 'delete'];

const initialRoles = [
  { 
    id: 'ROLE-001', 
    name: 'System Admin', 
    description: 'Full access to all system features and settings.', 
    isSystem: true, 
    usersCount: 2 
  },
  { 
    id: 'ROLE-002', 
    name: 'Sales Manager', 
    description: 'Can manage sales, customers, and view products. Cannot delete records.', 
    isSystem: false, 
    usersCount: 5 
  },
  { 
    id: 'ROLE-003', 
    name: 'Warehouse Staff', 
    description: 'Can view and update stock levels. No access to financial data.', 
    isSystem: false, 
    usersCount: 12 
  },
];

export default function RolesPermissionsPage() {
  const [roles, setRoles] = useState(initialRoles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  
  // State for the permission matrix (checkboxes)
  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>({});

  // Initialize empty permissions matrix
  const initializePermissions = () => {
    const initialPerms: Record<string, Record<string, boolean>> = {};
    resources.forEach(res => {
      initialPerms[res] = {};
      actions.forEach(act => {
        initialPerms[res][act] = false;
      });
    });
    return initialPerms;
  };

  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ name: '', description: '' });
    setPermissions(initializePermissions());
    setIsModalOpen(true);
  };

  const handleEditClick = (role: any) => {
    if (role.isSystem) return; // Prevent editing system roles in UI
    setEditingId(role.id);
    setFormData({ name: role.name, description: role.description });
    // In a real app, you'd fetch their existing permissions here. 
    // We'll just initialize a blank/mock one for the demo.
    setPermissions(initializePermissions()); 
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  const handleDeleteClick = (id: string, isSystem: boolean) => {
    if (isSystem) return; // Prevent deleting system roles
    setRoles(roles.filter(r => r.id !== id));
    setActiveDropdown(null);
  };

  const togglePermission = (resource: string, action: string) => {
    setPermissions(prev => ({
      ...prev,
      [resource]: {
        ...prev[resource],
        [action]: !prev[resource][action]
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setRoles(roles.map(r => r.id === editingId ? { ...r, ...formData } : r));
    } else {
      const newId = `ROLE-00${roles.length + 1}`;
      setRoles([{ ...formData, id: newId, isSystem: false, usersCount: 0 }, ...roles]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Key className="text-violet-500" /> Roles & Permissions
          </h2>
          <p className="text-zinc-400 text-sm mt-1">Configure custom access levels and security policies.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
        >
          <Plus size={16} /> Create Custom Role
        </button>
      </div>

      {/* Roles List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-6 hover:border-white/[0.1] transition-colors relative group flex flex-col">
            
            {/* Dropdown Menu (Only for non-system roles) */}
            {!role.isSystem && (
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === role.id ? null : role.id)}
                  className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/[0.1] rounded-lg transition-colors focus:outline-none"
                >
                  <MoreHorizontal size={18} />
                </button>
                {activeDropdown === role.id && (
                  <div className="absolute right-0 top-8 w-36 bg-[#121212] border border-white/[0.1] rounded-xl shadow-2xl z-20 py-1 overflow-hidden">
                    <button onClick={() => handleEditClick(role)} className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-white/[0.05] hover:text-white flex items-center gap-2"><Edit size={14} /> Edit Role</button>
                    <button onClick={() => handleDeleteClick(role.id, role.isSystem)} className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"><Trash2 size={14} /> Delete Role</button>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                role.isSystem ? 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-400' : 'bg-violet-500/10 border-violet-500/20 text-violet-400'
              }`}>
                <Shield size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">{role.name}</h3>
                  {role.isSystem && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30 uppercase tracking-wider">System</span>}
                </div>
                <p className="text-xs text-zinc-500 font-mono mt-1">{role.id}</p>
              </div>
            </div>

            <p className="text-sm text-zinc-400 flex-1 mb-6 leading-relaxed">
              {role.description}
            </p>

            <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between">
              <div className="flex -space-x-2">
                {[...Array(Math.min(role.usersCount, 3))].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-[#0a0a0a] flex items-center justify-center text-[10px] font-bold text-zinc-400">
                    U
                  </div>
                ))}
                {role.usersCount > 3 && (
                  <div className="w-8 h-8 rounded-full bg-white/[0.05] border-2 border-[#0a0a0a] flex items-center justify-center text-xs font-medium text-zinc-300">
                    +{role.usersCount - 3}
                  </div>
                )}
                {role.usersCount === 0 && (
                  <span className="text-sm text-zinc-500">No users assigned</span>
                )}
              </div>
              <button className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors">
                View Users
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Role Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/[0.1] rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-4 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01] shrink-0">
              <h3 className="text-lg font-semibold text-white">
                {editingId ? 'Edit Role Permissions' : 'Create Custom Role'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
              <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                
                {/* Role Details */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-white border-b border-white/[0.05] pb-2">Role Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Role Name</label>
                      <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50" placeholder="e.g. Marketing Lead" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">Description</label>
                      <input required type="text" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50" placeholder="Brief explanation of access..." />
                    </div>
                  </div>
                </div>

                {/* Permissions Matrix */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-white border-b border-white/[0.05] pb-2">Resource Permissions</h4>
                  
                  <div className="border border-white/[0.05] rounded-xl overflow-hidden bg-white/[0.01]">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-white/[0.02] border-b border-white/[0.05]">
                        <tr>
                          <th className="px-4 py-3 font-medium text-zinc-300 w-1/3">Resource module</th>
                          {actions.map(action => (
                            <th key={action} className="px-4 py-3 font-medium text-zinc-300 text-center capitalize">{action}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.05]">
                        {resources.map(resource => (
                          <tr key={resource} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-4 py-3 font-medium text-zinc-200">{resource}</td>
                            {actions.map(action => (
                              <td key={action} className="px-4 py-3 text-center">
                                <label className="inline-flex items-center cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    className="hidden"
                                    checked={permissions[resource]?.[action] || false}
                                    onChange={() => togglePermission(resource, action)}
                                  />
                                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                                    permissions[resource]?.[action] 
                                      ? 'bg-violet-600 border-violet-600 text-white shadow-[0_0_10px_rgba(139,92,246,0.3)]' 
                                      : 'bg-white/[0.02] border-white/[0.1] text-transparent hover:border-violet-500/50'
                                  }`}>
                                    <Check size={12} strokeWidth={3} />
                                  </div>
                                </label>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Modal Actions */}
              <div className="px-6 py-4 border-t border-white/[0.05] bg-white/[0.01] flex justify-end gap-3 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white bg-white/[0.02] border border-white/[0.05] rounded-xl transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all">
                  {editingId ? 'Save Configuration' : 'Create Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}