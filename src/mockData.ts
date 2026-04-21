import { User, Course, Result } from './types';

export const mockCourses: Course[] = [
  { id: '1', code: 'CSC 101', title: 'Introduction to Computer Science', units: 3, semester: 1, level: 100 },
  { id: '2', code: 'MTH 101', title: 'General Mathematics I', units: 4, semester: 1, level: 100 },
  { id: '3', code: 'CHM 101', title: 'General Chemistry I', units: 3, semester: 1, level: 100 },
  { id: '4', code: 'CSC 102', title: 'Introduction to Programming', units: 3, semester: 2, level: 100 },
  { id: '5', code: 'CSC 201', title: 'Data Structures', units: 3, semester: 1, level: 200 },
  { id: '6', code: 'CSC 301', title: 'Operating Systems', units: 3, semester: 1, level: 300 },
  { id: '7', code: 'CSC 401', title: 'Artificial Intelligence', units: 4, semester: 1, level: 400 },
];

export const mockStudents: User[] = [
  {
    id: 's1',
    name: 'John Doe',
    role: 'student',
    email: 'john.doe@oci.edu',
    studentId: '20230001',
    department: 'Computer Science',
    faculty: 'Science',
    level: 200,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  }
];

export const mockLecturers: User[] = [
  {
    id: 'l1',
    name: 'Dr. Smith',
    role: 'lecturer',
    email: 'smith@oci.edu',
    department: 'Computer Science',
    faculty: 'Science',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Smith'
  }
];

export const mockResults: Result[] = [
  { id: 'r1', studentId: 's1', courseId: '1', score: 85, grade: 'A', semester: 1, level: 100, session: '2022/2023' },
  { id: 'r2', studentId: 's1', courseId: '2', score: 72, grade: 'B', semester: 1, level: 100, session: '2022/2023' },
  { id: 'r3', studentId: 's1', courseId: '3', score: 65, grade: 'C', semester: 1, level: 100, session: '2022/2023' },
  { id: 'r4', studentId: 's1', courseId: '4', score: 90, grade: 'A', semester: 2, level: 100, session: '2022/2023' },
];
