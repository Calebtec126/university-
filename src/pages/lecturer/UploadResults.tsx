import { useState } from 'react';
import { User, Course, Result } from '../../types';
import { mockCourses, mockStudents } from '../../mockData';
import { motion } from 'motion/react';
import { Upload, Search, Download, CheckCircle2, AlertCircle, Save } from 'lucide-react';

export default function UploadResults({ user }: { user: User }) {
  const [selectedCourse, setSelectedCourse] = useState<string>(mockCourses[0].id);
  const [scores, setScores] = useState<Record<string, number>>({
    's1': 85
  });
  const [isSaved, setIsSaved] = useState(false);

  const currentCourse = mockCourses.find(c => c.id === selectedCourse);

  const handleScoreChange = (studentId: string, score: string) => {
    const val = parseInt(score) || 0;
    if (val >= 0 && val <= 100) {
      setScores(prev => ({ ...prev, [studentId]: val }));
      setIsSaved(false);
    }
  };

  const getGrade = (score: number) => {
    if (score >= 70) return 'A';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C';
    if (score >= 45) return 'D';
    return 'F';
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Result Management</h2>
          <p className="text-slate-500">Upload and modify scores for assigned courses.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all">
            <Download size={18} />
            Template
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent/90 transition-all shadow-lg shadow-accent/20">
            <Upload size={18} />
            Batch Upload (CSV)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Course Selection</h3>
            <div className="space-y-2">
              {mockCourses.slice(0, 4).map(course => (
                <button
                  key={course.id}
                  onClick={() => setSelectedCourse(course.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border ${
                    selectedCourse === course.id 
                    ? 'bg-accent/5 border-accent text-accent' 
                    : 'bg-slate-50 border-transparent text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <p className="text-xs font-bold uppercase tracking-wider">{course.code}</p>
                  <p className="text-sm font-bold truncate">{course.title}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <AlertCircle size={20} className="text-accent" />
              </div>
              <h4 className="font-bold">Guidelines</h4>
            </div>
            <ul className="text-xs text-slate-400 space-y-3 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-accent font-bold">•</span>
                Scores must be between 0 and 100.
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">•</span>
                Ensure all mandatory fields are filled.
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">•</span>
                Grades are auto-calculated based on Senate approved scale.
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center font-bold">
                  {currentCourse?.code.slice(0, 3)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{currentCourse?.code}: {currentCourse?.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">Session: 2023/2024 • Semester {currentCourse?.semester}</p>
                </div>
              </div>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Filter student..."
                  className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm w-full sm:w-48 focus:ring-2 focus:ring-accent/10"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Matric No</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Student Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Score (100)</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Grade</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {mockStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-sm font-bold text-slate-700">{student.studentId}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={student.avatar} className="w-8 h-8 rounded-full bg-slate-100" />
                          <span className="text-sm font-medium text-slate-700">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <input 
                          type="number" 
                          min="0"
                          max="100"
                          value={scores[student.id] || ''}
                          onChange={(e) => handleScoreChange(student.id, e.target.value)}
                          className="w-16 px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-accent/10 focus:border-accent"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                          getGrade(scores[student.id] || 0) === 'A' ? 'bg-green-100 text-green-700' :
                          getGrade(scores[student.id] || 0) === 'F' ? 'bg-red-100 text-red-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {getGrade(scores[student.id] || 0)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {isSaved ? 'Synchronized' : 'Draft'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-slate-50 flex items-center justify-between border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium">Showing 1 of 1 registered students</p>
              <button 
                onClick={handleSave}
                disabled={isSaved}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg ${
                  isSaved 
                  ? 'bg-green-600 text-white shadow-green-200' 
                  : 'bg-accent text-white shadow-accent/20 hover:scale-[1.02]'
                }`}
              >
                {isSaved ? (
                  <>
                    <CheckCircle2 size={18} />
                    Results Published
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save & Publish
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
