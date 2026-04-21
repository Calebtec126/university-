import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import StudentDashboard from './pages/student/Dashboard';
import StudentResults from './pages/student/Results';
import CourseRegistration from './pages/student/CourseRegistration';
import StudentProfile from './pages/student/Profile';
import Payments from './pages/student/Payments';
import LecturerDashboard from './pages/lecturer/Dashboard';
import UploadResults from './pages/lecturer/UploadResults';
import { User } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('portal_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (role: 'student' | 'lecturer') => {
    // Basic mock login
    const mockUser: User = role === 'student' ? {
      id: 's1',
      name: 'John Doe',
      role: 'student',
      email: 'john.doe@oci.edu',
      studentId: '20230001',
      department: 'Computer Science',
      faculty: 'Science',
      level: 200,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    } : {
      id: 'l1',
      name: 'Dr. Smith',
      role: 'lecturer',
      email: 'smith@oci.edu',
      department: 'Computer Science',
      faculty: 'Science',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Smith'
    };
    setUser(mockUser);
    localStorage.setItem('portal_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('portal_user');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={login} />} />
        
        {user?.role === 'student' && (
          <Route path="/" element={<StudentDashboard user={user} logout={logout} />}>
            <Route index element={<StudentProfile user={user} />} />
            <Route path="results" element={<StudentResults user={user} />} />
            <Route path="registration" element={<CourseRegistration user={user} />} />
            <Route path="payments" element={<Payments user={user} />} />
          </Route>
        )}

        {user?.role === 'lecturer' && (
          <Route path="/" element={<LecturerDashboard user={user} logout={logout} />}>
            <Route index element={<UploadResults user={user} />} />
          </Route>
        )}

        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}
