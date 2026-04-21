import { useState } from 'react';
import { User, Result, Course } from '../../types';
import { mockResults, mockCourses } from '../../mockData';
import { motion } from 'motion/react';
import { FileText, Download, ChevronDown, Filter } from 'lucide-react';

export default function StudentResults({ user }: { user: User }) {
  const [selectedLevel, setSelectedLevel] = useState<number>(100);
  const [selectedSemester, setSelectedSemester] = useState<1 | 2>(1);

  const levels = [100, 200, 300, 400, 500];
  
  const results = mockResults.filter(r => 
    r.studentId === user.id && 
    r.level === selectedLevel && 
    r.semester === selectedSemester
  );

  const getCourse = (courseId: string) => mockCourses.find(c => c.id === courseId);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Academic Results</h2>
          <p className="text-slate-500">View and track your semester-by-semester performance.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
          <Download size={18} />
          Download Transcript (PDF)
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select Level</label>
            <div className="flex p-1 bg-slate-100 rounded-xl">
              {levels.map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                    selectedLevel === level 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-slate-500 hover:text-primary'
                  }`}
                >
                  {level}L
                </button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-auto">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Semester</label>
            <div className="flex p-1 bg-slate-100 rounded-xl w-full md:w-64">
              {[1, 2].map(sem => (
                <button
                  key={sem}
                  onClick={() => setSelectedSemester(sem as 1 | 2)}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                    selectedSemester === sem 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-slate-500 hover:text-primary'
                  }`}
                >
                  Semester {sem}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Course Code</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Course Title</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Units</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Score</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Grade</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {results.length > 0 ? results.map((result) => {
                const course = getCourse(result.courseId);
                const points = (result.grade === 'A' ? 5 : result.grade === 'B' ? 4 : result.grade === 'C' ? 3 : result.grade === 'D' ? 2 : 0) * (course?.units || 0);
                return (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={result.id} 
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="px-6 py-4 font-bold text-primary">{course?.code}</td>
                    <td className="px-6 py-4 text-slate-600">{course?.title}</td>
                    <td className="px-6 py-4 text-slate-500">{course?.units}</td>
                    <td className="px-6 py-4 font-bold">{result.score}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                        result.grade === 'A' ? 'bg-green-100 text-green-700' : 
                        result.grade === 'B' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {result.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{points}</td>
                  </motion.tr>
                );
              }) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 bg-slate-50/20">
                    <div className="flex flex-col items-center gap-2">
                      <FileText size={40} className="text-slate-200" />
                      <p>No results uploaded yet for this semester.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {results.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Total Units</p>
              <p className="text-xl font-bold text-primary mt-1">
                {results.reduce((acc, r) => acc + (getCourse(r.courseId)?.units || 0), 0)}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
              <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Semester GPA</p>
              <p className="text-xl font-bold text-green-700 mt-1">4.25</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Cumulative GPA</p>
              <p className="text-xl font-bold text-blue-700 mt-1">3.85</p>
            </div>
            <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Academic Standing</p>
              <p className="text-xl font-bold text-slate-700 mt-1 uppercase tracking-tighter">GOOD STANDING</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
