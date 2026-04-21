import { Outlet, Link, useLocation } from 'react-router-dom';
import { User as UserType } from '../../types';
import { 
  BarChart3, 
  Users, 
  ClipboardCheck, 
  Settings, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  ShieldCheck
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LecturerDashboard({ user, logout }: { user: UserType, logout: () => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Upload Results', path: '/', icon: ClipboardCheck },
    { name: 'Student List', path: '/students', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={`fixed inset-y-0 left-0 w-72 bg-slate-900 text-slate-300 z-50 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-white leading-tight truncate">OCI University</h2>
              <p className="text-xs text-slate-400">Lecturer Dashboard</p>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="ml-auto lg:hidden text-slate-400">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                      : 'hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="bg-white/5 rounded-2xl p-4 mb-4 flex items-center gap-3">
              <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-accent/20" />
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.department}</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-all"
            >
              <LogOut size={18} />
              Switch to Student View
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col lg:pl-72">
        <header className="h-16 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg"
          >
            <Menu size={24} />
          </button>

          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-slate-800">Welcome, {user.name}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Session</p>
              <p className="text-sm font-bold text-slate-700">2023/2024 - Semester 1</p>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
