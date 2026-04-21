import { User } from '../../types';
import { motion } from 'motion/react';
import { 
  User as UserIcon, 
  Mail, 
  MapPin, 
  Calendar, 
  Award, 
  TrendingUp,
  Clock,
  ChevronRight
} from 'lucide-react';

export default function StudentProfile({ user }: { user: User }) {
  const stats = [
    { label: 'Current CGPA', value: '3.85', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Credits Earned', value: '64', icon: Award, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Current Level', value: '200L', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-80 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
        >
          <div className="h-24 bg-primary relative">
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
              <img 
                src={user.avatar} 
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-white" 
              />
            </div>
          </div>
          <div className="pt-16 pb-8 px-6 text-center">
            <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
            <p className="text-sm text-slate-500 font-medium">{user.studentId}</p>
            
            <div className="mt-8 space-y-4 text-left">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                  <Mail size={16} />
                </div>
                <span className="text-sm truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                  <MapPin size={16} />
                </div>
                <span className="text-sm">{user.department}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center">
                  <Calendar size={16} />
                </div>
                <span className="text-sm">Adm. Year: 2022</span>
              </div>
            </div>

            <button className="w-full mt-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2">
              Edit Academic Profile
            </button>
          </div>
        </motion.div>

        {/* Overview Information */}
        <div className="flex-1 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
              >
                <div className={`${stat.bg} ${stat.color} w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>
                  <stat.icon size={20} />
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp size={20} className="text-primary" />
                Academic Progress Path
              </h3>
              <button className="text-sm font-semibold text-primary flex items-center gap-1 hover:underline">
                View Full History <ChevronRight size={16} />
              </button>
            </div>
            <div className="p-6">
              <div className="relative">
                {/* Custom chart visualization-like elements */}
                <div className="flex items-end gap-2 h-40">
                  {[4.2, 3.8, 4.0, 3.6, 3.9].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="relative group w-full">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${(val/5)*100}%` }}
                          className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-lg transition-all"
                        />
                        <div className="absolute inset-x-0 -top-8 text-center opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          <span className="bg-primary text-white text-[10px] px-2 py-1 rounded font-bold">GPA: {val}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{100 + Math.floor(i/2)*100}L S{ (i%2)+1 }</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold text-primary">A</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Highest Performance</p>
                    <p className="text-xs text-slate-500">CSC 101 - Introduction to Computer Science</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center font-bold text-accent">64</div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Total Units Earned</p>
                    <p className="text-xs text-slate-500">Required for Graduation: 140 Units</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
