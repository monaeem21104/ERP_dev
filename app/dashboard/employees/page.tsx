// app/dashboard/employees/page.tsx
'use client';

import { useState } from 'react';
import { UserPlus, Mail, Phone, MoreHorizontal, Edit, Trash2, X } from 'lucide-react';

// Predefined gradients for dynamic avatars
const gradients = [
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-violet-500 to-fuchsia-500',
  'from-pink-500 to-rose-500',
];

const initialEmployees = [
  { id: 1, name: 'Sarah Jenkins', role: 'Senior Developer', department: 'Engineering', email: 'sarah.j@acme.com', status: 'Active', initials: 'SJ', color: 'from-blue-500 to-cyan-500' },
  { id: 2, name: 'Michael Chen', role: 'Product Manager', department: 'Product', email: 'm.chen@acme.com', status: 'Active', initials: 'MC', color: 'from-emerald-500 to-teal-500' },
  { id: 3, name: 'Emma Watson', role: 'HR Specialist', department: 'Human Resources', email: 'emma.w@acme.com', status: 'On Leave', initials: 'EW', color: 'from-amber-500 to-orange-500' },
];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '', role: '', department: '', email: '', status: 'Active'
  });

  // Helper to generate initials from a name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Open Modal for Adding
  const handleAddClick = () => {
    setEditingId(null);
    setFormData({ name: '', role: '', department: '', email: '', status: 'Active' });
    setIsModalOpen(true);
  };

  // Open Modal for Editing
  const handleEditClick = (emp: any) => {
    setEditingId(emp.id);
    setFormData({
      name: emp.name, role: emp.role, department: emp.department, email: emp.email, status: emp.status
    });
    setIsModalOpen(true);
    setActiveDropdown(null);
  };

  // Delete Employee
  const handleDeleteClick = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
    setActiveDropdown(null);
  };

  // Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Update existing (preserve their original initials and color)
      setEmployees(employees.map(emp => 
        emp.id === editingId 
          ? { ...emp, ...formData, initials: getInitials(formData.name) } 
          : emp
      ));
    } else {
      // Create new
      const newId = Math.max(...employees.map(e => e.id), 0) + 1;
      const randomColor = gradients[Math.floor(Math.random() * gradients.length)];
      setEmployees([
        { 
          ...formData, 
          id: newId, 
          initials: getInitials(formData.name), 
          color: randomColor 
        }, 
        ...employees
      ]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Employees</h2>
          <p className="text-zinc-400 text-sm mt-1">Manage your team members and roles.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
        >
          <UserPlus size={16} /> Add Employee
        </button>
      </div>

      {/* Employee Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div key={emp.id} className="bg-[#0a0a0a] border border-white/[0.05] rounded-2xl p-6 hover:border-white/[0.1] transition-colors relative group">
             {/* Decorative glow */}
             <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-white/[0.04] transition-colors pointer-events-none" />
             
             {/* Actions Dropdown Button */}
             <div className="absolute top-4 right-4 z-10">
               <button 
                  onClick={() => setActiveDropdown(activeDropdown === emp.id ? null : emp.id)}
                  className="p-1.5 text-zinc-500 hover:text-white hover:bg-white/[0.1] rounded-lg transition-colors focus:outline-none"
               >
                 <MoreHorizontal size={18} />
               </button>
               
               {/* Dropdown Menu */}
               {activeDropdown === emp.id && (
                  <div className="absolute right-0 top-8 w-36 bg-[#121212] border border-white/[0.1] rounded-xl shadow-2xl z-20 py-1 overflow-hidden">
                    <button 
                      onClick={() => handleEditClick(emp)}
                      className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-white/[0.05] hover:text-white flex items-center gap-2 transition-colors"
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(emp.id)}
                      className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
             </div>

            {/* Card Content */}
            <div className="flex items-start justify-between mb-4 pr-8">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${emp.color} flex items-center justify-center text-white font-bold shadow-lg shrink-0`}>
                {emp.initials}
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
                emp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 
                emp.status === 'On Leave' ? 'bg-amber-500/10 text-amber-400' : 
                'bg-red-500/10 text-red-400'
              }`}>
                {emp.status}
              </span>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white truncate">{emp.name}</h3>
              <p className="text-sm text-zinc-400 truncate">{emp.role} • {emp.department}</p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/[0.05] space-y-3">
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Mail size={14} className="shrink-0" />
                <span className="truncate">{emp.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Phone size={14} className="shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/[0.1] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01]">
              <h3 className="text-lg font-semibold text-white">
                {editingId ? 'Edit Employee' : 'Add New Employee'}
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
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all"
                  placeholder="e.g. Jane Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Work Email</label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all"
                  placeholder="e.g. jane.doe@acme.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Role / Job Title</label>
                  <input 
                    required
                    type="text" 
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all"
                    placeholder="e.g. Designer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Department</label>
                  <input 
                    required
                    type="text" 
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all"
                    placeholder="e.g. Creative"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">Status</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-all appearance-none"
                >
                  <option value="Active" className="bg-[#121212]">Active</option>
                  <option value="On Leave" className="bg-[#121212]">On Leave</option>
                  <option value="Terminated" className="bg-[#121212]">Terminated</option>
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
                  {editingId ? 'Save Changes' : 'Add Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}