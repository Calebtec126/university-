import { useState } from 'react';
import { User, Course } from '../../types';
import { mockCourses } from '../../mockData';
import { motion, AnimatePresence } from 'motion/react';
import { BookPlus, CheckCircle2, ChevronRight, Info, BookCheck } from 'lucide-react';

export default function CourseRegistration({ user }: { user: User }) {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isRegistered, setIsRegistered] = useState(false);

  const availableCourses = mockCourses.filter(c => c.level === user.level && c.semester === 1);
  const totalUnits = availableCourses
    .filter(c => selectedCourses.includes(c.id))
    .reduce((acc, c) => acc + c.units, 0);

  const toggleCourse = (id: string) => {
    setSelectedCourses(prev => 
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  const handleRegister = () => {
    if (selectedCourses.length === 0) return;
    setIsRegistered(true);
  };

  if (isRegistered) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto py-12 text-center space-y-6"
      >
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-green-50 shadow-sm">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Registration Successful!</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          Your course registration for the 2023/2024 academic session (Semester 1) has been submitted for approval by your departmental coordinator.
        </p>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 text-left space-y-4 shadow-sm">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Transaction Details</p>
          <div className="flex justify-between items-center py-2 border-b border-slate-50">
            <span className="text-slate-600">Reference Number</span>
            <span className="font-mono font-bold text-slate-900">OCI/REG/2024/9821</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-50">
            <span className="text-slate-600">Total Courses</span>
            <span className="font-bold text-slate-900">{selectedCourses.length} Courses</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-slate-600">Total Units</span>
            <span className="font-bold text-primary">{totalUnits} Units</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <button className="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
            Download Course Form
          </button>
          <button 
            onClick={() => setIsRegistered(false)}
            className="px-8 py-3 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Course Registration</h2>
          <p className="text-slate-500">Pick courses for the current academic session.</p>
        </div>
        <div className="bg-primary/5 px-4 py-2 rounded-xl border border-primary/10 flex items-center gap-3">
          <BookPlus size={20} className="text-primary" />
          <div className="text-left">
            <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Registration Status</p>
            <p className="text-xs font-bold text-slate-700">OPEN: 2023/2024 Session</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-start gap-3">
            <Info className="text-blue-600 shrink-0 mt-0.5" size={20} />
            <p className="text-sm text-blue-700 leading-relaxed">
              Minimum units allowed: <span className="font-bold">12</span>. 
              Maximum units allowed: <span className="font-bold">24</span>. 
              Please ensure you register for all core courses first.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Available Courses ({user.level}L - Semester 1)</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {availableCourses.map((course) => {
                const isSelected = selectedCourses.includes(course.id);
                return (
                  <div 
                    key={course.id}
                    onClick={() => toggleCourse(course.id)}
                    className={`p-6 flex items-center gap-4 cursor-pointer transition-all ${
                      isSelected ? 'bg-primary/5' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                      isSelected ? 'bg-primary border-primary text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <CheckCircle2 size={14} strokeWidth={3} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">{course.code}: {course.title}</p>
                      <p className="text-xs text-slate-500 font-medium">{course.units} Units • Core Course</p>
                    </div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:block">
                      {course.units > 3 ? 'Heavy' : 'Standard'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <BookCheck size={20} className="text-primary" />
              Registration Summary
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Selected Courses</span>
                <span className="font-bold text-slate-900">{selectedCourses.length}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Total Units</span>
                <span className={`font-bold ${totalUnits > 24 ? 'text-red-600' : 'text-primary'}`}>
                  {totalUnits} / 24
                </span>
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <div className="bg-slate-50 p-4 rounded-2xl space-y-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Selected Breakdown</p>
                  {selectedCourses.length > 0 ? (
                    <div className="max-h-40 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                      {selectedCourses.map(id => {
                        const c = mockCourses.find(course => course.id === id);
                        return (
                          <div key={id} className="flex justify-between text-xs">
                            <span className="text-slate-600 font-bold">{c?.code}</span>
                            <span className="text-slate-400">{c?.units} Units</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 text-center py-4 italic">No courses selected yet</p>
                  )}
                </div>
              </div>

              <button 
                onClick={handleRegister}
                disabled={selectedCourses.length === 0 || totalUnits > 24}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                  selectedCourses.length === 0 || totalUnits > 24
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : 'bg-primary text-white shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                Complete Registration
                <ChevronRight size={18} />
              </button>
              
              {totalUnits > 24 && (
                <p className="text-[10px] text-red-500 font-bold text-center">You have exceeded the maximum of 24 units!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
