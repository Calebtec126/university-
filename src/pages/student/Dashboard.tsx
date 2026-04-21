import { Outlet, Link, useLocation } from 'react-router-dom';
import { User as UserType } from '../../types';
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  User, 
  LogOut, 
  Bell, 
  Menu, 
  X,
  Search,
  CreditCard
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  user: UserType;
  logout: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function Sidebar({ user, logout, isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();
  
  const navItems = [
    { name: 'Profile Overview', path: '/', icon: User },
    { name: 'Session Results', path: '/results', icon: FileText },
    { name: 'Course Registration', path: '/registration', icon: BookOpen },
    { name: 'Fee Payments', path: '/payments', icon: CreditCard },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <div className={`fixed inset-y-0 left-0 w-72 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
              <BookOpen size={24} />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-primary leading-tight truncate">OCI University</h2>
              <p className="text-xs text-slate-500">Student Portal</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="ml-auto lg:hidden text-slate-500">
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
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-50 rounded-2xl p-4 mb-4 flex items-center gap-3">
              <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.studentId}</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function StudentDashboard({ user, logout }: { user: UserType, logout: () => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar user={user} logout={logout} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col lg:pl-72">
        <header className="h-16 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg"
          >
            <Menu size={24} />
          </button>

          <div className="flex-1 max-w-md hidden md:block px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search courses, results..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">{user.department}</p>
                <p className="text-[10px] text-slate-500">{user.level} LEVEL</p>
              </div>
              <img src={user.avatar} className="w-8 h-8 rounded-full border border-slate-200" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
