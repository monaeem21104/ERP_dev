// app/dashboard/layout.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Package, 
  Building2, 
  ShoppingCart, 
  Users, 
  Briefcase, 
  Truck, 
  UserCog, 
  Key, 
  History, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu 
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Package, label: 'Products', href: '/dashboard/products' },
  { icon: Building2, label: 'Warehouses', href: '/dashboard/warehouses' },
  { icon: ShoppingCart, label: 'Sales', href: '/dashboard/sales' },
  { icon: Users, label: 'Employees', href: '/dashboard/employees' },
  { icon: Briefcase, label: 'Customers', href: '/dashboard/customers' },
  { icon: Truck, label: 'Suppliers', href: '/dashboard/suppliers' },
  { icon: UserCog, label: 'System Users', href: '/dashboard/users' },
  { icon: Key, label: 'Roles', href: '/dashboard/roles' },
  { icon: History, label: 'Audit Logs', href: '/dashboard/audit' },
  { icon: BarChart3, label: 'Reports', href: '/dashboard/reports' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#030303] text-zinc-100 font-sans selection:bg-violet-500/30">
      {/* Sidebar */}
      <div 
        className={`${
          sidebarOpen ? 'w-72' : 'w-20'
        } bg-[#0a0a0a] border-r border-white/[0.05] transition-all duration-300 ease-in-out flex flex-col relative z-20`}
      >
        <div className="h-16 flex items-center gap-3 px-6 border-b border-white/[0.05] shrink-0">
          <div className="min-w-[36px] h-9 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            <span className="font-bold text-white text-lg leading-none">E</span>
          </div>
          {sidebarOpen && (
            <h1 className="font-semibold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 whitespace-nowrap overflow-hidden">
              ModernERP
            </h1>
          )}
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-violet-500/10 text-violet-300' 
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.02]'
                }`}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-violet-500 rounded-r-full" />
                )}
                
                <item.icon 
                  size={20} 
                  className={`shrink-0 transition-colors ${
                    isActive ? 'text-violet-400' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`} 
                />
                {sidebarOpen && (
                  <span className="font-medium text-sm whitespace-nowrap overflow-hidden transition-opacity">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/[0.05] shrink-0">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl transition-all duration-200 text-zinc-400 hover:bg-red-500/10 hover:text-red-400 group">
            <LogOut size={20} className="shrink-0 text-zinc-500 group-hover:text-red-400 transition-colors" />
            {sidebarOpen && <span className="font-medium text-sm whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Subtle Background Glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

        <header className="h-16 border-b border-white/[0.05] bg-[#030303]/70 backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-10">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-2 -ml-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.05] transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          >
            <Menu size={20} />
          </button>
          
          <div className="flex items-center gap-4 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">Rahim Khan</p>
              <p className="text-xs text-zinc-500">CTO • Acme Corp</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-full flex items-center justify-center font-medium text-sm text-white ring-2 ring-transparent group-hover:ring-violet-500/30 transition-all shadow-md">
              RK
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 relative z-0">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}