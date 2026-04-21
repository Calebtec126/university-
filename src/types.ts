export type UserRole = 'student' | 'lecturer';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  studentId?: string; // For students
  department: string;
  faculty: string;
  level?: number; // 100, 200, etc.
}

export interface Course {
  id: string;
  code: string;
  title: string;
  units: number;
  semester: 1 | 2;
  level: number;
}

export interface Result {
  id: string;
  studentId: string;
  courseId: string;
  score: number;
  grade: string;
  semester: 1 | 2;
  level: number;
  session: string; // e.g., "2023/2024"
}

export interface Registration {
  id: string;
  studentId: string;
  courseIds: string[];
  semester: 1 | 2;
  level: number;
  session: string;
  status: 'pending' | 'approved';
}

export interface Payment {
  id: string;
  studentId: string;
  type: 'school_fees' | 'departmental_fee' | 'faculty_fee' | 'id_card';
  amount: number;
  date: string;
  session: string;
  status: 'paid' | 'pending';
  reference: string;
}
